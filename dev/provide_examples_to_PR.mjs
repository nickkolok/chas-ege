#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { execFile } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';

const execFileAsync = util.promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);

if (args.length === 0 || isNaN(parseInt(args[0], 10))) {
    console.error('Usage: node dev/provide_examples_to_PR.mjs <PR_NUMBER> [headless-debug options...]');
    console.error('Example: node dev/provide_examples_to_PR.mjs 1234 --headless --browser /usr/bin/chromium');
    process.exit(1);
}

const prNumber = args[0];
const debugArgs = args.slice(1);

if (!debugArgs.includes('--headless')) {
    debugArgs.unshift('--headless');
}

const owner = 'nickkolok';
const repo = 'chas-ege';

async function getGitHubToken() {
    if (process.env.GITHUB_TOKEN) {
        return process.env.GITHUB_TOKEN;
    }
    try {
        const { stdout } = await execFileAsync('gh', ['auth', 'token']);
        return stdout.trim();
    } catch (e) {
        console.warn('Could not get token via `gh auth token` or GITHUB_TOKEN.');
        return null;
    }
}

async function fetchAllPRFiles(prNum, token) {
    let allFiles = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/files?per_page=100`;

    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-script',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        
        const data = await response.json();
        allFiles = allFiles.concat(data);

        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }

    return allFiles;
}

async function fetchRaw(url) {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'chas-ege-provide-examples-script' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
}

async function runDebug(filepath, extraArgs) {
    const scriptPath = path.join(projectRoot, 'sh', 'headless-debug.mjs');
    const args = ['--filepath', filepath, ...extraArgs];

    try {
        const { stdout, stderr } = await execFileAsync('node', [scriptPath, ...args], {
            maxBuffer: 1024 * 1024 * 20 
        });
        if (stderr) console.warn(`stderr from headless-debug.mjs:\n${stderr}`);
        return stdout;
    } catch (error) {
        console.error(`headless-debug.mjs failed for ${filepath}:`);
        if (error.stderr) console.error(`stderr: ${error.stderr}`);
        return error.stdout || '';
    }
}

function extractLatex(output) {
    const regex = /=== LaTeX CODE START ===\r?\n([\s\S]*?)\r?\n=== LaTeX CODE END ===/g;
    const matches = [...output.matchAll(regex)];
    return matches.map((m, i) => `## Пример ${i + 1}\n\n${m[1].trim()}`).filter(text => text.length > 0).join('\n\n---\n\n');
}

function formatForGitHub(latexText) {
    let result = latexText.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        return '\n```math\n' + formula.trim() + '\n```\n';
    });
    result = result.replace(/\\\\/g, '\n\n');
    
    // Remove LaTeX tables: \begin{tabular}...\end{tabular}
    result = result.replace(/\\begin\{tabular\}[\s\S]*?\\end\{tabular\}/g, '');
    
    // Uncomment HTML tables: % <table ...>...</table> -> <table ...>...</table>
    result = result.replace(/% (<table[\s\S]*?<\/table>)/g, '$1');
    
    return result;
}

async function uploadImageViaUserAttachments(base64Data, extension, prNum, token, repositoryId) {
    const uuid = crypto.randomUUID();
    const fileName = `${uuid}.${extension}`;
    const mimeType = `image/${extension}`;

    const binaryData = Buffer.from(base64Data, 'base64');

    const url = `https://uploads.github.com/user-attachments/assets?name=${encodeURIComponent(fileName)}&content_type=${encodeURIComponent(mimeType)}&repository_id=${repositoryId}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/octet-stream'
        },
        body: binaryData
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload image: HTTP ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.href || result.url;
}

async function replaceBase64ImagesWithUploads(latexText, prNum, token, repositoryId) {
    // Match %<img src="data:image/png;base64,..." />
    const imgRegex = /%<img[^>]*src="(data:image\/([^;]+);base64,([A-Za-z0-9+/=]+))"[^>]*>/gi;
    
    let result = latexText;
    const matches = [...latexText.matchAll(imgRegex)];
    
    for (const match of matches) {
        const fullMatch = match[0];
        const mimeType = match[2];
        const base64Data = match[3];
        
        try {
            console.log(`Uploading image (${mimeType}, ${base64Data.length} chars)...`);
            const downloadUrl = await uploadImageViaUserAttachments(base64Data, mimeType, prNum, token, repositoryId);
            
            // Replace the commented img tag with markdown image
            const imgMarkdown = `\n![illustration](${downloadUrl})\n`;
            result = result.replace(fullMatch, imgMarkdown);
            console.log(`  -> Uploaded: ${downloadUrl}`);
        } catch (e) {
            console.error(`Failed to upload image: ${e.message}`);
            // If upload fails, just remove the commented img tag to not clutter the comment
            result = result.replace(fullMatch, '');
        }
    }
    
    return result;
}

async function postComment(prNum, body, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${prNum}/comments`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'chas-ege-provide-examples-script',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify({ body })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    return response.json();
}


async function getPRHeadSha(prNum, token) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'chas-ege-provide-examples-script',
            ...(token && { 'Authorization': `token ${token}` })
        }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    const data = await response.json();
    return data.head.sha;
}

async function main() {
    console.log(`Processing PR #${prNumber}...`);
    const token = await getGitHubToken();

    let repositoryId = null;
    if (token) {
        try {
            const repoInfoUrl = `https://api.github.com/repos/${owner}/${repo}`;
            const repoInfoResp = await fetch(repoInfoUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'chas-ege-provide-examples-script',
                    'Authorization': `token ${token}`
                }
            });
            if (repoInfoResp.ok) {
                repositoryId = (await repoInfoResp.json()).id;
            }
        } catch (e) {
            console.warn('Failed to fetch repository ID:', e.message);
        }
    }

    let files;
    try {
        files = await fetchAllPRFiles(prNumber, token);
    } catch (e) {
        console.error('Failed to fetch PR files:', e.message);
        process.exit(1);
    }

    // Используем директорию внутри проекта, чтобы относительные пути headless-debug.mjs работали корректно
    const uuid = crypto.randomUUID();
    const cacheDir = path.join(projectRoot, '.cache', `pr-${prNumber}-${uuid}`);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    const examples = [];
    const pattern = /^zdn\/[^\/]+\/[^\/]+\/\d+\.js$/;
    
    let headSha = 'unknown';
    try {
        headSha = await getPRHeadSha(prNumber, token);
    } catch (e) {
        console.warn('Failed to fetch PR head SHA:', e.message);
    }


    try {
        for (const file of files) {
            if (file.status === 'removed' || !file.raw_url) continue;
            if (!pattern.test(file.filename)) continue;

            console.log(`Processing ${file.filename}...`);

            const rawUrl = file.raw_url;
            try {
                const content = await fetchRaw(rawUrl);

                const localDir = path.join(cacheDir, path.dirname(file.filename));
                if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });
                const localPath = path.join(localDir, path.basename(file.filename));
                fs.writeFileSync(localPath, content);

                // Передаём относительный путь от корня проекта, чтобы headless-debug.mjs корректно его обработал
                const relativePath = path.relative(projectRoot, localPath);
                const output = await runDebug(relativePath, debugArgs);
                const latex = extractLatex(output);
                
                if (latex) {
                    examples.push({ filename: file.filename, text: latex });
                } else {
                    console.warn(`No LaTeX code found for ${file.filename}`);
                }
            } catch (e) {
                console.error(`Error processing ${file.filename}:`, e.message);
            }
        }

        if (examples.length === 0) {
            console.log('No examples found for the PR.');
            return;
        }

        // Read gitstatus from dist/gitstatus.txt
        let gitStatus = 'unknown';
        try {
            const gitStatusPath = path.join(projectRoot, 'dist', 'gitstatus.txt');
            const gitStatusContent = fs.readFileSync(gitStatusPath, 'utf8');
            gitStatus = gitStatusContent.split('\n')[0].trim();
        } catch (e) {
            console.warn('Could not read dist/gitstatus.txt:', e.message);
        }

        // Upload base64 images and replace with URLs
        const blocks = [];
        for (const example of examples) {
            console.log(`\nProcessing images in ${example.filename}...`);
            const processed = formatForGitHub(await replaceBase64ImagesWithUploads(example.text, prNumber, token, repositoryId));
            blocks.push(`<details>\n<summary>ПРИМЕРЫ_ЗАДАЧ \`${example.filename}\` ${headSha} сборка ${gitStatus}</summary>\n\n${processed}\n\n</details>`);
        }

        const commentBody = blocks.join('\n\n---\n\n');

        if (!token) {
            console.warn('GitHub token not found. Cannot post comment.');
            console.log('Generated comment:\n', commentBody);
        } else {
            try {
                await postComment(prNumber, commentBody, token);
                console.log('Successfully posted comment to PR.');
            } catch (e) {
                console.error('Failed to post comment:', e.message);
            }
        }
    } finally {
        // Чистим за собой
        fs.rmSync(cacheDir, { recursive: true, force: true });
        console.log('Cleaned up temporary files.');
    }
}

main();
