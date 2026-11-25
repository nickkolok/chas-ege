#!/usr/bin/env node
'use strict';

/**
 * Проверка «байт в байт» (md/how_to_review_PR.md): одни и те же шаблоны на двух
 * сборках с одним зерном, каждый — отдельным процессом, и разбор отличий.
 *
 * Как пользоваться:
 *   1. Один раз в корне репозитория — пакеты и remote на основной репозиторий:
 *        npm install && npm install --no-save grunt-cli canvas
 *        git remote add upstream https://github.com/nickkolok/chas-ege
 *   2. Заранее решить, у каких шаблонов задания должны измениться (--expect-change).
 *   3. Прогнать шаблоны, которые вызывают изменённую функцию (сборки соберутся сами
 *      или возьмутся из кеша):
 *        node dev/consumers-diff.js --before devel --after 3803 --grep 'arcBetweenSegments\('
 *   4. Первая строка отчёта — итог («байт в байт: 29»), ниже — таблица того, что
 *      изменилось и как (ответы, рисунки, текст, падения). Код возврата 1 — есть
 *      неожиданное. JSON обеих сторон — в каталоге из последней строки.
 *
 * Примеры:
 *
 *   # Потребители функции из devel: сборка devel против сборки PR 3803
 *   node dev/consumers-diff.js --before devel --after 3803 --grep 'arcBetweenSegments(Count)?\('
 *
 *   # То же плюс шаблоны этой функции из всех открытых PR (каждый — в версии своего PR)
 *   node dev/consumers-diff.js --before devel --after 3803 --grep 'arcBetweenSegments\(' --from-prs
 *
 *   # Замена из описания PR: правленые копии шаблонов лежат в /tmp/new по тем же путям
 *   node dev/consumers-diff.js --before devel --after 3804 --after-dir /tmp/new zdn/matege2023p/1/3353.js
 *
 *   # PR меняет и библиотеку, и шаблон: «после» — шаблоны из PR
 *   node dev/consumers-diff.js --before devel --after 3717 --after-src 3717 zdn/matege2023p/2/27210.js
 *
 * Сборки (--before, --after):
 *   devel            сборка upstream/devel
 *   N                PR N, слитый со своей базой (как в dev/review-batch.js; при конфликте — голова PR)
 *   ref              любой коммит, ветка или тег
 *   каталог          готовая сборка: в нём dev/run-node-template.js и lib/chas-uijs.js
 *                    (например, build/ рабочей копии)
 * Сборки по коммитам кешируются по дереву git ($TMPDIR/chas-review, ключ --cache).
 *
 * Шаблоны:
 *   пути             zdn/… через пробел
 *   --grep RE        шаблоны, где встречается RE (git grep -E; ключ можно повторять);
 *                    main.js и fipi.js не берутся
 *   --list FILE      пути из файла, по одному в строке
 *   --from-prs       ещё и шаблоны открытых PR, где есть --grep и которые отличаются от devel,
 *                    каждый в версии своего PR, на обеих сборках
 *   --prs N,M        для --from-prs: только эти PR
 * Откуда берутся сами файлы шаблонов:
 *   --src REF        для обеих сторон (по умолчанию — коммит --before, для каталога — devel)
 *   --after-src REF  для «после» — из другого коммита или PR (N — голова PR)
 *   --before-dir DIR, --after-dir DIR
 *                    правленые копии: если в DIR есть файл по тому же пути, берётся он
 *
 * Прочее:
 *   --iterations N (10), --seed S (1), --jobs N (ядра), --out DIR (каталог JSON),
 *   --expect-change RE   пути, у которых изменения ожидаются (остальные — неожиданные)
 *   --no-repeat      не прогонять эталон второй раз (по умолчанию прогоняется:
 *                    шаблон, у которого эталон не повторяется, сравнивать нельзя)
 *   --cache DIR      кеш сборок (как у review-batch.js)
 *   --runner build   раннер каждой сборки (по умолчанию обе стороны идут через раннер
 *                    этой рабочей копии: правка самого раннера не выдаётся за изменение заданий)
 *
 * Ошибка в чертеже (поле drawError раннера) считается отдельно: «чертёж стал падать» —
 * неожиданное изменение, даже если картинки совпали.
 *
 * Раннер возвращает 1, если не сгенерировалась хотя бы одна задача; остальные задачи
 * всё равно сравниваются, а в подробностях — «часть задач не сгенерирована» (до, после
 * или и там и там; «стал падать», если только после).
 *
 * Код возврата 1 — есть неожиданные изменения, или шаблон стал падать (целиком или частью задач).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const L = require('./review-lib.js');

const USAGE = 'Использование: node dev/consumers-diff.js --before СБОРКА --after СБОРКА [пути…] [--grep RE] [--list FILE] [--from-prs [--prs N,M]] ' +
	'[--src REF] [--after-src REF] [--before-dir DIR] [--after-dir DIR] [--iterations N] [--seed S] [--jobs N] [--out DIR] [--expect-change RE] [--no-repeat] [--cache DIR]';

function parseArgs(argv) {
	const o = { files: [], grep: [], iterations: 10, seed: 1, jobs: os.cpus().length, repeat: true, fromPrs: false, prs: null, runner: 'current' };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const value = () => {
			if (argv[i + 1] === undefined) throw new Error('Ключ ' + a + ' требует значения.\n' + USAGE);
			return argv[++i];
		};
		const opt = { '--before': 'before', '--after': 'after', '--src': 'src', '--after-src': 'afterSrc', '--before-dir': 'beforeDir',
			'--after-dir': 'afterDir', '--out': 'out', '--cache': 'cache', '--expect-change': 'expect', '--list': 'list' }[a];
		if (opt) o[opt] = value();
		else if (a === '--grep') o.grep.push(value());
		else if (a === '--iterations') o.iterations = parseInt(value(), 10);
		else if (a === '--seed') o.seed = value();
		else if (a === '--jobs') o.jobs = Math.max(1, parseInt(value(), 10) || 1);
		else if (a === '--from-prs') o.fromPrs = true;
		else if (a === '--prs') o.prs = value().split(',').map(Number);
		else if (a === '--no-repeat') o.repeat = false;
		else if (a === '--runner') o.runner = value();
		else if (a === '-h' || a === '--help') {
			console.log(USAGE);
			process.exit(0);
		} else if (a.startsWith('--')) throw new Error('Неизвестный ключ ' + a + '.\n' + USAGE);
		else o.files.push(a);
	}
	if (!o.before || !o.after) throw new Error('Нужны --before и --after.\n' + USAGE);
	if (o.fromPrs && !o.grep.length) throw new Error('--from-prs работает вместе с --grep.');
	if (!(o.iterations > 0)) throw new Error('--iterations — целое число больше 0.');
	if (o.runner !== 'current' && o.runner !== 'build') throw new Error('--runner — current или build.');
	return o;
}

const say = (...a) => console.error(...a);

/** Коммит, который обозначает спецификация (или null для каталога сборки) */
function specCommit(root, U, spec) {
	if (/^#?\d+$/.test(spec)) {
		const n = Number(spec.replace('#', ''));
		const head = L.prRef(U, n);
		if (!L.gitOk(['rev-parse', '--verify', '--quiet', head], root)) throw new Error('Нет PR ' + n + ' (' + head + ').');
		const base = L.prBase(root, U, n, null);
		const m = L.mergeCommit(root, L.git(['rev-parse', head], root), U + '/' + base);
		if (m.conflict) say('#' + n + ' конфликтует с ' + base + ' (' + m.conflict.join(', ') + '): беру голову PR как есть');
		return { commit: m.conflict ? L.git(['rev-parse', head], root) : m.commit, head: L.git(['rev-parse', head], root) };
	}
	const ref = spec === 'devel' ? U + '/devel' : spec;
	if (!L.gitOk(['rev-parse', '--verify', '--quiet', ref + '^{commit}'], root)) throw new Error('Не понимаю сборку «' + spec + '»: не каталог сборки, не номер PR и не коммит.');
	const c = L.git(['rev-parse', ref + '^{commit}'], root);
	return { commit: c, head: c };
}

async function resolveBuild(root, U, spec, cache) {
	const asDir = path.resolve(spec);
	if (fs.existsSync(path.join(asDir, 'dev', 'run-node-template.js'))) return { dir: asDir, commit: null, head: null };
	const c = specCommit(root, U, spec);
	const b = await L.buildCommit(root, c.commit, { cache });
	if (!b.dir) throw new Error('Сборка «' + spec + '» не удалась: ' + b.error);
	say('сборка ' + spec + ': ' + (b.cached ? 'из кеша' : 'собрана') + ' — ' + b.dir);
	return { dir: b.dir, commit: c.commit, head: c.head };
}

/** Содержимое файла в коммите; симлинк (режим 120000) разворачивается до файла */
function showResolved(root, ref, file, depth = 0) {
	const entry = L.git(['ls-tree', ref, '--', file], root);
	if (!entry) return null;
	if (entry.startsWith('120000') && depth < 10) {
		const target = L.git(['show', ref + ':' + file], root);
		return showResolved(root, ref, path.posix.normalize(path.posix.join(path.posix.dirname(file), target)), depth + 1);
	}
	return L.git(['show', ref + ':' + file], root) + '\n';
}

function materialize(root, ref, files, dir) {
	for (const f of files) {
		const dest = path.join(dir, f);
		if (fs.existsSync(dest)) continue;
		const text = showResolved(root, ref, f);
		if (text === null) continue;
		fs.mkdirSync(path.dirname(dest), { recursive: true });
		fs.writeFileSync(dest, text);
	}
}

function grepFiles(root, ref, res) {
	const out = [];
	for (const re of res) {
		let r = '';
		try {
			r = L.git(['grep', '-l', '-E', re, ref, '--', 'zdn'], root);
		} catch (e) { /* ничего не найдено */ }
		r.split('\n').filter(Boolean).forEach((l) => out.push(l.slice(ref.length + 1)));
	}
	return [...new Set(out)].filter((f) => f.endsWith('.js') && !/\/(main|fipi)\.js$/.test(f)).sort();
}

/** Открытые PR по поиску GitHub (без авторизации); null, если gh недоступен */
function openPulls() {
	try {
		const out = require('child_process').execFileSync('gh', ['api', '-X', 'GET', 'search/issues', '--paginate', '-f', 'per_page=100',
			'-f', 'q=repo:' + L.UPSTREAM_REPO + ' is:pr is:open', '--jq', '.items[].number'],
		{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
		return new Set(out.trim().split('\n').filter(Boolean).map(Number));
	} catch (e) {
		return null;
	}
}

/**
 * Раннер для сборки: свой (build/dev) или раннер этой рабочей копии с бандлом сборки —
 * копия в <out>/runner/<side>/dev, lib — ссылка на lib сборки, node_modules — уровнем выше
 */
function prepareRunner(root, build, side, o, out) {
	if (o.runner === 'build') return path.join(build.dir, 'dev', 'run-node-template.js');
	const dir = path.join(out, 'runner', side);
	fs.mkdirSync(path.join(dir, 'dev'), { recursive: true });
	fs.copyFileSync(path.join(root, 'dev', 'run-node-template.js'), path.join(dir, 'dev', 'run-node-template.js'));
	const links = [[path.join(dir, 'lib'), path.join(build.dir, 'lib')], [path.join(out, 'runner', 'node_modules'), L.nodeModules(root)]];
	for (const [link, target] of links) {
		if (!fs.existsSync(link)) fs.symlinkSync(target, link);
	}
	return path.join(dir, 'dev', 'run-node-template.js');
}

async function runTemplate(build, cwd, file, o, outFile) {
	const r = await L.run('node', [build.runner, '--filepath', file,
		'--iterations', String(o.iterations), '--seed', String(o.seed), '--json', '--quiet'], { cwd });
	let tasks = null;
	try {
		tasks = JSON.parse(r.stdout);
	} catch (e) { /* нет JSON */ }
	fs.mkdirSync(path.dirname(outFile), { recursive: true });
	fs.writeFileSync(outFile, tasks ? JSON.stringify(tasks) : '');
	// Раннер пишет «[путь] Ошибка …», а при retryWhileError — ещё «Detailed stats»: «сообщение : сколько раз»
	const lines = r.out.split('\n');
	const head = (lines.find((l) => l.startsWith('[' + file + ']')) || '').slice(file.length + 3);
	const stats = lines.map((l) => /^(.*\S) : (\d+)$/.exec(l)).filter(Boolean).sort((x, y) => y[2] - x[2]);
	const error = ((stats.length ? stats[0][1] + ' (' + stats[0][2] + '×); ' : '') + head).trim().slice(0, 200);
	return { code: r.code, tasks, text: tasks ? JSON.stringify(tasks) : null, error };
}

function describe(a, b) {
	const img = (t) => (t.txt.match(/<img[^>]*>/g) || []).join();
	const txt = (t) => t.txt.replace(/<img[^>]*>/g, '');
	const d = { ver: 0, img: 0, txt: 0 };
	const n = Math.min(a.length, b.length);
	for (let i = 0; i < n; i++) {
		if (JSON.stringify(a[i].ver) !== JSON.stringify(b[i].ver)) d.ver++;
		if (img(a[i]) !== img(b[i])) d.img++;
		if (txt(a[i]) !== txt(b[i])) d.txt++;
	}
	const parts = [];
	if (a.length !== b.length) parts.push('задач ' + a.length + ' → ' + b.length);
	parts.push('ответ ≠ ' + d.ver, 'рисунок ≠ ' + d.img, 'текст ≠ ' + d.txt + ' из ' + n);
	return parts.join(', ');
}

async function main() {
	const o = parseArgs(process.argv.slice(2));
	const root = L.repoRoot();
	const U = L.upstreamRemote(root);
	const cache = L.cacheDir(o.cache);
	const out = path.resolve(o.out || fs.mkdtempSync(path.join(os.tmpdir(), 'consumers-diff-')));
	fs.mkdirSync(out, { recursive: true });

	const before = await resolveBuild(root, U, o.before, cache);
	const after = await resolveBuild(root, U, o.after, cache);
	before.runner = prepareRunner(root, before, 'before', o, out);
	after.runner = prepareRunner(root, after, 'after', o, out);
	const srcRef = o.src ? specCommit(root, U, o.src).head : before.commit || L.git(['rev-parse', U + '/devel'], root);
	const afterSrcRef = o.afterSrc ? specCommit(root, U, o.afterSrc).head : srcRef;

	// Список: {file, label, src: {before: cwd, after: cwd}}
	let files = o.files.slice();
	if (o.list) files = files.concat(fs.readFileSync(o.list, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean));
	files = files.concat(grepFiles(root, srcRef, o.grep));
	files = [...new Set(files.map((f) => f.replace(/^\.\//, '')))];
	const srcDir = (key) => path.join(out, 'src', key);
	materialize(root, srcRef, files, srcDir('base'));
	if (afterSrcRef !== srcRef) materialize(root, afterSrcRef, files, srcDir('after'));
	const pick = (dir, f, fallback) => (dir && fs.existsSync(path.join(dir, f)) ? path.resolve(dir) : fallback);
	const items = files.filter((f) => fs.existsSync(path.join(srcDir('base'), f)) || fs.existsSync(path.join(srcDir('after'), f))).map((f) => ({
		file: f, label: f,
		before: pick(o.beforeDir, f, srcDir('base')),
		after: pick(o.afterDir, f, afterSrcRef !== srcRef ? srcDir('after') : srcDir('base')),
	}));
	const lost = files.length - items.length;
	if (lost) say('нет в ' + srcRef.slice(0, 9) + ': ' + lost + ' путей — пропущены');

	if (o.fromPrs) {
		const open = openPulls();
		if (!open) say('gh недоступен: беру все несмёрженные головы PR, в том числе закрытые');
		const devel = U + '/devel';
		const refs = L.git(['for-each-ref', '--format=%(refname:short)', 'refs/remotes/' + U + '/pr/'], root).split('\n').filter(Boolean)
			.filter((r) => {
				const n = Number(r.split('/').pop());
				return (!o.prs || o.prs.includes(n)) && (!open || open.has(n));
			});
		say('шаблоны из ' + refs.length + ' PR …');
		for (const ref of refs) {
			if (L.gitOk(['merge-base', '--is-ancestor', ref, devel], root)) continue;
			const n = ref.split('/').pop();
			const changed = new Set(L.git(['diff', '--name-only', devel + '...' + ref, '--', 'zdn'], root).split('\n').filter(Boolean));
			const prFiles = grepFiles(root, ref, o.grep).filter((f) => changed.has(f));
			if (!prFiles.length) continue;
			materialize(root, ref, prFiles, srcDir('pr-' + n));
			prFiles.forEach((f) => items.push({ file: f, label: '#' + n + ' ' + f, before: srcDir('pr-' + n), after: srcDir('pr-' + n) }));
		}
	}
	if (!items.length) throw new Error('Не выбрано ни одного шаблона.');

	say('шаблонов: ' + items.length + ', по ' + o.iterations + ' задач, зерно ' + o.seed + ', потоков ' + o.jobs + ' …');
	const results = await L.pool(items, o.jobs, async (it, i) => {
		const name = String(i).padStart(4, '0') + '_' + it.file.replace(/\//g, '_');
		const b1 = await runTemplate(before, it.before, it.file, o, path.join(out, 'before', name + '.json'));
		const b2 = o.repeat ? await runTemplate(before, it.before, it.file, o, path.join(out, 'before2', name + '.json')) : b1;
		const a = await runTemplate(after, it.after, it.file, o, path.join(out, 'after', name + '.json'));
		return { it, b1, b2, a };
	});

	const expect = o.expect ? new RegExp(o.expect) : null;
	const rows = [];
	const count = {};
	let bad = 0;
	for (const { it, b1, b2, a } of results) {
		let kind;
		let note = '';
		// Раннер возвращает 1, если упала хотя бы одна генерация, но остальные задачи
		// он выдаёт: их сравниваем, а «часть не сгенерирована» — отдельной пометкой
		const failB = !(b1.tasks && b1.tasks.length);
		const failA = !(a.tasks && a.tasks.length);
		const partB = !failB && b1.code !== 0;
		const partA = !failA && a.code !== 0;
		if (failB && failA) {
			kind = 'падает и до, и после';
			note = a.error;
		} else if (failA) {
			kind = 'стал падать';
			note = a.error;
		} else if (failB) {
			kind = 'перестал падать';
			note = b1.error;
		} else if (b1.text !== b2.text) {
			kind = 'эталон не повторяется';
		} else if (b1.text === a.text) {
			kind = 'байт в байт';
		} else {
			kind = 'изменился';
			note = describe(b1.tasks, a.tasks);
		}
		if (partA && !partB) {
			kind = 'стал падать';
			note = 'часть задач не сгенерирована: ' + a.error + (note ? '; ' + note : '');
		} else if (partA && partB) {
			note = (note ? note + '; ' : '') + 'часть задач не сгенерирована и до, и после: ' + a.error;
		} else if (partB) {
			note = (note ? note + '; ' : '') + 'до часть задач не генерировалась: ' + b1.error;
		}
		// Ошибки в чертеже (поле drawError): задача сгенерирована, но рисунок недорисован
		const drawErrors = (r) => (r.tasks || []).filter((t) => t.drawError !== undefined);
		const dB = failB ? [] : drawErrors(b1);
		const dA = failA ? [] : drawErrors(a);
		const drawNote = (d, r) => d[0].drawError + ' (' + d.length + ' из ' + r.tasks.length + ')';
		if (dA.length && !dB.length) {
			kind = 'чертёж стал падать';
			note = drawNote(dA, a) + (note ? '; ' + note : '');
		} else if (dA.length && dB.length) {
			note = 'чертёж падает и до, и после: до — ' + drawNote(dB, b1) + ', после — ' + drawNote(dA, a) + (note ? '; ' + note : '');
			if (kind === 'байт в байт') kind = 'байт в байт, но чертёж падает';
		} else if (dB.length) {
			note = 'чертёж перестал падать: было ' + drawNote(dB, b1) + (note ? '; ' + note : '');
		}
		const expected = expect && expect.test(it.file);
		if (kind === 'изменился' && expect && !expected) kind = 'изменился неожиданно';
		if (kind === 'байт в байт' && expected) kind = 'ожидали изменений, их нет';
		if (kind === 'стал падать' || kind === 'изменился неожиданно' || kind === 'чертёж стал падать') bad++;
		count[kind] = (count[kind] || 0) + 1;
		if (kind !== 'байт в байт' || note) rows.push('| ' + it.label + ' | ' + kind + ' | ' + note.replace(/\|/g, '\\|') + ' |');
	}

	const lines = [];
	lines.push('**' + o.before + ' → ' + o.after + '**: шаблонов ' + results.length + ', по ' + o.iterations + ' задач, зерно ' + o.seed + '. ' +
		Object.entries(count).map(([k, v]) => k + ': ' + v).join('; ') + '.');
	if (rows.length) {
		lines.push('', '| шаблон | итог | подробности |', '|---|---|---|');
		lines.push(...rows);
	}
	lines.push('', 'JSON: `' + out + '` (before, before2, after; исходники шаблонов — src).');
	console.log(lines.join('\n'));
	process.exit(bad ? 1 : 0);
}

main().catch((e) => {
	console.error(e.message || e);
	process.exit(2);
});
