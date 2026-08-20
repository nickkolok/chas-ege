#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';

const execFileAsync = util.promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const editLastFlag = args.includes('--edit-last');
const filteredArgs = args.filter(a => a !== '--edit-last');

const owner = 'nickkolok';
const repo = 'chas-ege';

async function getGitHubToken() {
    if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
    try {
        const { stdout } = await execFileAsync('gh', ['auth', 'token']);
        return stdout.trim();
    } catch (e) {
        console.error('No GitHub token found.');
        process.exit(1);
    }
}

async function fetchAllOpenPRs(token) {
    let allPRs = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=100`;

    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const data = await response.json();
        allPRs = allPRs.concat(data);

        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }
    return allPRs;
}

async function fetchAllPRFiles(prNum, token) {
    let allFiles = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/files?per_page=100`;

    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
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

async function fetchPRComments(prNum, token) {
    let comments = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/issues/${prNum}/comments?per_page=100`;
    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const data = await response.json();
        comments = comments.concat(data);
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }
    
    url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/comments?per_page=100`;
    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const data = await response.json();
        comments = comments.concat(data);
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }
    return comments;
}

async function fetchPRReviewComments(prNum, token) {
    let reviewComments = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/comments?per_page=100`;
    while (url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) return [];
        const data = await response.json();
        reviewComments = reviewComments.concat(data);
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }
    return reviewComments;
}

async function isLastCommentInPR(issueComments, reviewComments, targetCommentId) {
    const allComments = [...issueComments, ...reviewComments];
    allComments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    if (allComments.length === 0) return false;
    return allComments[allComments.length - 1].id === targetCommentId;
}

async function getFileContent(filePath, ref, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${ref}`;
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'chas-ege-provide-examples-all-prs',
            ...(token && { 'Authorization': `token ${token}` })
        }
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.encoding === 'base64' && data.content) {
        return Buffer.from(data.content, 'base64').toString('utf8');
    }
    return null;
}

async function checkDevelCommits(token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?sha=devel&per_page=50`;
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'chas-ege-provide-examples-all-prs',
            ...(token && { 'Authorization': `token ${token}` })
        }
    });
    if (!response.ok) return false;
    const commits = await response.json();
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    for (const commit of commits) {
        const commitDate = new Date(commit.commit.committer.date);
        if (commitDate < twoHoursAgo) break;
        
        const cResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                'Authorization': `token ${token}`
            }
        });
        if (!cResp.ok) continue;
        const cData = await cResp.json();
        const commitFiles = cData.files || [];
        const hasNonZdnMdDoc = commitFiles.some(file => {
            const p = file.filename;
            return !p.startsWith('zdn/') && !p.startsWith('md/') && !p.startsWith('doc/');
        });
        if (hasNonZdnMdDoc) return true;
    }
    return false;
}

async function runProvideScript(prNum, extraArgs) {
    const scriptPath = path.join(projectRoot, 'dev', 'provide_examples_to_PR.mjs');
    const scriptArgs = [scriptPath, prNum.toString(), ...extraArgs];
    try {
        const { stdout, stderr } = await execFileAsync('node', scriptArgs, { maxBuffer: 1024 * 1024 * 50 });
        if (stderr) console.warn(`stderr from provide_examples_to_PR.mjs:\n${stderr}`);
        if (stdout) console.log(stdout);
    } catch (error) {
        console.error(`provide_examples_to_PR.mjs failed for PR ${prNum}:`);
        if (error.stderr) console.error(`stderr: ${error.stderr}`);
        if (error.stdout) console.log(error.stdout);
    }
}

async function main() {
    console.log('Starting script to process all PRs...');
    const token = await getGitHubToken();
    if (!token) {
        console.error('No GitHub token found.');
        process.exit(1);
    }

    const recentDevelCommits = await checkDevelCommits(token);
    console.log(`Recent non-zdn/md/doc devel commits: ${recentDevelCommits}`);

    let prs = await fetchAllOpenPRs(token);
    if (recentDevelCommits) {
        prs.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    } else {
        prs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    let currentGitStatus = 'unknown';
    const gitStatusContent = await getFileContent('dist/gitstatus.txt', 'devel', token);
    if (gitStatusContent) {
        currentGitStatus = gitStatusContent.split('\n')[0].trim();
    }

    for (const pr of prs) {
        console.log(`\n--- Checking PR #${pr.number} ---`);
        try {
            const files = await fetchAllPRFiles(pr.number, token);
            
            let validFiles = files.filter(f => {
                if (f.status === 'removed' || f.status === 'renamed') return false;
                if (f.filename.startsWith('md/') || f.filename.startsWith('doc/')) return false;
                if (/^zdn\/[^\/]+\/[^\/]+\/(main|fipi)\.js$/.test(f.filename)) return false;
                if (/^zdn\/[^\/]+\/[^\/]+\.js$/.test(f.filename)) return false;
                return true;
            });
            
            let symlinkChecked = await Promise.all(validFiles.map(async f => {
                const url = `https://api.github.com/repos/${owner}/${repo}/contents/${f.filename}?ref=${pr.head.sha}`;
                try {
                    const resp = await fetch(url, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'chas-ege-provide-examples-all-prs',
                            'Authorization': `token ${token}`
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        return data.type === 'symlink';
                    }
                } catch(e) {}
                return false;
            }));
            
            validFiles = validFiles.filter((f, i) => !symlinkChecked[i]);
            validFiles = validFiles.filter(f => /^zdn\/[^\/]+\/[^\/]+\/[^\/]+\.js$/.test(f.filename));

            if (validFiles.length < 1 || validFiles.length > 4) {
                console.log(`PR #${pr.number} has ${validFiles.length} valid zdn/*/*/*.js files. Skipping.`);
                continue;
            }

            const comments = await fetchPRComments(pr.number, token);
            const exampleComments = comments.filter(c => c.body.includes('ПРИМЕРЫ_ЗАДАЧ'));

            if (exampleComments.length === 0) {
                console.log(`PR #${pr.number} has no ПРИМЕРЫ_ЗАДАЧ comment. Generating examples.`);
                await runProvideScript(pr.number, filteredArgs);
                continue;
            }

            const lastComment = exampleComments[exampleComments.length - 1];
            const commentBody = lastComment.body;
            
            const match = commentBody.match(/ПРИМЕРЫ_ЗАДАЧ\s+([^\s]+)\s+([0-9a-f]+)\s+сборка\s+([0-9a-f]+)/);
            if (!match) {
                console.log(`Could not parse ПРИМЕРЫ_ЗАДАЧ comment in PR #${pr.number}. Generating.`);
                await runProvideScript(pr.number, filteredArgs);
                continue;
            }

            const [, commentedFile, commitHash, buildCommit] = match;

            if (buildCommit !== currentGitStatus) {
                const compareUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${buildCommit}...${currentGitStatus}`;
                const compareResp = await fetch(compareUrl, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'chas-ege-provide-examples-all-prs',
                        'Authorization': `token ${token}`
                    }
                });
                if (compareResp.ok) {
                    const compareData = await compareResp.json();
                    const diffFiles = compareData.files || [];
                    const hasNonZdnMdDoc = diffFiles.some(f => !f.filename.startsWith('zdn/') && !f.filename.startsWith('md/') && !f.filename.startsWith('doc/'));
                    if (hasNonZdnMdDoc) {
                        console.log(`Build commit differs from current not only by zdn/md/doc. Generating.`);
                        
                        // Check if we should edit last comment
                        let shouldEditLast = false;
                        if (editLastFlag && validFiles.length === 1) {
                            const reviewComments = await fetchPRReviewComments(pr.number, token);
                            shouldEditLast = await isLastCommentInPR(comments, reviewComments, lastComment.id);
                        }
                        
                        if (shouldEditLast) {
                            console.log(`Editing last comment for PR #${pr.number}`);
                            await runProvideScript(pr.number, [...filteredArgs, '--edit-last']);
                        } else {
                            await runProvideScript(pr.number, filteredArgs);
                        }
                        continue;
                    }
                } else {
                    console.log(`Failed to compare commits. Generating just in case.`);
                    await runProvideScript(pr.number, filteredArgs);
                    continue;
                }
            }

            const currentFileContent = await getFileContent(commentedFile, pr.head.sha, token);
            const oldFileContent = await getFileContent(commentedFile, commitHash, token);
            
            if (currentFileContent !== oldFileContent) {
                console.log(`File ${commentedFile} differs. Generating.`);
                await runProvideScript(pr.number, filteredArgs);
            } else {
                console.log(`File ${commentedFile} is identical. Skipping.`);
            }

        } catch (e) {
            console.error(`Error processing PR #${pr.number}:`, e.message);
        }
    }
}

main();
