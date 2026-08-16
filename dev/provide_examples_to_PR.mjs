#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
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

const owner = 'nickkolok';
const repo = 'chas-ege';

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
    return matches.map(m => m[1].trim()).filter(text => text.length > 0).join('\n');
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

async function main() {
    console.log(`Processing PR #${prNumber}...`);
    const token = process.env.GITHUB_TOKEN;

    let files;
    try {
        files = await fetchAllPRFiles(prNumber, token);
    } catch (e) {
        console.error('Failed to fetch PR files:', e.message);
        process.exit(1);
    }

    const tempDir = path.join(os.tmpdir(), `chas-ege-pr-${prNumber}`);
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const latexExamples = [];
    const pattern = /^zdn\/[^\/]+\/[^\/]+\/\d+\.js$/;

    for (const file of files) {
        if (file.status === 'removed' || !file.raw_url) continue;
        if (!pattern.test(file.filename)) continue;

        console.log(`Processing ${file.filename}...`);

        const rawUrl = file.raw_url;
        try {
            const content = await fetchRaw(rawUrl);

            const localDir = path.join(tempDir, path.dirname(file.filename));
            if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });
            const localPath = path.join(localDir, path.basename(file.filename));
            fs.writeFileSync(localPath, content);

            const output = await runDebug(localPath, debugArgs);
            const latex = extractLatex(output);
            
            if (latex) {
                latexExamples.push(latex);
            } else {
                console.warn(`No LaTeX code found for ${file.filename}`);
            }
        } catch (e) {
            console.error(`Error processing ${file.filename}:`, e.message);
        }
    }

    if (latexExamples.length === 0) {
        console.log('No examples found for the PR.');
        process.exit(0);
    }

    const commentBody = `ПРИМЕРЫ_ЗАДАЧ:\n\n${latexExamples.join('\n\n---\n\n')}`;

    if (!token) {
        console.warn('GITHUB_TOKEN not found in environment variables. Cannot post comment.');
        console.log('Generated comment:\n', commentBody);
    } else {
        try {
            await postComment(prNumber, commentBody, token);
            console.log('Successfully posted comment to PR.');
        } catch (e) {
            console.error('Failed to post comment:', e.message);
        }
    }
}

main();
