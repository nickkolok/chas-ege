#!/usr/bin/env node
'use strict';

/**
 * Подготовка ревью пачки PR (md/review_batch.md, пп. 1–3) одной командой.
 *
 * Как пользоваться:
 *   1. Один раз в корне репозитория — пакеты и remote на основной репозиторий:
 *        npm install && npm install --no-save grunt-cli canvas
 *        git remote add upstream https://github.com/nickkolok/chas-ege
 *   2. Отчёт по пачке (Markdown; первый запуск собирает каждый PR — это минуты):
 *        node dev/review-batch.js 3711 3717 3803 3804 > /tmp/batch.md
 *   3. Код и шаблоны PR — в ../wt-3711 и т. д.: там PR, слитый с базой, а build —
 *      ссылка на его сборку:  cd ../wt-3711 && node build/dev/run-node-template.js --filepath zdn/… --json
 *   4. После мержа чего-нибудь в devel — та же команда ещё раз: раздел «С прошлого
 *      запуска» скажет, что влито и задет ли бандл; неизменённое берётся из кеша (секунды).
 *   gh нужен только для состояния PR (открыт или закрыт); без него — по git.
 *
 * Что делает:
 *  - скачивает devel, ветку документации и головы всех PR;
 *  - состояние PR: открыт, смёржен, закрыт (GitHub через gh, иначе по git);
 *  - ветку PR и silentpr к нему во всех известных форках: принят или сколько
 *    коммитов не принято;
 *  - что меняет каждый PR (по папкам), общие файлы, конфликты с базой и попарно;
 *  - собирает базу и каждый открытый PR, слитый с базой (без push и без рабочей
 *    копии), и прогоняет npm test: тестов, прибавка к базе, «Не удалось загрузить»;
 *  - заводит рабочие копии ../wt-<N> на слиянии PR с базой, build — ссылка на сборку.
 *
 * Сборки кешируются по дереву git (по умолчанию в $TMPDIR/chas-review): повторный
 * запуск без изменений ничего не пересобирает. Повторный запуск печатает, что
 * изменилось с прошлого: куда ушёл devel и какие PR в него влиты, задели ли они
 * бандл (lib/, src/), у каких PR сменилась голова (например, принят silentpr)
 * или состояние. Так пачку удобно пересматривать после каждого мержа: смёржённые
 * PR уходят в одну строку, остальные пересобираются уже поверх нового devel.
 *
 * Отчёт — Markdown в stdout, ход работы — в stderr.
 *
 * Ключи:
 *   --jobs N          параллельных сборок (по умолчанию половина ядер)
 *   --cache DIR       каталог кеша сборок и состояния
 *   --no-build        без сборок и тестов (только карта пачки)
 *   --no-silentpr     не искать ветки PR и silentpr в форках
 *   --forks a,b       дополнительные форки для поиска silentpr
 *   --worktrees DIR   где заводить рабочие копии wt-<N> (по умолчанию — рядом с репозиторием)
 *   --no-worktrees    не заводить рабочие копии
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const L = require('./review-lib.js');

const USAGE = 'Использование: node dev/review-batch.js N1 N2 … [--jobs N] [--cache DIR] [--no-build] [--no-silentpr] [--forks a,b] [--worktrees DIR | --no-worktrees]';

function parseArgs(argv) {
	const o = { prs: [], jobs: Math.max(1, Math.floor(os.cpus().length / 2)), cache: null, build: true,
		silentpr: true, forks: [], worktrees: undefined };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const value = () => {
			if (argv[i + 1] === undefined) throw new Error('Ключ ' + a + ' требует значения.');
			return argv[++i];
		};
		if (/^#?\d+$/.test(a)) o.prs.push(Number(a.replace('#', '')));
		else if (a === '--jobs') o.jobs = Math.max(1, parseInt(value(), 10) || 1);
		else if (a === '--cache') o.cache = value();
		else if (a === '--no-build') o.build = false;
		else if (a === '--no-silentpr') o.silentpr = false;
		else if (a === '--forks') o.forks = value().split(',').filter(Boolean);
		else if (a === '--worktrees') o.worktrees = value();
		else if (a === '--no-worktrees') o.worktrees = null;
		else if (a === '-h' || a === '--help') {
			console.log(USAGE);
			process.exit(0);
		} else throw new Error('Непонятный аргумент ' + a + '.\n' + USAGE);
	}
	if (!o.prs.length) throw new Error('Не указаны номера PR.\n' + USAGE);
	o.prs = [...new Set(o.prs)];
	return o;
}

const short = (sha) => (sha || '').slice(0, 9);
const say = (...a) => console.error(...a);

async function main() {
	const o = parseArgs(process.argv.slice(2));
	const root = L.repoRoot();
	const U = L.upstreamRemote(root);
	const cache = L.cacheDir(o.cache);
	const prev = L.loadState(cache);

	say('fetch ' + U + ' …');
	L.fetchAll(root, U);
	const head = {};
	const missingHead = [];
	for (const n of o.prs) {
		if (L.gitOk(['rev-parse', '--verify', '--quiet', L.prRef(U, n)], root)) head[n] = L.git(['rev-parse', L.prRef(U, n)], root);
		else missingHead.push(n);
	}
	if (missingHead.length) throw new Error('Нет PR с номерами ' + missingHead.join(', ') + ' в ' + U + '.');
	const devel = L.git(['rev-parse', U + '/devel'], root);
	const docBranch = L.git(['rev-parse', U + '/' + L.DOC_BRANCH], root);

	say('сведения о PR с GitHub …');
	const gh = L.githubInfo(o.prs);

	// Состояние: GitHub, а смёржен ли — ещё и по git (PR вливаются merge-коммитом)
	const pr = {};
	for (const n of o.prs) {
		const g = gh[n] || {};
		const base = L.prBase(root, U, n, g);
		const merged = L.gitOk(['merge-base', '--is-ancestor', head[n], U + '/' + base], root);
		let state = merged || g.state === 'merged' ? 'merged' : g.state === 'open' ? 'open'
			: g.state === 'closed' || g.state === 'not-open' ? 'closed' : 'unknown';
		pr[n] = { n, head: head[n], base, state, author: g.author || null, title: g.title || '', branch: g.branch || null };
	}
	const live = o.prs.filter((n) => pr[n].state !== 'merged' && pr[n].state !== 'closed');
	for (const n of o.prs) {
		if (pr[n].state !== 'merged' || pr[n].author) continue;
		const m = /from ([^/\s]+)\/(\S+)/.exec(L.git(['log', '-1', '--merges', '--format=%s', '--grep=^Merge pull request #' + n + ' from',
			U + '/' + pr[n].base], root));
		if (m) Object.assign(pr[n], { author: m[1], branch: m[2] });
	}

	// Ветки PR и silentpr в форках
	if (o.silentpr) {
		const forks = [...new Set(L.KNOWN_FORKS.concat(o.forks, o.prs.map((n) => pr[n].author).filter(Boolean))
			.map((f) => f.toLowerCase()))];
		say('ветки форков (' + forks.length + ') …');
		const branches = new Map(await L.pool(forks, 8, async (f) => [f, await L.forkBranches(f)]));
		for (const n of live) {
			const p = pr[n];
			if (!p.branch || !p.author) {
				for (const [f, map] of branches) {
					for (const [b, sha] of map) {
						if (sha === p.head && !b.startsWith('silentpr/') && (!p.author || p.author.toLowerCase() === f)) {
							p.author = p.author || f;
							p.branch = p.branch || b;
						}
					}
				}
			}
			p.silentpr = [];
			if (!p.author || !p.branch) continue;
			const name = 'silentpr/' + p.author.toLowerCase() + '/' + p.branch;
			for (const [f, map] of branches) {
				if (!map.has(name)) continue;
				const local = 'refs/remotes/review-silentpr/' + f + '/' + p.author.toLowerCase() + '/' + p.branch;
				L.git(['fetch', '--quiet', '--no-tags', 'https://github.com/' + f + '/chas-ege', '+refs/heads/' + name + ':' + local], root);
				// Непринятые — те, которых нет в PR и под другим хешем: коммит, перенесённый
				// в PR через cherry-pick (тот же патч), принят
				const pending = Number(L.git(['rev-list', '--count', '--cherry-pick', '--right-only', p.head + '...' + local], root));
				// Непринятые коммиты могли устареть: сольётся ли silentpr с нынешней головой PR
				const clean = pending ? !L.mergeCommit(root, p.head, local).conflict : true;
				p.silentpr.push({ fork: f, branch: name, pending, clean });
			}
		}
	}

	// Карта пачки. Для открытых PR — что PR на самом деле добавит к базе (база..слияние):
	// общий коммит, уже влитый в базу другим PR, сюда не попадает. При конфликте — база...PR.
	for (const n of o.prs) {
		const p = pr[n];
		if (live.includes(n)) p.merge = L.mergeCommit(root, p.head, U + '/' + p.base);
		const range = p.merge && !p.merge.conflict ? [U + '/' + p.base, p.merge.commit] : [U + '/' + p.base + '...' + p.head];
		const files = L.git(['diff', '--name-only'].concat(range), root).split('\n').filter(Boolean);
		p.files = files;
		const dirs = {};
		files.forEach((f) => {
			const d = f.includes('/') ? f.split('/')[0] : f;
			dirs[d] = (dirs[d] || 0) + 1;
		});
		p.dirs = Object.keys(dirs).sort().map((d) => d + ' ' + dirs[d]).join(', ');
		p.behind = Number(L.git(['rev-list', '--count', p.head + '..' + U + '/' + p.base], root));
	}
	const fileCount = {};
	live.forEach((n) => pr[n].files.forEach((f) => { (fileCount[f] = fileCount[f] || []).push(n); }));
	const shared = Object.entries(fileCount).filter(([, ns]) => ns.length > 1);
	const pairConflicts = [];
	for (const a of live) {
		for (const b of live) {
			if (a >= b) continue;
			const m = L.mergeCommit(root, pr[a].head, pr[b].head);
			if (m.conflict) pairConflicts.push([a, b, m.conflict]);
		}
	}

	// Сборки: база и каждый открытый PR, слитый с базой (PR только в md/ не собираются)
	const builds = {};
	if (o.build) {
		const jobs = [{ key: 'devel', commit: devel }];
		for (const n of live) {
			if (pr[n].base === 'devel' && pr[n].merge && !pr[n].merge.conflict) jobs.push({ key: n, commit: pr[n].merge.commit });
			else if (pr[n].base === 'devel') jobs.push({ key: n, commit: pr[n].head, unmerged: true });
		}
		say('сборки: ' + jobs.length + ' (параллельно ' + o.jobs + ') …');
		await L.pool(jobs, o.jobs, async (j) => {
			const t0 = Date.now();
			builds[j.key] = Object.assign({ unmerged: !!j.unmerged }, await L.buildCommit(root, j.commit, { cache }));
			const b = builds[j.key];
			say('  ' + (j.key === 'devel' ? 'devel' : '#' + j.key) + ': ' + (b.error ? b.error : b.cached ? 'из кеша' : 'собрано за ' + Math.round((Date.now() - t0) / 1000) + ' с'));
		});
	}

	// Рабочие копии на слиянии PR с базой; build — ссылка на сборку из кеша
	const worktrees = {};
	if (o.worktrees !== null && o.build) {
		const wtRoot = path.resolve(o.worktrees || path.join(root, '..'));
		for (const n of live) {
			const b = builds[n];
			if (!b || !b.dir) continue;
			const wt = path.join(wtRoot, 'wt-' + n);
			if (fs.existsSync(wt)) {
				if (!L.gitOk(['rev-parse', '--is-inside-work-tree'], wt) || L.git(['status', '--porcelain', '--untracked-files=no'], wt)) {
					say('  ' + wt + ': не рабочая копия git или есть незакоммиченные правки — не трогаю');
					continue;
				}
				L.git(['checkout', '--quiet', '--detach', b.commit], wt);
			} else {
				L.git(['worktree', 'add', '--quiet', '--detach', wt, b.commit], root);
			}
			for (const [name, target] of [['node_modules', L.nodeModules(root)], ['build', b.dir]]) {
				const link = path.join(wt, name);
				let st = null;
				try {
					st = fs.lstatSync(link);
				} catch (e) { /* нет */ }
				if (st && !st.isSymbolicLink()) {
					say('  ' + link + ' — настоящий каталог, ссылку не ставлю');
					continue;
				}
				if (st) fs.unlinkSync(link);
				fs.symlinkSync(target, link);
			}
			worktrees[n] = wt;
		}
	}

	// Отчёт
	const out = [];
	const w = (s) => out.push(s === undefined ? '' : s);
	w('# Пачка: ' + o.prs.map((n) => '#' + n).join(' '));
	w();
	w('`' + U + '/devel` = `' + short(devel) + '`, `' + L.DOC_BRANCH + '` = `' + short(docBranch) + '`' +
		(builds.devel && builds.devel.tests ? '; тестов в devel: ' + builds.devel.tests.total : ''));
	if (prev.devel) {
		const changes = [];
		if (prev.devel !== devel) {
			const mergedSince = L.gitOk(['merge-base', '--is-ancestor', prev.devel, devel], root)
				? L.git(['log', '--merges', '--format=%s', prev.devel + '..' + devel], root).split('\n')
					.map((s) => (/Merge pull request #(\d+)/.exec(s) || [])[1]).filter(Boolean)
				: null;
			changes.push('devel: `' + short(prev.devel) + '` → `' + short(devel) + '`' +
				(mergedSince ? (mergedSince.length ? ', влиты: ' + mergedSince.map((x) => '#' + x).join(', ') : ', без PR') : ' (не вперёд!)'));
			// Что перепроверять: lib/ и src/ меняют бандл — потребителей (dev/consumers-diff.js) стоит
			// прогнать заново; если затронуты только zdn/, md/ и т. п., хватает тестов и конфликтов из этого отчёта
			const touched = {};
			L.git(['diff', '--name-only', prev.devel, devel], root).split('\n').filter(Boolean).forEach((f) => {
				const d = f.split('/')[0];
				touched[d] = (touched[d] || 0) + 1;
			});
			const bundle = ['lib', 'src'].filter((d) => touched[d]);
			changes.push('в devel изменены: ' + Object.keys(touched).sort().map((d) => d + ' ' + touched[d]).join(', ') +
				(bundle.length ? ' — бандл другой (' + bundle.join(', ') + '): потребителей прогнать заново' : ' — бандл прежний'));
		}
		for (const n of o.prs) {
			const was = prev.prs && prev.prs[n];
			if (!was) continue;
			if (was.head !== pr[n].head) changes.push('#' + n + ': голова `' + short(was.head) + '` → `' + short(pr[n].head) + '`');
			if (was.state !== pr[n].state) changes.push('#' + n + ': ' + was.state + ' → ' + pr[n].state);
		}
		w();
		w('## С прошлого запуска (' + prev.time + ')');
		w();
		w(changes.length ? changes.map((c) => '- ' + c).join('\n') : '- ничего не изменилось');
	}
	w();
	w('## PR');
	w();
	const stateName = { open: 'открыт', merged: '**смёржен**', closed: '**закрыт**', unknown: 'открыт?' };
	w('| PR | состояние | автор:ветка | база | меняет | отстаёт | слияние с базой | тесты | silentpr |');
	w('|---|---|---|---|---|---|---|---|---|');
	for (const n of o.prs) {
		const p = pr[n];
		if (!live.includes(n)) {
			w('| #' + n + ' | ' + stateName[p.state] + ' | ' + (p.author || '?') + ':' + (p.branch || '?') + ' | ' + p.base + ' |  |  |  |  |  |');
			continue;
		}
		const b = builds[n];
		const base = builds.devel && builds.devel.tests ? builds.devel.tests.total : null;
		let tests = '';
		if (b && b.error) tests = '❌ ' + b.error;
		else if (b && b.tests) {
			tests = b.tests.total + (base !== null ? ' (' + (b.tests.total - base >= 0 ? '+' : '') + (b.tests.total - base) + ')' : '') +
				(b.tests.failed ? ', ❌ упало ' + b.tests.failed : '') +
				(b.loadFailures.length ? ', ❌ ' + b.loadFailures.length + '× «Не удалось загрузить»' : '') +
				(b.unmerged ? ' (голова как есть)' : '');
		} else if (b) tests = '❌ итог тестов не найден';
		const sp = (p.silentpr || []).map((s) => s.fork + ': ' + (s.pending ? 'не принято ' + s.pending +
			(s.clean ? '' : ', ❌ конфликт с головой PR') : 'принят')).join('; ');
		w('| #' + n + ' | ' + stateName[p.state] + ' | ' + (p.author || '?') + ':' + (p.branch || '?') + ' | ' + p.base +
			' | ' + p.dirs + ' | ' + p.behind + ' | ' + (p.merge.conflict ? '❌ ' + p.merge.conflict.join(', ') : 'без конфликтов') +
			' | ' + tests + ' | ' + sp + ' |');
	}
	w();
	w('## Связи');
	w();
	w('Общие файлы: ' + (shared.length ? '' : 'нет'));
	shared.forEach(([f, ns]) => w('- `' + f + '`: ' + ns.map((x) => '#' + x).join(', ')));
	w();
	w('Конфликты между PR: ' + (pairConflicts.length ? '' : 'нет'));
	pairConflicts.forEach(([a, b, files]) => w('- #' + a + ' и #' + b + ': ' + files.map((f) => '`' + f + '`').join(', ')));
	if (o.build) {
		w();
		w('## Сборки');
		w();
		w('Раннер сборки: `node <сборка>/dev/run-node-template.js --filepath zdn/… --iterations 300 --seed 1 --json`.');
		w();
		for (const key of Object.keys(builds)) {
			const b = builds[key];
			w('- ' + (key === 'devel' ? 'devel' : '#' + key) + ': `' + (b.dir || b.error) + '`' +
				(worktrees[key] ? ', рабочая копия `' + worktrees[key] + '`' : ''));
		}
	}
	console.log(out.join('\n'));

	const state = { time: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), root, devel, docBranch,
		prs: Object.assign({}, prev.prs || {}), builds: Object.assign({}, prev.builds || {}) };
	for (const n of o.prs) state.prs[n] = { head: pr[n].head, state: pr[n].state, base: pr[n].base };
	if (builds.devel && builds.devel.dir) state.builds[devel] = builds.devel.dir;
	for (const n of live) if (builds[n] && builds[n].dir) state.builds[pr[n].merge.commit || pr[n].head] = builds[n].dir;
	L.saveState(cache, state);
}

main().catch((e) => {
	console.error(e.message || e);
	process.exit(1);
});
