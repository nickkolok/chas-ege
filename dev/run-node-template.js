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
 *   node dev/run-node-template.js --eval '(-1).arcctg()' --eval '(12).nod(18)'
 *
 * Опции:
 *   --filepath <путь>   путь к шаблону (.js или .cpp); можно указать несколько
 *   --batch-stdin       прочитать список шаблонов из stdin (по одному на строку)
 *   --iterations <n>    сколько примеров сгенерировать для каждого шаблона (1)
 *   --seed <строка>     зерно ГСЧ (seedrandom) — воспроизводимость вывода
 *   --no-tex            не печатать LaTeX-блок
 *   --json              машинный вывод: JSON-массив результатов
 *   --quiet             не транслировать console.log из недр библиотек
 *   --eval <выражение>  вычислить выражение в окружении бандла (как в консоли
 *                       otladka.html) и напечатать результат; можно указать
 *                       несколько; с --filepath не сочетается
 *
 * Канвасы: если установлен npm-пакет «canvas» (node-canvas), jsdom получает
 * настоящие 2D-контексты: vopr.dey() рисует, а <canvas> в тексте задания
 * заменяются на <img src="data:image/png;base64,…"> — ровно как в
 * sh/chas-ege_to_reshuege.js, — и LaTeX-экспорт идёт с иллюстрациями.
 * Без пакета генерация работает, экспорт — без иллюстраций (фолбэка нет).
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
	seed: null, tex: true, json: false, quiet: false, evals: [],
};
// Ошибка в ключах — сразу выход с кодом 1: молча пропущенное значение
// (забытое значение у --seed) даёт не те задачи, и заметить это по выводу трудно
const argError = function (message) {
	console.error(message);
	console.error('Ключи: --filepath <путь> --iterations N --seed S --eval <выражение> --batch-stdin --no-tex --json --quiet');
	process.exit(1);
};
// Значение ключа — следующий аргумент. Значение, начинающееся с «--», —
// это почти наверняка следующий ключ (`--seed --json`), поэтому ошибка.
// Выражение, которое и правда начинается с «--», пишут с пробелом: --eval ' --x'
const takeValue = function (i) {
	const value = args[i + 1];
	if (value === undefined || value.startsWith('--')) {
		argError('Ключ ' + args[i] + ' требует значения' + (value === undefined ? '' : ', а за ним идёт ' + value) + '.');
	}
	return value;
};
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--filepath') {
		opts.filepaths.push(takeValue(i++));
	} else if (args[i] === '--batch-stdin') {
		opts.batchStdin = true;
	} else if (args[i] === '--iterations') {
		const value = takeValue(i++);
		if (!/^[1-9][0-9]*$/.test(value)) {
			argError('--iterations — целое число не меньше 1, а не ' + JSON.stringify(value) + '.');
		}
		opts.iterations = parseInt(value, 10);
	} else if (args[i] === '--seed') {
		opts.seed = takeValue(i++);
	} else if (args[i] === '--no-tex') {
		opts.tex = false;
	} else if (args[i] === '--json') {
		opts.json = true;
		opts.quiet = true;
	} else if (args[i] === '--quiet') {
		opts.quiet = true;
	} else if (args[i] === '--eval') {
		opts.evals.push(takeValue(i++));
	} else if (!args[i].startsWith('--')) {
		opts.filepaths.push(args[i]); // позиционные пути тоже принимаем
	}
}

if (opts.batchStdin) {
	opts.filepaths = opts.filepaths.concat(
		fs.readFileSync(0, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
	);
}

if (!opts.filepaths.length && !opts.evals.length) {
	console.error('Использование: node dev/run-node-template.js --filepath <путь> [--iterations N] [--seed S] [--no-tex] [--json] [--quiet] [--batch-stdin]');
	console.error('         или: node dev/run-node-template.js --eval <выражение> [--eval …] [--seed S] [--json]');
	process.exit(1);
}
if (opts.filepaths.length && opts.evals.length) {
	console.error('--eval не сочетается с --filepath: запустите их отдельными командами.');
	process.exit(1);
}
if (opts.evals.length) {
	opts.quiet = true; // в stdout — только результаты выражений
}

const t0 = Date.now();
const log = opts.json ? () => {} : console.log;

// Бэкенд канвасов: на данном этапе — только gold standard node-canvas
// (jsdom подхватывает npm-пакет «canvas» автоматически). Фолбэка нет:
// без пакета шаблоны с <canvas> генерируются, но экспорт идёт без иллюстраций.
let canvasBackend = 'none';
try {
	require.resolve('canvas');
	canvasBackend = 'node-canvas';
} catch (e) { /* остаёмся без канвасов */ }

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
	// С npm-пакетом «canvas» jsdom даёт настоящие 2D-контексты, но сам класс на
	// window не выставляет — достаём его через пробный контекст, иначе
	// методы-расширения (drawLine, setka, fillKrug…) не встанут на прототип.
	if ('${canvasBackend}' !== 'none') {
		var __probe = document.createElement('canvas');
		var __probeCtx = __probe.getContext('2d');
		if (__probeCtx) window.CanvasRenderingContext2D = __probeCtx.constructor;
	}
	// В jsdom без npm-пакета «canvas» этого класса нет — даём пустой прототип
	// (тот же приём, что в dev/run-node-tests.js). Рисование (vopr.dey) без
	// бэкенда не вызывается, а генерация тегов <canvas> — чисто строковая.
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
// Раннер может работать и из репозитория (dev/), и из своей копии в build/
// (build/dev/ — туда его кладёт grunt copy:nodeRunner): во втором случае
// бандл лежит рядом в build/lib/, а node_modules — уровнем выше.
const bundleCandidates = [
	path.join(projectRoot, 'build', 'lib', 'chas-uijs.js'),
	path.join(projectRoot, 'lib', 'chas-uijs.js'),
];
const bundlePath = bundleCandidates.find((p) => fs.existsSync(p));
if (!bundlePath) {
	console.error('Не найден бандл chas-uijs.js (искал: ' + bundleCandidates.join(', ') + ') — сначала выполните `grunt`.');
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
	// seedrandom теперь внутри бандла chas-uijs.js (lib/load-chas-lib.js берёт его
	// через choosePath из node_modules, как остальные npm-библиотеки).
	// UMD без module сам навешивает Math.seedrandom — отдельная загрузка не нужна.
	if (typeof window.Math.seedrandom !== 'function') {
		console.error('Math.seedrandom не найден в бандле chas-uijs.js — выполните `grunt`.');
		process.exit(1);
	}
	window.Math.seedrandom(String(opts.seed));
}

// ---------------------------------------------------------------------------
// 3.1. --eval: вычислить выражения в окружении бандла и выйти
// ---------------------------------------------------------------------------
if (opts.evals.length) {
	// JSON.stringify пишет NaN и ±Infinity как null, а -0 как 0: для проверки
	// математики это неверный ответ. Поэтому такие числа печатаются как в JS,
	// в том числе внутри массивов и объектов ([NaN,-0]), а в --json
	// поле result у такого значения не пишется — только repr.
	const specialNumber = (x) => (typeof x !== 'number' ? null :
		Object.is(x, -0) ? '-0' : Number.isFinite(x) ? null : String(x));
	const marker = '\u0000number:';
	// Одной строкой и не длиннее 2000 знаков: window и подобные объекты огромны
	const inspectShort = function (v) {
		const s = require('util').inspect(v, { depth: 2, compact: true, breakLength: Infinity, maxArrayLength: 20, maxStringLength: 200 });
		return s.length > 2000 ? s.slice(0, 2000) + ' …' : s;
	};
	// repr — строка, как значение печатается без --json; lossless — значение
	// можно записать в JSON без потерь
	const describe = function (v) {
		if (v === undefined) return { repr: 'undefined', lossless: false };
		if (typeof v === 'function') return { repr: String(v), lossless: false };
		let special = false;
		let json;
		try {
			json = JSON.stringify(v, function (key, x) {
				const s = specialNumber(x);
				if (s === null) return x;
				special = true;
				return marker + s;
			});
		} catch (e) {
			// Циклические ссылки (window), BigInt: выражение вычислилось,
			// а в JSON значение не записывается — печатаем его как node
			return { repr: inspectShort(v), lossless: false };
		}
		if (json === undefined) return { repr: inspectShort(v), lossless: false }; // Symbol
		if (!special) return { repr: json, lossless: true };
		return { repr: json.replace(/"\\u0000number:([^"]*)"/g, '$1'), lossless: false };
	};
	const evalResults = [];
	let evalFailed = false;
	for (const expr of opts.evals) {
		try {
			const value = evalInWindow(expr, '<eval>');
			const d = describe(value);
			const entry = { expr: expr, type: typeof value, repr: d.repr };
			if (d.lossless) entry.result = value;
			evalResults.push(entry);
			if (!opts.json) console.log(d.repr);
		} catch (e) {
			evalFailed = true;
			evalResults.push({ expr: expr, error: String(e && e.message || e) });
			console.error('Ошибка в --eval ' + JSON.stringify(expr) + ': ' + (e && e.message || e));
		}
	}
	if (opts.json) console.log(JSON.stringify(evalResults, null, 2));
	exitAfterFlush(evalFailed ? 1 : 0);
	return; // дальше — генерация по шаблонам: в режиме --eval она не нужна
}

// ---------------------------------------------------------------------------
// 3.5. Канвасы: рисование и подмена canvas→img (бэкенд node-canvas)
// ---------------------------------------------------------------------------

/** Повторяет связку updateQuestion() (sh/otladka.js) +
 *  replaceCanvasWithImgInTaskAndHTML() (sh/chas-ege_to_reshuege.js):
 *  вставляем vopr.txt в #question, вызываем vopr.dey() (рисование на
 *  <canvas>), затем каждый <canvas>…</canvas> в тексте заменяем на <img>
 *  с реальным PNG из toDataURL() — дальше roughHTML2LaTeX сам превратит
 *  его в процентированный тег, как в браузерном экспорте.
 *  Без бэкенда канвасов — no-op. */
function renderAndSwapCanvases(snapshot) {
	snapshot.canvasBackend = canvasBackend;
	snapshot.canvasImages = 0;
	if (canvasBackend === 'none' || !/<canvas/i.test(snapshot.txt)) return snapshot;
	window.__snap = snapshot;
	evalInWindow(`
		(function () {
			var v = window.__snap;
			var q = document.getElementById('question');
			q.innerHTML = v.txt;
			try { window.vopr.dey(); } catch (e) {
				console.log('[dey] ' + (e && e.message ? e.message : e));
			}
			var canvases = q.getElementsByTagName('canvas');
			for (var i = 0; i < canvases.length; i++) {
				var img = document.createElement('img');
				img.src = canvases[i].toDataURL();
				img.width = canvases[i].width;
				img.height = canvases[i].height;
				v.txt = v.txt.replace(/<canvas.*?<\\/canvas>/, img.outerHTML + '\\n');
				v.canvasImages++;
			}
		})();
	`, '<render-canvases>');
	return snapshot;
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
	return renderAndSwapCanvases({
		txt: String(window.vopr.txt),
		ver: window.vopr.ver.slice(),
		nev: window.vopr.nev.slice(),
		rsh: String(window.vopr.rsh),
		preference: window.vopr.preference,
	});
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

	// Предупреждение: шаблон рисует на <canvas>, а бэкенда нет (фолбэка на
	// данном этапе не предусмотрено) — иллюстрации в экспорт не попадут.

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
	if (canvasBackend === 'none' && /<canvas/i.test(first.txt)) {
		console.error('[' + filepath + '] предупреждение: шаблон рисует на <canvas>, но npm-пакет «canvas» не установлен — экспорт пойдёт без иллюстраций (фолбэк на данном этапе не предусмотрен).');
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
			// Маркер непосредственно перед блоком: extractLatex() из
			// dev/provide_examples_to_PR.mjs привязывает preference к блоку
			// только если строка === PREFERENCE … === стоит прямо перед START.
			if (combinations.length > 0) {
				console.log('=== PREFERENCE: ' + JSON.stringify(combinations[comboIdx]) + ' ===');
			}
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
exitAfterFlush(hadFailures ? 1 : 0);

/**
 * Завершить процесс, когда stdout и stderr записаны до конца.
 * process.exit() не ждёт асинхронной записи в канал: в конвейере
 * (`… --json | jq`) всё, что не поместилось в буфер канала (64 КиБ),
 * терялось, и JSON обрывался. Выходить же нужно явно: окно jsdom держит
 * таймеры, и само приложение не завершится.
 * @param {number} code - код возврата
 */
function exitAfterFlush(code) {
	// Пока вывод дописывается, окно jsdom не должно ничего исполнять:
	// иначе успевают сработать его события и таймеры (например, обработчик
	// load из бандла) и напечатать в stderr постороннюю ошибку
	window.close();
	process.stdout.write('', () => {
		process.stderr.write('', () => process.exit(code));
	});
}
