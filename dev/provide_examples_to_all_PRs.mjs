#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFile, execSync } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';
import { getFileContent, fetchSymlinkPaths, projectRoot } from './lib/github-api.mjs';

const execFileAsync = util.promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// projectRoot is imported from ./lib/github-api.mjs

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


async function getRateLimit(token) {
    try {
        const response = await fetch('https://api.github.com/rate_limit', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'chas-ege-provide-examples-all-prs',
                ...(token && { 'Authorization': `token ${token}` })
            }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.resources.core;
    } catch (e) {
        return null;
    }
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function waitForRateLimitReset(token) {
    console.log('🛑 Rate limit почти исчерпан, делаем паузу...');
    const rateLimit = await getRateLimit(token);
    if (rateLimit && rateLimit.reset) {
        const resetTime = new Date(rateLimit.reset * 1000);
        const now = new Date();
        const waitMs = Math.max(0, resetTime - now) + 5000; // +5 секунд на всякий случай
        console.log(`⏳ Ждём до ${resetTime.toLocaleString()} (${Math.ceil(waitMs / 1000)} секунд)`);
        await sleep(waitMs);
    }
}

async function handlePRWithExamples(pr, token, cachedComments = null, cachedCommits = null) {
    console.log(`🔍 Обработка PR #${pr.number} (примеры уже есть)`);
    
    // Получаем или используем кэшированные данные
    const comments = cachedComments || await fetchPRComments(pr.number, token);
    const commits = cachedCommits || await fetchPRCommits(pr.number, token);
    
    // Проверка Селены и Полины (независимо от номера PR, перед заглушкой)
    await checkAndAskUser(pr, token, 'chas-ege-selena', 'ask_Selena_to_fix.sh', 'selena.log', comments, commits);
    await checkAndAskUser(pr, token, 'chas-ege-polina', 'ask_Polina_to_fix.sh', 'polina.log', comments, commits);
    
    // Проверка Юлии (без ограничений по номеру PR, один раз на коммит)
    await checkAndAskYuliya(pr, token, comments, commits);

    
    // Заглушка: пропускаем PR с номером меньше 3280
    if (pr.number < 3280) {
        console.log(`⏭️  PR #${pr.number} < 3280, пропускаем (заглушка)`);
        return;
    }
    
    try {
        
        // Фильтруем комментарии от Марты
        const martaComments = comments.filter(c => c.user && c.user.login === 'chas-ege-marta');
        
        // Фильтруем комментарии с ПРИМЕРЫ_ЗАДАЧ
        const exampleComments = comments.filter(c => 
            c.body.includes('ПРИМЕРЫ_ЗАДАЧ') && 
            c.user && 
            c.user.login !== 'chas-ege-marta'
        );
        
        // Проверяем второе условие
        if (martaComments.length > 0 && exampleComments.length > 0) {
            // Сортируем по дате и берем последние
            const lastMartaComment = martaComments.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            )[0];
            
            const lastExampleComment = exampleComments.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            )[0];
            
            const martaDate = new Date(lastMartaComment.created_at);
            const exampleDate = new Date(lastExampleComment.created_at);
            
            if (martaDate > exampleDate) {
                console.log(`⏭️  PR #${pr.number}: Марта уже ответила после примеров, пропускаем`);
                return;
            }
        }
        
        // Иначе запускаем bash-скрипт
        console.log(`🚀 PR #${pr.number}: Запускаем ask_Marta_to_review.sh`);
        const scriptPath = path.join(projectRoot, 'dev', 'ask_Marta_to_review.sh');
        
        const { stdout, stderr } = await execFileAsync('bash', [scriptPath, pr.number.toString()], {
            cwd: projectRoot,
            maxBuffer: 1024 * 1024 * 10
        });
        
        if (stderr) {
            console.warn(`stderr from ask_Marta_to_review.sh:
${stderr}`);
        }
        
        // Записываем вывод в marta.log
        const logPath = path.join(projectRoot, 'marta.log');
        const logEntry = `[${new Date().toISOString()}] PR #${pr.number}
${stdout}
${stderr ? 'STDERR: ' + stderr : ''}
${'='.repeat(80)}
`;
        fs.appendFileSync(logPath, logEntry);
        
        console.log(`✅ PR #${pr.number}: ask_Marta_to_review.sh выполнен успешно`);
        
    } catch (error) {
        console.error(`❌ PR #${pr.number}: Ошибка при обработке:`, error.message);
        if (error.stderr) {
            console.error('stderr:', error.stderr);
        }
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

async function checkDevelCommits() {
    try {
        // Проверяем коммиты за последние 2 часа локально через git (без API-запросов)
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const since = twoHoursAgo.toISOString();
        
        const { stdout } = await execFileAsync('git', [
            'log',
            '--name-only',
            '--pretty=format:',
            `--since=${since}`,
            'devel'
        ], { cwd: projectRoot });
        
        const files = stdout.trim().split('\n').filter(f => f.trim().length > 0);
        const hasNonZdnMdDoc = files.some(file => {
            const p = file.trim();
            return !p.startsWith('zdn/') && !p.startsWith('md/') && !p.startsWith('doc/');
        });
        
        return hasNonZdnMdDoc;
    } catch (e) {
        console.warn('Failed to check devel commits locally:', e.message);
        return false;
    }
}

async function runProvideScript(prNum, extraArgs) {
    const scriptPath = path.join(projectRoot, 'dev', 'provide_examples_to_PR.mjs');
    const scriptArgs = [scriptPath, prNum.toString(), ...extraArgs];
    const runStart = Date.now();
    try {
        const { stdout, stderr } = await execFileAsync('node', scriptArgs, { maxBuffer: 1024 * 1024 * 50 });
        if (stderr) console.warn(`stderr from provide_examples_to_PR.mjs:\n${stderr}`);
        if (stdout) console.log(stdout);
    } catch (error) {
        console.error(`provide_examples_to_PR.mjs failed for PR ${prNum}:`);
        if (error.stderr) console.error(`stderr: ${error.stderr}`);
        if (error.stdout) console.log(error.stdout);
    }
    const elapsed = Date.now() - runStart;
    console.log(`⏱️  Время генерации для PR #${prNum}: ${(elapsed / 1000).toFixed(2)} с`);
    return elapsed;
}




async function main() {
    const scriptStartTime = Date.now();
    let totalGenerationTime = 0;

    console.log('Starting script to process all PRs...');
    const token = await getGitHubToken();
    if (!token) {
        console.error('No GitHub token found.');
        process.exit(1);
    }

    const startRateLimit = await getRateLimit(token);
    if (startRateLimit) {
        console.log(`🚦 Rate limit at start: ${startRateLimit.remaining} / ${startRateLimit.limit} (сброс в ${new Date(startRateLimit.reset * 1000).toLocaleString()})`);
    } else {
        console.warn('🚦 Не удалось получить rate limit на старте.');
    }

    // Создаём уникальную временную директорию для профилей Chromium на весь прогон
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'taskexamples-'));
    console.log(`Created temporary user data directory: ${userDataDir}`);

    let fatalError = null;
    try {
        const recentDevelCommits = await checkDevelCommits();
        console.log(`Recent non-zdn/md/doc devel commits: ${recentDevelCommits}`);

        let prs = await fetchAllOpenPRs(token);
        if (recentDevelCommits) {
            prs.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        } else {
            prs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        }


        let currentGitStatus = 'unknown';
        try {
            const gitStatusPath = path.join(projectRoot, 'dist', 'gitstatus.txt');
            const gitStatusContent = fs.readFileSync(gitStatusPath, 'utf8');
            currentGitStatus = gitStatusContent.split('\n')[0].trim();
        } catch (e) {
            console.warn('Could not read dist/gitstatus.txt:', e.message);
        }

        const noExamplesNeededCacheFilePath = path.join(projectRoot, '.no-examples-needed.cache');
        let noExamplesNeededCache = new Set();
        if (fs.existsSync(noExamplesNeededCacheFilePath)) {
            const content = fs.readFileSync(noExamplesNeededCacheFilePath, 'utf8');
            noExamplesNeededCache = new Set(content.split('\n').filter(Boolean));
            console.log(`Loaded ${noExamplesNeededCache.size} entries from no-examples-needed cache.`);
        }

        const generatedExamplesCacheFilePath = path.join(projectRoot, '.generated-examples.cache');
        let generatedExamplesCache = new Set();
        if (fs.existsSync(generatedExamplesCacheFilePath)) {
            const content = fs.readFileSync(generatedExamplesCacheFilePath, 'utf8');
            generatedExamplesCache = new Set(content.split('\n').filter(Boolean));
            console.log(`Loaded ${generatedExamplesCache.size} entries from generated-examples cache.`);
        }

        const prUpdatedAtCacheFilePath = path.join(projectRoot, '.pr-updated-at-no-action.cache');
        let prUpdatedAtCache = {};
        if (fs.existsSync(prUpdatedAtCacheFilePath)) {
            try {
                const content = fs.readFileSync(prUpdatedAtCacheFilePath, 'utf8');
                prUpdatedAtCache = JSON.parse(content);
                console.log(`Loaded ${Object.keys(prUpdatedAtCache).length} entries from pr-updated-at-no-action cache.`);
            } catch (e) {
                console.warn('Could not parse pr-updated-at-no-action cache:', e.message);
                prUpdatedAtCache = {};
            }
        }

        // Фетчим только открытые PR, чтобы не тянуть тысячи закрытых
        console.log(`🚀 Fetching ${prs.length} open PR refs from upstream...`);
        const refspecs = prs.map(pr => `+refs/pull/${pr.number}/head:refs/remotes/upstream/pr/${pr.number}`);
        for (let i = 0; i < refspecs.length; i += 100) {
            const batch = refspecs.slice(i, i + 100);
            try {
                execSync(`git fetch upstream ${batch.join(' ')}`, { stdio: 'inherit', timeout: 120000 });
            } catch (e) {
                console.warn(`Fetch batch failed: ${e.message}`);
            }
        }


        for (let i = 0; i < prs.length; i++) {
            const pr = prs[i];
            // Проверяем rate limit перед обработкой PR
            const currentRateLimit = await getRateLimit(token);
            if (currentRateLimit && currentRateLimit.remaining < 50) {
                await waitForRateLimitReset(token);
            }

            if (currentGitStatus === 'unknown') {
                console.log(`⚠️ Current git status is unknown. Skipping PR #${pr.number} to avoid infinite regeneration.`);
                continue;
            }

            // Проверяем кэш updated_at для PR, где ничего не надо делать
            const prNumber = pr.number.toString();
            if (prUpdatedAtCache[prNumber] && prUpdatedAtCache[prNumber] === pr.updated_at) {
                console.log(`⏭️ PR #${pr.number}: updated_at не изменился (${pr.updated_at}), пропускаем без API-запросов.`);
                continue;
            }

            const prHeadSha = pr.head.sha;
            const cacheKey = `${prHeadSha}:${currentGitStatus}`;

            if (noExamplesNeededCache.has(cacheKey)) {
                console.log(`🎉 PR #${pr.number} уже проверен для текущих хэшей (примеры не нужны). Пропускаем!`);
                continue;
            }

            if (generatedExamplesCache.has(cacheKey)) {
                console.log(`🎉 PR #${pr.number} уже проверен для текущих хэшей (примеры сгенерированы). Переходим к заглушке.`);
                await handlePRWithExamples(pr, token, null, null);
                continue;
            }

            console.log(`\n[${new Date().toLocaleTimeString()}] --- Checking PR #${pr.number} [${i + 1}/${prs.length}] ---`);
            try {
                const files = await fetchAllPRFiles(pr.number, token);
                
                let validFiles = files.filter(f => {
                    if (f.status === 'removed' || f.status === 'renamed') return false;
                    if (f.filename.startsWith('md/') || f.filename.startsWith('doc/')) return false;
                    if (/^zdn\/[^\/]+\/[^\/]+\/(main|fipi)\.js$/.test(f.filename)) return false;
                    if (/^zdn\/[^\/]+\/[^\/]+\.js$/.test(f.filename)) return false;
                    return /^zdn\/[^\/]+\/[^\/]+\/[^\/]+\.js$/.test(f.filename);
                });
                
                const symlinkPaths = await fetchSymlinkPaths(owner, repo, pr.head.sha, validFiles.map(f => f.filename), token);
                if (symlinkPaths.size > 0) {
                    console.log(`Excluding symlinks from file count: ${[...symlinkPaths].join(', ')}`);
                }
                validFiles = validFiles.filter(f => !symlinkPaths.has(f.filename));

                if (validFiles.length < 1 || validFiles.length > 4) {
                    console.log(`PR #${pr.number} has ${validFiles.length} valid zdn/*/*/*.js files. Skipping.`);
                    noExamplesNeededCache.add(cacheKey);
                    fs.appendFileSync(noExamplesNeededCacheFilePath, cacheKey + '\n');
                    // Сохраняем updated_at для этого PR
                    prUpdatedAtCache[pr.number.toString()] = pr.updated_at;
                    fs.writeFileSync(prUpdatedAtCacheFilePath, JSON.stringify(prUpdatedAtCache, null, 2));
                    continue;
                }

                const comments = await fetchPRComments(pr.number, token);
                const commits = await fetchPRCommits(pr.number, token);
                const exampleComments = comments.filter(c => 
            c.body.includes('ПРИМЕРЫ_ЗАДАЧ') && 
            c.user && 
            c.user.login !== 'chas-ege-marta'
        );

                if (exampleComments.length === 0) {
                    console.log(`PR #${pr.number} has no ПРИМЕРЫ_ЗАДАЧ comment. Generating examples.`);
                    totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir]);
                    generatedExamplesCache.add(cacheKey);
                    fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                    await handlePRWithExamples(pr, token, comments, commits);
                    continue;
                }

                const lastComment = exampleComments[exampleComments.length - 1];
                const commentBody = lastComment.body;
                const match = commentBody.match(/ПРИМЕРЫ_ЗАДАЧ\s+([^\s]+)\s+([0-9a-f]+)\s+сборка\s+([0-9a-f]+)/);
                if (!match) {
                    console.log(`Could not parse ПРИМЕРЫ_ЗАДАЧ comment in PR #${pr.number}. Generating.`);
                    totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir]);
                    generatedExamplesCache.add(cacheKey);
                    fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                    await handlePRWithExamples(pr, token, comments, commits);
                    continue;
                }

                let commentedFile = match[1].replace(/^`|`$/g, '');
                const commitHash = match[2];
                const buildCommit = match[3];

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
                                totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir, '--edit-last']);
                            } else {
                                totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir]);
                            }
                            generatedExamplesCache.add(cacheKey);
                            fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                            await handlePRWithExamples(pr, token, comments, commits);
                            continue;
                        }
                    } else {
                        const errorText = await compareResp.text();
                        console.log(`Failed to compare commits. Status: ${compareResp.status} ${compareResp.statusText}. Response: ${errorText.substring(0, 500)}`);
                        console.log(`Debug: buildCommit=${buildCommit}, currentGitStatus=${currentGitStatus}`);
                        totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir]);
                        generatedExamplesCache.add(cacheKey);
                        fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                        await handlePRWithExamples(pr, token, comments, commits);
                        continue;
                    }
                }

                console.log(`[DEBUG] PR #${pr.number}: commentedFile=${commentedFile}`);
                console.log(`[DEBUG] PR #${pr.number}: pr.head.sha=${pr.head.sha}`);
                console.log(`[DEBUG] PR #${pr.number}: commitHash=${commitHash}`);

                let filesDiffer = false;
                try {
                    console.log(`[DEBUG] PR #${pr.number}: Running git diff ${commitHash} ${pr.head.sha} -- ${commentedFile}`);
                    const { stdout } = await execFileAsync('git', ['diff', '--no-ext-diff', commitHash, pr.head.sha, '--', commentedFile], { cwd: projectRoot });
                    if (stdout.trim() !== '') {
                        filesDiffer = true;
                        console.log(`[DEBUG] PR #${pr.number}: git diff found differences.`);
                    } else {
                        console.log(`[DEBUG] PR #${pr.number}: git diff output is empty, files are identical.`);
                    }
                } catch (gitError) {
                    console.warn(`[DEBUG] PR #${pr.number}: git diff failed: ${gitError.message}. Falling back to content comparison.`);
                    // Фоллбэк на старый метод
                    const currentFileContent = await getFileContent(owner, repo, commentedFile, pr.head.sha, token);
                    const oldFileContent = await getFileContent(owner, repo, commentedFile, commitHash, token);
                    console.log(`[DEBUG] PR #${pr.number}: currentFileContent length=${currentFileContent ? currentFileContent.length : 'null'}`);
                    console.log(`[DEBUG] PR #${pr.number}: oldFileContent length=${oldFileContent ? oldFileContent.length : 'null'}`);

                    if (currentFileContent !== oldFileContent) {
                        filesDiffer = true;
                    }
                }

                if (filesDiffer) {
                    console.log(`File ${commentedFile} differs. Generating.`);
                    totalGenerationTime += await runProvideScript(pr.number, [...filteredArgs, '--user-data-dir', userDataDir]);
                    generatedExamplesCache.add(cacheKey);
                    fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                    await handlePRWithExamples(pr, token, comments, commits);
                } else {
                    console.log(`File ${commentedFile} is identical. Skipping generation, but handling as generated.`);
                    generatedExamplesCache.add(cacheKey);
                    fs.appendFileSync(generatedExamplesCacheFilePath, cacheKey + '\n');
                    await handlePRWithExamples(pr, token, comments, commits);
                }

            } catch (e) {
                console.error(`Error processing PR #${pr.number}:`, e.message);
            }
        }
    } catch (e) {
        fatalError = e;
    } finally {
        const endRateLimit = await getRateLimit(token);
        if (endRateLimit) {
            console.log(`🚦 Rate limit at end: ${endRateLimit.remaining} / ${endRateLimit.limit} (сброс в ${new Date(endRateLimit.reset * 1000).toLocaleString()})`);
        } else {
            console.warn('🚦 Не удалось получить rate limit в конце.');
        }

        // Удаляем временную директорию в конце
        try {
            fs.rmSync(userDataDir, { recursive: true, force: true });
            console.log('Cleaned up temporary directory.');
        } catch (e) {
            console.warn(`Failed to clean up temporary directory: ${e.message}`);
        }
    }

    const totalScriptTime = Date.now() - scriptStartTime;
    console.log('\n==========================================');
    console.log(`⏱️  Суммарное время генерации задач: ${(totalGenerationTime / 1000).toFixed(2)} с`);
    console.log(`⏱️  Полное время работы скрипта:       ${(totalScriptTime / 1000).toFixed(2)} с`);
    console.log(`⏱️  Разница (API и прочие накладные):  ${((totalScriptTime - totalGenerationTime) / 1000).toFixed(2)} с`);
    console.log('==========================================');
    
    if (fatalError) {
        console.error('Fatal error in main:', fatalError.message);
        process.exit(1);
    }
}

main();


async function checkAndAskUser(pr, token, userLogin, scriptName, logName, cachedComments = null, cachedCommits = null) {
    console.log(`🔍 Проверка ${userLogin} для PR #${pr.number}`);
    try {
        const comments = cachedComments || await fetchPRComments(pr.number, token);
        
        // 1. Комментарии, упоминающие @userLogin
        const userMentions = comments.filter(c => 
            c.body && c.body.includes(`@${userLogin}`)
        );
        
        if (userMentions.length === 0) {
            return;
        }
        
        // Последний комментарий с упоминанием
        const lastMention = userMentions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        const lastMentionDate = new Date(lastMention.created_at);
        
        // 2. Комментарии от самого userLogin
        const userComments = comments.filter(c => 
            c.user && c.user.login === userLogin
        );
        const lastUserComment = userComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        const lastUserCommentDate = lastUserComment ? new Date(lastUserComment.created_at) : new Date(0);
        
        // 3. Коммиты в PR
        const commits = cachedCommits || await fetchPRCommits(pr.number, token);
        const lastCommit = commits.sort((a, b) => {
            const dateA = new Date(a.commit?.committer?.date || a.commit?.author?.date || 0);
            const dateB = new Date(b.commit?.committer?.date || b.commit?.author?.date || 0);
            return dateB - dateA;
        })[0];
        const lastCommitDate = lastCommit ? new Date(lastCommit.commit?.committer?.date || lastCommit.commit?.author?.date || 0) : new Date(0);
        
        // 4. Проверяем условие: после последнего упоминания нет ни коммита, ни комментария от пользователя
        if (lastUserCommentDate > lastMentionDate || lastCommitDate > lastMentionDate) {
            console.log(`⏭️ PR #${pr.number}: ${userLogin} уже ответил(а) или был коммит после замечаний, пропускаем.`);
            return;
        }
        
        console.log(`🚀 PR #${pr.number}: Есть свежие замечания для ${userLogin}, зовём!`);
        const scriptPath = path.join(projectRoot, 'dev', scriptName);
        
        const { stdout, stderr } = await execFileAsync('bash', [scriptPath, pr.number.toString()], {
            cwd: projectRoot,
            maxBuffer: 1024 * 1024 * 10
        });
        
        if (stderr) {
            console.warn(`stderr from ${scriptName}:\n${stderr}`);
        }
        
        // Записываем вывод в log
        const logPath = path.join(projectRoot, logName);
        const logEntry = `[${new Date().toISOString()}] PR #${pr.number}\n${stdout}\n${stderr ? 'STDERR: ' + stderr : ''}\n${'='.repeat(80)}\n`;
        fs.appendFileSync(logPath, logEntry);
        
        console.log(`✅ PR #${pr.number}: ${scriptName} выполнен успешно`);
        
    } catch (error) {
        console.error(`❌ PR #${pr.number}: Ошибка при проверке ${userLogin}:`, error.message);
        if (error.stderr) {
            console.error('stderr:', error.stderr);
        }
    }
}


async function fetchPRCommits(prNum, token) {
    let commits = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/commits?per_page=100`;
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
        commits = commits.concat(data);
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
            url = nextMatch ? nextMatch[1] : null;
        } else {
            url = null;
        }
    }
    return commits;
}


async function checkAndAskYuliya(pr, token, cachedComments = null, cachedCommits = null) {
    console.log(`🔍 Проверка Юлии для PR #${pr.number}`);
    try {
        const userLogin = 'chas-ege-yuliya';
        const comments = cachedComments || await fetchPRComments(pr.number, token);
        
        // 1. Комментарии от Юлии
        const userComments = comments.filter(c => 
            c.user && c.user.login === userLogin
        );
        const lastUserComment = userComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        const lastUserCommentDate = lastUserComment ? new Date(lastUserComment.created_at) : new Date(0);
        
        // 2. Коммиты в PR
        const commits = cachedCommits || await fetchPRCommits(pr.number, token);
        const lastCommit = commits.sort((a, b) => {
            const dateA = new Date(a.commit?.committer?.date || a.commit?.author?.date || 0);
            const dateB = new Date(b.commit?.committer?.date || b.commit?.author?.date || 0);
            return dateB - dateA;
        })[0];
        const lastCommitDate = lastCommit ? new Date(lastCommit.commit?.committer?.date || lastCommit.commit?.author?.date || 0) : new Date(0);
        
        // 3. Проверяем условие: Юлия уже комментировала этот (или более поздний) коммит
        if (lastUserCommentDate >= lastCommitDate) {
            console.log(`⏭️ PR #${pr.number}: Юлия уже комментировала этот коммит, пропускаем.`);
            return;
        }
        
        console.log(`🚀 PR #${pr.number}: Есть новый коммит, зовём Юлию!`);
        const scriptPath = path.join(projectRoot, 'dev', 'ask_Yuliya_to_review.sh');
        
        const { stdout, stderr } = await execFileAsync('bash', [scriptPath, pr.number.toString()], {
            cwd: projectRoot,
            maxBuffer: 1024 * 1024 * 10
        });
        
        if (stderr) {
            console.warn(`stderr from ask_Yuliya_to_review.sh:\n${stderr}`);
        }
        
        // Записываем вывод в log
        const logPath = path.join(projectRoot, 'yuliya.log');
        const logEntry = `[${new Date().toISOString()}] PR #${pr.number}\n${stdout}\n${stderr ? 'STDERR: ' + stderr : ''}\n${'='.repeat(80)}\n`;
        fs.appendFileSync(logPath, logEntry);
        
        console.log(`✅ PR #${pr.number}: ask_Yuliya_to_review.sh выполнен успешно`);
        
    } catch (error) {
        console.error(`❌ PR #${pr.number}: Ошибка при проверке Юлии:`, error.message);
        if (error.stderr) {
            console.error('stderr:', error.stderr);
        }
    }
}
