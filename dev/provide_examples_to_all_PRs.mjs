#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execFile, execSync } from 'child_process';
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

    const state = loadState();

    console.log('Fetching upstream devel...');
    try {
        execSync('git fetch upstream devel', { stdio: 'inherit' });
    } catch (e) {
        console.warn('Failed to fetch upstream devel.');
    }

    let currentDevelHash = 'unknown';
    try {
        currentDevelHash = execSync('git rev-parse upstream/devel', { encoding: 'utf-8' }).trim();
    } catch (e) {
        console.warn('Could not get devel hash.');
    }
    console.log(`Current devel hash: ${currentDevelHash}`);

    let develChangedSignificantly = false;
    if (state.develHash && state.develHash !== currentDevelHash) {
        try {
            const diffFiles = execSync(
                `git diff --name-only ${state.develHash} ${currentDevelHash}`,
                { encoding: 'utf-8' }
            ).trim().split('\n').filter(Boolean);

            develChangedSignificantly = diffFiles.some(f =>
                !f.startsWith('zdn/') && !f.startsWith('md/') && !f.startsWith('doc/')
            );
            console.log(`Devel changed significantly: ${develChangedSignificantly}`);
        } catch (e) {
            console.warn('Failed to diff devel hashes. Assuming significant change.');
            develChangedSignificantly = true;
        }
    }

    console.log('Fetching PRs via GraphQL...');
    const prs = await fetchAllPRsGraphQL(token);
    console.log(`Fetched ${prs.length} open PRs.`);

    if (develChangedSignificantly) {
        prs.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else {
        prs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    for (const pr of prs) {
        const saved = state.prs[pr.number];

        if (!develChangedSignificantly && saved && saved.headRefOid === pr.headRefOid && saved.updatedAt === pr.updatedAt) {
            continue;
        }

        console.log(`\n--- Processing PR #${pr.number} ---`);
        await runProvide_script(pr.number, [...filteredArgs, ...(editLastFlag ? ['--edit-last'] : [])]);
        
        state.prs[pr.number] = {
            updatedAt: pr.updatedAt,
            processedAt: new Date().toISOString(),
            headRefOid: pr.headRefOid
        };
        saveState(state);
    }

    state.develHash = currentDevelHash;
    state.lastRunAt = new Date().toISOString();
    saveState(state);
    console.log('Done.');
}

main();
