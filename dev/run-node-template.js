#!/usr/bin/env node
'use strict';

/**
 * Запуск шаблонов «Час ЕГЭ» в «голом» Node.js, БЕЗ headless-браузера.
 *
 * Функциональный аналог sh/headless-debug.mjs, но вместо puppeteer+Chrome
 * используется jsdom (уже есть в dependencies) и собранный бандл
 * build/lib/chas-uijs.js (тот же, что грузит dist/sh/otladka.html).
 * Изменений в существующий код проекта НЕ вносит — нужен только `grunt`.
 *
 * Использование:
 *   node dev/run-node-template.js --filepath zdn/matege2024p/10/15.js [опции]
 *   node dev/run-node-template.js --filepath t1.js --filepath t2.js ...   (пакетно)
 *   find zdn -name '*.js' | node dev/run-node-template.js --batch-stdin --json
 *
 * Опции:
 *   --filepath <путь>   путь к шаблону (.js или .cpp); можно указать несколько
 *   --batch-stdin       прочитать список шаблонов из stdin (по одному на строку)
 *   --iterations <n>    сколько примеров сгенерировать для каждого шаблона (1)
 *   --seed <строка>     зерно ГСЧ (seedrandom) — воспроизводимость вывода
 *   --no-tex            не печатать LaTeX-блок
 *   --json              машинный вывод: JSON-массив результатов
 *   --quiet             не транслировать console.log из недр библиотек
 *
 * Код возврата: 0 — все шаблоны отработали, 1 — хотя бы один упал.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const projectRoot = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. Аргументы
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
	filepaths: [], batchStdin: false, iterations: 1,
	seed: null, tex: true, json: false, quiet: false,
};
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--filepath' && args[i + 1]) {
		opts.filepaths.push(args[++i]);
	} else if (args[i] === '--batch-stdin') {
		opts.batchStdin = true;
	} else if (args[i] === '--iterations' && args[i + 1]) {
		opts.iterations = parseInt(args[++i], 10);
	} else if (args[i] === '--seed' && args[i + 1]) {
		opts.seed = args[++i];
	} else if (args[i] === '--no-tex') {
		opts.tex = false;
	} else if (args[i] === '--json') {
		opts.json = true;
		opts.quiet = true;
	} else if (args[i] === '--quiet') {
		opts.quiet = true;
	} else if (!args[i].startsWith('--')) {
		opts.filepaths.push(args[i]); // позиционные пути тоже принимаем
	}
}

if (opts.batchStdin) {
	opts.filepaths = opts.filepaths.concat(
		fs.readFileSync(0, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
	);
}

if (!opts.filepaths.length) {
	console.error('Использование: node dev/run-node-template.js --filepath <путь> [--iterations N] [--seed S] [--no-tex] [--json] [--quiet] [--batch-stdin]');
	process.exit(1);
}

const t0 = Date.now();
const log = opts.json ? () => {} : console.log;

// ---------------------------------------------------------------------------
// 2. jsdom-окружение (приём обкатан в dev/run-node-tests.js)
// ---------------------------------------------------------------------------
const virtualConsole = new VirtualConsole();
const spamPatterns = ['отработал', 'загружен', 'добавлен', 'запрошен', 'Не удалось выделить настройки'];
virtualConsole.on('log', (...a) => {
	if (opts.quiet) return;
	const s = a.join(' ');
	if (spamPatterns.some((p) => s.includes(p))) return;
	console.log(s);
});
virtualConsole.on('info', (...a) => { if (!opts.quiet) console.log(a.join(' ')); });
virtualConsole.on('warn', (...a) => console.warn(a.join(' ')));
virtualConsole.on('error', (...a) => console.error(a.join(' ')));
virtualConsole.on('jsdomError', (e) => {
	// jsdom не реализует canvas.getContext и пр. — для генерации это не нужно
	if (e.message && e.message.includes('Not implemented')) return;
	console.error('JSDOM Error:', e.stack || e.message);
});

// Каркас DOM повторяет контейнеры otladka.html:
// lib/style.js при загрузке обращается к #document-write, menu.js — к
// chas.design.menuKeeperId, экспорт — к #question.
const dom = new JSDOM('<!DOCTYPE html><html><body>' +
	'<div id="document-write"></div>' +
	'<div id="legacyMenuKeeper"></div>' +
	'<div id="legacySliderKeeper"></div>' +
	'<div id="readiness-message"></div>' +
	'<div id="typesettable-wrap">' +
	'<div id="question" class="question"></div>' +
	'<div id="resh" class="question"></div>' +
	'<div id="answer"></div><div id="wrongAnswer"></div>' +
	'</div>' +
	'<div id="wrap"><div id="panel"><input id="answer-input"></div></div>' +
	'<div id="scripts"></div>' +
	'</body></html>', {
	// ВАЖНО: не file://, иначе jsdom считает origin «opaque» и localStorage
	// (нужен chasStorage) бросает SecurityError. Приём из run-node-tests.js.
	// А .html на конце нужен lib/menu.js (generateNormalMenu парсит адрес).
	url: 'http://localhost/dist/sh/otladka.html',
	runScripts: 'dangerously',
	pretendToBeVisual: true,
	virtualConsole: virtualConsole,
});
const window = dom.window;
const vmContext = dom.getInternalVMContext();

/** Выполнить код в контексте окна jsdom (семантика обычного <script>) */
function evalInWindow(code, filename) {
	return vm.runInContext(code, vmContext, { filename: filename });
}

// 2.1. Заглушки того, что в браузере даёт страница, а для генерации не нужно
evalInWindow(`
	window.chas = window.chas || {
		maintainer: 'node-runner',
		mode: { svinta: true, root: '../', extPath: '../ext/', forceminjs: false },
		design: { menuKeeperId: 'legacyMenuKeeper', sliderKeeperId: 'legacySliderKeeper' },
		version: String(Date.now()),
	};
	// MathJax нужен только для визуального MathJax.Hub.Typeset(); генерация и
	// roughHTML2LaTeX() работают без него.
	window.MathJax = {
		isReady: true,
		Hub: {
			Typeset: function () {},
			Queue: function () {},
			Config: function () {},
			Register: { StartupHook: function () {}, MessageHook: function () {} },
		},
		Ajax: { loadComplete: function () {}, Require: function () {} },
	};
	window.alert = function (msg) { console.log('[alert] ' + msg); };
	// lib/canvas.js расширяет CanvasRenderingContext2D.prototype при загрузке.
	// В jsdom без npm-пакета «canvas» этого класса нет — даём пустой прототип
	// (тот же приём, что в dev/run-node-tests.js). Рисование (vopr.dey) в Node
	// не вызывается, а генерация тегов <canvas> — чисто строковая.
	if (!window.CanvasRenderingContext2D) {
		window.CanvasRenderingContext2D = function () {};
		window.CanvasRenderingContext2D.prototype = {};
	}
	if (!window.ImageData) { window.ImageData = function () {}; }
`, '<stubs>');

// ---------------------------------------------------------------------------
// 3. Ядро проекта: единый бандл chas-uijs.js
//    (= chas-lib + jQuery + mathjs + nerdamer + core_vopr + core_nabor +
//       core_dvig + src/chas2/* + …; тот же список, что грузит otladka.html)
// ---------------------------------------------------------------------------
const bundlePath = path.join(projectRoot, 'build', 'lib', 'chas-uijs.js');
if (!fs.existsSync(bundlePath)) {
	console.error('Не найден ' + bundlePath + ' — сначала выполните `grunt`.');
	process.exit(1);
}
try {
	evalInWindow(fs.readFileSync(bundlePath, 'utf8'), 'chas-uijs.js');
} catch (e) {
	console.error('Ошибка при загрузке бандла:', e && e.stack ? e.stack : e);
	process.exit(1);
}
const tBundle = Date.now();

// Как и otladka.js: dvig.dgn=0 — отключаем диагностический режим движка
window.dvig.dgn = 0;

// Сохраним оригинал nabor.preferences (для сброса Proxy между шаблонами)
evalInWindow('window.__originalNaborPreferences = window.nabor.preferences;', '<save-prefs>');

if (opts.seed !== null) {
	// В dev-репозитории ext/seedrandom.min.js отсутствует (concat молча его
	// пропускает), зато seedrandom@3 есть в dependencies — грузим в окно:
	// UMD без module сам навесит Math.seedrandom (как urljson.js и ожидает).
	const seedrandomPath = path.join(projectRoot, 'node_modules', 'seedrandom', 'seedrandom.min.js');
	evalInWindow(fs.readFileSync(seedrandomPath, 'utf8'), 'seedrandom.min.js');
	if (typeof window.Math.seedrandom !== 'function') {
		console.error('Не удалось инициализировать seedrandom');
		process.exit(1);
	}
	window.Math.seedrandom(String(opts.seed));
}

// ---------------------------------------------------------------------------
// 4. Генерация по одному шаблону
// ---------------------------------------------------------------------------

/** Один прогон шаблона; возвращает снимок vopr */
function runOnce(templateCode, filename, isCpp) {
	window.vopr.podg(); // сброс, как в createFromFile()
	if (isCpp) {
		window.chas2.task.setJscppTask(templateCode);
	} else {
		evalInWindow(templateCode, filename);
	}
	if (window.vopr.err) {
		throw new Error('Задание не прошло валидацию движка (vopr.err=1)');
	}
	return {
		txt: String(window.vopr.txt),
		ver: window.vopr.ver.slice(),
		nev: window.vopr.nev.slice(),
		rsh: String(window.vopr.rsh),
		preference: window.vopr.preference,
	};
}

/** LaTeX-экспорт — ровно как startQuickExportToTex() из otladka.js, но
 *  roughHTML2LaTeX живёт в lib/func.js, т.е. уже внутри chas-lib */
function toLatex(snapshot) {
	window.__snap = snapshot;
	return evalInWindow(`
		(function () {
			var v = window.__snap;
			return [
				'Текст задания:',
				roughHTML2LaTeX(v.txt),
				'Ответ:',
				roughHTML2LaTeX(v.ver),
				v.rsh ? 'Решение:' : '',
				v.rsh ? roughHTML2LaTeX(v.rsh) : '',
			].filter(function (x) { return x !== ''; }).join('\\n\\n');
		})();
	`, '<latex-export>');
}

let hadFailures = false;
const allResults = [];

function processTemplate(filepath) {
	const absoluteFilepath = path.resolve(process.cwd(), filepath);
	if (!fs.existsSync(absoluteFilepath)) {
		console.error('[' + filepath + '] Файл шаблона не найден');
		hadFailures = true;
		return;
	}
	const isCpp = /\.cpp$/i.test(absoluteFilepath);
	const templateCode = fs.readFileSync(absoluteFilepath, 'utf8');

	// Сброс состояния preferences после предыдущего шаблона
	evalInWindow('window.nabor.preferences = window.__originalNaborPreferences || {};', '<reset-prefs>');

	let first;
	try {
		first = runOnce(templateCode, absoluteFilepath, isCpp);
	} catch (e) {
		console.error('[' + filepath + '] Ошибка выполнения шаблона: ' + (e && e.message ? e.message : e));
		hadFailures = true;
		return;
	}

	// Комбинации preferences — та же логика, что в headless-debug.mjs, но
	// generateVariations() уже есть в lib/func.js (не дублируем)
	let combinations = [];
	if (first.preference && Array.isArray(first.preference) && first.preference.length > 0) {
		combinations = window.generateVariations(first.preference);
		// getListedPreference() читает nabor.preferences[key] — Proxy вернёт
		// текущую комбинацию независимо от ключа (приём из headless-debug.mjs)
		evalInWindow(`
			window.nabor.preferences = new Proxy({}, {
				get: function () { return window.__currentPreferences || []; },
			});
		`, '<pref-proxy>');
	}

	const totalRuns = combinations.length > 0
		? combinations.length * opts.iterations
		: opts.iterations;
	const results = [];

	function emitOne(label, comboIdx) {
		let snapshot;
		try {
			snapshot = runOnce(templateCode, absoluteFilepath, isCpp);
		} catch (e) {
			console.error('[' + filepath + ' / ' + label + '] Ошибка: ' + (e && e.message ? e.message : e));
			hadFailures = true;
			return;
		}
		const item = Object.assign({ template: filepath, label: label }, snapshot);
		results.push(item);
		allResults.push(item);

		if (opts.json) return;

		console.log('\n=== ' + filepath + ' :: ' + label + ' ===');
		if (combinations.length > 0) {
			console.log('=== PREFERENCE: ' + JSON.stringify(combinations[comboIdx]) + ' ===');
		}
		console.log('--- Текст задания ---');
		console.log(snapshot.txt.replace(/<br\s*\/?>/g, '\n'));
		console.log('--- Ответ ---');
		console.log(snapshot.ver.join(' ИЛИ '));
		if (opts.tex) {
			console.log('=== LaTeX CODE START ===');
			console.log(toLatex(snapshot));
			console.log('=== LaTeX CODE END ===');
		}
	}

	if (combinations.length > 0) {
		// Первый прогон был без комбинации — генерируем заново по комбинациям
		for (let i = 0; i < totalRuns; i++) {
			const comboIdx = Math.floor(i / opts.iterations);
			const iterIdx = i % opts.iterations;
			const label = 'Combination ' + (comboIdx + 1) + '/' + combinations.length +
				' [' + JSON.stringify(combinations[comboIdx]) + '], Example ' +
				(iterIdx + 1) + '/' + opts.iterations;
			window.__currentPreferences = combinations[comboIdx];
			emitOne(label, comboIdx);
		}
	} else {
		// Первый прогон засчитываем как Example 1 (он уже в first)
		const item = Object.assign({ template: filepath, label: 'Example 1/' + opts.iterations }, first);
		results.push(item);
		allResults.push(item);
		if (!opts.json) {
			console.log('\n=== ' + filepath + ' :: Example 1/' + opts.iterations + ' ===');
			console.log('--- Текст задания ---');
			console.log(first.txt.replace(/<br\s*\/?>/g, '\n'));
			console.log('--- Ответ ---');
			console.log(first.ver.join(' ИЛИ '));
			if (opts.tex) {
				console.log('=== LaTeX CODE START ===');
				console.log(toLatex(first));
				console.log('=== LaTeX CODE END ===');
			}
		}
		for (let i = 1; i < opts.iterations; i++) {
			emitOne('Example ' + (i + 1) + '/' + opts.iterations, 0);
		}
	}
}

for (const fp of opts.filepaths) {
	processTemplate(fp);
}

const tEnd = Date.now();

if (opts.json) {
	console.log(JSON.stringify(allResults, null, 2));
}
console.error('\n--- Тайминги ---');
console.error('Загрузка бандла chas-uijs.js: ' + (tBundle - t0) + ' мс');
console.error('Генерация (' + allResults.length + ' примеров из ' + opts.filepaths.length + ' шаблонов): ' + (tEnd - tBundle) + ' мс');
console.error('Итого: ' + (tEnd - t0) + ' мс');
process.exit(hadFailures ? 1 : 0);
