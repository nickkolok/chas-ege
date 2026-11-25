'use strict';

/**
 * Общие функции скриптов ревью (dev/review-batch.js, dev/consumers-diff.js):
 * git, поиск upstream, сведения о PR, сборка коммита с кешем по дереву.
 * Сам по себе не запускается.
 *
 * Сборка кешируется по хешу дерева (git tree), а не по коммиту: одно и то же
 * содержимое собирается один раз, сколько бы коммитов на него ни указывало.
 * Пока devel стоит на месте, повторный запуск ничего не пересобирает; когда devel
 * уходит вперёд, пересобираются только слияния PR с новым devel.
 */

const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const UPSTREAM_REPO = 'nickkolok/chas-ege';
// Форки, где ищутся ветки PR и чужие silentpr (дополняются авторами PR и ключом --forks)
const KNOWN_FORKS = ['chas-ege-selena', 'chas-ege-ulyana', 'chas-ege-ellariya', 'kira-dry-everywhere',
	'sugarhedgehog', 'kalendar2', 'zer00player'];
const DOC_BRANCH = 'md-qwen-repo-structure';
// Бандл без chas-lib весит около 2,3 МБ, полный — больше 6 МБ (md/how_to_review_PR.md)
const MIN_BUNDLE_SIZE = 5e6;

function git(args, cwd) {
	return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function gitOk(args, cwd) {
	try {
		git(args, cwd);
		return true;
	} catch (e) {
		return false;
	}
}

/** Запуск процесса без блокировки: {code, out, stdout}; out — stdout и stderr вместе (и в файл log, если задан) */
function run(cmd, args, { cwd, log, env } = {}) {
	return new Promise((resolve) => {
		const child = spawn(cmd, args, { cwd, env: env || process.env, stdio: ['ignore', 'pipe', 'pipe'] });
		const chunks = [];
		const stdout = [];
		const sink = log ? fs.createWriteStream(log) : null;
		const take = (d) => {
			chunks.push(d);
			if (sink) sink.write(d);
		};
		child.stdout.on('data', (d) => {
			stdout.push(d);
			take(d);
		});
		child.stderr.on('data', take);
		child.on('close', (code) => {
			if (sink) sink.end();
			resolve({ code, out: Buffer.concat(chunks).toString('utf8'), stdout: Buffer.concat(stdout).toString('utf8') });
		});
	});
}

/** Выполнить fn над элементами не более чем в jobs потоков; результаты — в порядке items */
async function pool(items, jobs, fn) {
	const results = new Array(items.length);
	let next = 0;
	const worker = async () => {
		while (next < items.length) {
			const i = next++;
			results[i] = await fn(items[i], i);
		}
	};
	await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, items.length)) }, worker));
	return results;
}

function repoRoot() {
	return git(['rev-parse', '--show-toplevel']);
}

/** Имя remote основного репозитория (по URL); если его нет — ошибка с готовой командой */
function upstreamRemote(root) {
	const remotes = git(['remote', '-v'], root).split('\n')
		.map((line) => line.split(/\s+/))
		.filter((p) => p[1] && new RegExp('github\\.com[:/]' + UPSTREAM_REPO + '(\\.git)?/?$', 'i').test(p[1]));
	if (!remotes.length) {
		throw new Error('Нет remote с ' + UPSTREAM_REPO + '. Добавьте:\n  git remote add upstream https://github.com/' + UPSTREAM_REPO);
	}
	return remotes[0][0];
}

/** Головы всех PR (refs/remotes/<U>/pr/N), devel и ветка документации — одним fetch */
function fetchAll(root, U) {
	git(['fetch', '--quiet', '--no-tags', U,
		'+refs/heads/devel:refs/remotes/' + U + '/devel',
		'+refs/heads/' + DOC_BRANCH + ':refs/remotes/' + U + '/' + DOC_BRANCH,
		'+refs/pull/*/head:refs/remotes/' + U + '/pr/*'], root);
}

function prRef(U, n) {
	return U + '/pr/' + n;
}

/**
 * Сведения о PR с GitHub. Сначала REST (repos/…/pulls/N через gh: даёт и ветку, и базу),
 * если он недоступен (песочница без доступа к API репозитория) — поиск открытых PR
 * (search/issues: автор и заголовок, без ветки). Без gh — пустой объект.
 */
function githubInfo(numbers) {
	const info = {};
	const gh = (args) => execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
	let restWorks = true;
	for (const n of numbers) {
		if (!restWorks) break;
		try {
			const p = JSON.parse(gh(['api', 'repos/' + UPSTREAM_REPO + '/pulls/' + n]));
			info[n] = {
				state: p.merged_at ? 'merged' : p.state, author: p.user.login, title: p.title,
				base: p.base.ref, branch: p.head.ref, headOwner: p.head.repo ? p.head.repo.owner.login : null,
				source: 'rest',
			};
		} catch (e) {
			restWorks = false;
		}
	}
	const missing = numbers.filter((n) => !info[n]);
	if (!missing.length) return info;
	try {
		const out = gh(['api', '-X', 'GET', 'search/issues', '--paginate', '-f', 'per_page=100',
			'-f', 'q=repo:' + UPSTREAM_REPO + ' is:pr is:open',
			'--jq', '.items[] | [.number, .user.login, .title] | @tsv']);
		const open = new Map(out.trim().split('\n').filter(Boolean).map((l) => {
			const [num, author, title] = l.split('\t');
			return [Number(num), { author, title }];
		}));
		for (const n of missing) {
			info[n] = open.has(n) ? Object.assign({ state: 'open', source: 'search' }, open.get(n))
				: { state: 'not-open', source: 'search' };
		}
	} catch (e) {
		// gh нет или поиск недоступен: остаются сведения из git
	}
	return info;
}

/** Ветки форка: Map имя ветки → sha (git ls-remote, без авторизации) */
async function forkBranches(fork) {
	const r = await run('git', ['ls-remote', '--heads', 'https://github.com/' + fork + '/chas-ege'], { env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0' }) });
	const map = new Map();
	if (r.code !== 0) return map;
	for (const line of r.out.split('\n')) {
		const m = /^([0-9a-f]{40})\trefs\/heads\/(.+)$/.exec(line);
		if (m) map.set(m[2], m[1]);
	}
	return map;
}

/** База PR: из GitHub, иначе по содержимому — PR только в md/ идёт в ветку документации */
function prBase(root, U, n, gh) {
	if (gh && gh.base) return gh.base;
	const files = git(['diff', '--name-only', U + '/devel...' + prRef(U, n)], root).split('\n').filter(Boolean);
	return files.length && files.every((f) => f.startsWith('md/')) ? DOC_BRANCH : 'devel';
}

/** Коммит «a, слитый с b» без рабочей копии: {commit, tree} или {conflict: [файлы]} */
function mergeCommit(root, a, b) {
	if (gitOk(['merge-base', '--is-ancestor', b, a], root)) {
		return { commit: git(['rev-parse', a], root), tree: git(['rev-parse', a + '^{tree}'], root) };
	}
	let tree;
	try {
		tree = git(['merge-tree', '--write-tree', a, b], root).split('\n')[0];
	} catch (e) {
		const out = String(e.stdout || '');
		const files = out.split('\n\n')[0].split('\n').slice(1).map((l) => l.split('\t')[1]).filter(Boolean);
		return { conflict: [...new Set(files)] };
	}
	const env = Object.assign({}, process.env, {
		GIT_AUTHOR_NAME: 'review', GIT_AUTHOR_EMAIL: 'review@localhost',
		GIT_COMMITTER_NAME: 'review', GIT_COMMITTER_EMAIL: 'review@localhost',
	});
	const commit = execFileSync('git', ['commit-tree', tree, '-p', a, '-p', b, '-m', 'review: ' + a + ' + ' + b],
		{ cwd: root, env, encoding: 'utf8' }).trim();
	return { commit, tree };
}

function cacheDir(opt) {
	const dir = opt || path.join(os.tmpdir(), 'chas-review');
	fs.mkdirSync(path.join(dir, 'builds'), { recursive: true });
	fs.mkdirSync(path.join(dir, 'logs'), { recursive: true });
	return dir;
}

/** node_modules с grunt и canvas (md/how_to_review_PR.md, «Подготовка»); путь к нему */
function nodeModules(root) {
	const nm = path.join(root, 'node_modules');
	const missing = ['.bin/grunt', 'canvas', 'jsdom'].filter((p) => !fs.existsSync(path.join(nm, p)));
	if (missing.length) {
		throw new Error('В ' + nm + ' нет ' + missing.join(', ') + '. Один раз в корне репозитория:\n' +
			'  npm install && npm install --no-save grunt-cli canvas');
	}
	return fs.realpathSync(nm);
}

function readMeta(dir) {
	try {
		return JSON.parse(fs.readFileSync(path.join(dir, 'review-meta.json'), 'utf8'));
	} catch (e) {
		return null;
	}
}

/**
 * Сборка коммита: каталог <cache>/builds/<дерево> с dev/run-node-template.js и lib/
 * (то, что grunt кладёт в build/), и итог npm test в review-meta.json.
 * Если такое дерево уже собрано — сразу ответ из кеша.
 */
async function buildCommit(root, commit, { cache, log } = {}) {
	const tree = git(['rev-parse', commit + '^{tree}'], root);
	const dir = path.join(cache, 'builds', tree);
	const meta = readMeta(dir);
	if (meta) return Object.assign({ dir, cached: true }, meta);

	const nm = nodeModules(root);
	const link = path.join(cache, 'builds', 'node_modules');
	if (!fs.existsSync(link)) fs.symlinkSync(nm, link);

	const wt = path.join(cache, 'wt', tree.slice(0, 12));
	if (fs.existsSync(wt)) git(['worktree', 'remove', '--force', wt], root);
	git(['worktree', 'add', '--detach', '--force', wt, commit], root);
	fs.symlinkSync(nm, path.join(wt, 'node_modules'));
	const logFile = log || path.join(cache, 'logs', tree.slice(0, 12) + '.log');
	const t0 = Date.now();
	let ok = false;
	// Ветка со старой базой иногда собирает бандл без chas-lib с первого раза: тогда ещё раз
	for (let attempt = 0; attempt < 2 && !ok; attempt++) {
		const g = await run(path.join(nm, '.bin', 'grunt'), [], { cwd: wt, log: logFile });
		const bundle = path.join(wt, 'build', 'lib', 'chas-uijs.js');
		ok = g.code === 0 && fs.existsSync(bundle) && fs.statSync(bundle).size > MIN_BUNDLE_SIZE;
	}
	if (!ok) {
		git(['worktree', 'remove', '--force', wt], root);
		return { dir: null, error: 'grunt не собрал бандл, лог: ' + logFile };
	}
	const t = await run('node', ['dev/run-node-tests.js'], { cwd: wt });
	const total = /Всего тестов:\s*(\d+),\s*Прошло:\s*(\d+),\s*Упало:\s*(\d+)/.exec(t.out);
	const result = {
		tree, commit, buildMs: Date.now() - t0,
		tests: total ? { total: +total[1], passed: +total[2], failed: +total[3] } : null,
		loadFailures: (t.out.match(/Не удалось загрузить[^\n]*/g) || []),
		testCode: t.code,
	};
	fs.renameSync(path.join(wt, 'build'), dir);
	fs.writeFileSync(path.join(dir, 'review-meta.json'), JSON.stringify(result, null, '\t'));
	git(['worktree', 'remove', '--force', wt], root);
	return Object.assign({ dir, cached: false }, result);
}

function stateFile(cache) {
	return path.join(cache, 'state.json');
}

function loadState(cache) {
	try {
		return JSON.parse(fs.readFileSync(stateFile(cache), 'utf8'));
	} catch (e) {
		return {};
	}
}

function saveState(cache, state) {
	fs.writeFileSync(stateFile(cache), JSON.stringify(state, null, '\t'));
}

module.exports = {
	UPSTREAM_REPO, KNOWN_FORKS, DOC_BRANCH,
	git, gitOk, run, pool, repoRoot, upstreamRemote, fetchAll, prRef, githubInfo, forkBranches, prBase,
	mergeCommit, cacheDir, nodeModules, buildCommit, readMeta, loadState, saveState,
};
