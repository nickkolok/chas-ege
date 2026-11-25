#!/usr/bin/env node
'use strict';

/**
 * Лист картинок: чертежи многих задач на одной картинке.
 *
 * Пяти примеров бота мало, чтобы увидеть ошибку чертежа: подпись, которая
 * наезжает на соседнее ребро, вырожденную фигуру, слипшиеся линии. Такие
 * ошибки выпадают в нескольких процентах задач, и их видно, только когда
 * чертежи лежат рядом. Скрипт берёт JSON раннера и раскладывает первые
 * чертежи задач сеткой, с номером задачи, вариантом preference и ответом
 * под каждым.
 *
 * Использование:
 *   node build/dev/run-node-template.js --filepath zdn/matege2023p/2/27210.js \
 *     --iterations 300 --seed 1 --json --quiet > /tmp/27210.json
 *   node dev/contact-sheet.js /tmp/27210.json --out /tmp/27210.png
 *
 * Опции:
 *   --out <файл.png>    куда записать лист (по умолчанию — рядом с JSON, .png)
 *   --limit <n>         сколько задач взять (15), по порядку
 *   --pick <номера>     какие задачи взять: через запятую, с нуля (0,1,300,301);
 *                       с --limit не сочетается: вместе они — ошибка
 *   --cols <n>          столбцов в сетке (5)
 *   --cell <ш>x<в>      размер клетки в пикселях (240x230); чертёж вписывается
 *                       в клетку с сохранением пропорций
 *
 * Номер над клеткой (#0, #1, …) — индекс задачи в JSON, с нуля и сквозной по всем
 * комбинациям preference; это те же номера, что в --pick. В label раннера
 * («Combination k/n …, Example i/N») номер свой: с единицы и внутри комбинации.
 * При --iterations 300 и двух комбинациях #300 — это «Combination 2/2 …, Example 1/300».
 *
 * Края холста: скрипт проверяет все чертежи в JSON (а не только те, что попали
 * в лист), пусты ли их крайние пиксели — прозрачные или белые. Если до края
 * доходят не все чертежи, подпись или линия у этих задач, скорее всего,
 * обрезана: скрипт перечисляет их номера (готовым --pick), а на листе обводит
 * такие клетки оранжевой рамкой. Если до края доходят все чертежи, так,
 * вероятно, задумано (клетчатая бумага до края холста) — об этом одна строка.
 * На код возврата проверка не влияет.
 *
 * Нужен npm-пакет «canvas» (тот же, что нужен раннеру для чертежей).
 *
 * Код возврата: 0 — лист записан, 1 — ошибка в ключах, нет пакета canvas
 * или ни в одной из выбранных задач нет чертежа.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const opts = { input: null, out: null, limit: 15, limitGiven: false, pick: null, cols: 5, cellWidth: 240, cellHeight: 230 };

const argError = function (message) {
	console.error(message);
	console.error('Использование: node dev/contact-sheet.js <json раннера> [--out файл.png] [--limit N | --pick 0,1,…] [--cols N] [--cell ШxВ]');
	process.exit(1);
};
const takeValue = function (i) {
	const value = args[i + 1];
	if (value === undefined || value.startsWith('--')) {
		argError('Ключ ' + args[i] + ' требует значения.');
	}
	return value;
};
const positiveInteger = function (key, value) {
	if (!/^[1-9][0-9]*$/.test(value)) {
		argError(key + ' — целое число не меньше 1, а не ' + JSON.stringify(value) + '.');
	}
	return parseInt(value, 10);
};
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--out') {
		opts.out = takeValue(i++);
	} else if (args[i] === '--limit') {
		opts.limit = positiveInteger('--limit', takeValue(i++));
		opts.limitGiven = true;
	} else if (args[i] === '--pick') {
		const value = takeValue(i++);
		if (!/^[0-9]+(,[0-9]+)*$/.test(value)) {
			argError('--pick — номера задач через запятую, например 0,1,300, а не ' + JSON.stringify(value) + '.');
		}
		opts.pick = value.split(',').map(Number);
	} else if (args[i] === '--cols') {
		opts.cols = positiveInteger('--cols', takeValue(i++));
	} else if (args[i] === '--cell') {
		const m = /^([1-9][0-9]*)x([1-9][0-9]*)$/.exec(takeValue(i++));
		if (!m) {
			argError('--cell — размер клетки вида 240x230.');
		}
		opts.cellWidth = Number(m[1]);
		opts.cellHeight = Number(m[2]);
	} else if (args[i].startsWith('--')) {
		argError('Неизвестный ключ ' + args[i] + '.');
	} else if (opts.input === null) {
		opts.input = args[i];
	} else {
		argError('Лишний аргумент ' + args[i] + ': JSON раннера — один.');
	}
}
if (opts.input === null) {
	argError('Не указан JSON раннера.');
}
if (opts.pick && opts.limitGiven) {
	argError('--pick и --limit вместе не используются: --pick уже задаёт, какие задачи взять.');
}
if (opts.out === null) {
	opts.out = opts.input.replace(/\.json$/i, '') + '.png';
}

let canvasLib;
try {
	canvasLib = require('canvas');
} catch (e) {
	console.error('Нужен npm-пакет canvas: npm install --no-save grunt-cli canvas (оба пакета одной командой, см. md/how_to_review_PR.md).');
	process.exit(1);
}
const { createCanvas, loadImage } = canvasLib;

let tasks;
try {
	tasks = JSON.parse(fs.readFileSync(opts.input, 'utf8'));
} catch (e) {
	console.error('Не удалось прочитать JSON раннера ' + opts.input + ': ' + e.message);
	process.exit(1);
}
if (!Array.isArray(tasks)) {
	console.error(opts.input + ': ожидался массив задач — вывод run-node-template.js с ключом --json.');
	process.exit(1);
}

const indices = opts.pick || tasks.map((t, i) => i).slice(0, opts.limit);
const missing = indices.filter((i) => i >= tasks.length);
if (missing.length) {
	console.error('Задач с номерами ' + missing.join(', ') + ' нет: в JSON их ' + tasks.length + '.');
	process.exit(1);
}

// Подпись клетки: номер задачи, вариант preference (из label раннера) и ответ
const caption = function (task, index) {
	const preference = /\[\[(.*)\]\]/.exec(task.label || '');
	const variant = preference ? JSON.parse('[' + preference[1] + ']').join(', ') + ' ' : '';
	const answer = Array.isArray(task.ver) ? task.ver.join('; ') : '';
	return '#' + index + ' ' + variant + '→ ' + answer;
};

// Первый чертёж задачи (PNG в base64) или null
const drawingOf = function (task) {
	const m = /<img[^>]*src="data:image\/png;base64,([^"]+)"/.exec(task.txt || '');
	return m ? Buffer.from(m[1], 'base64') : null;
};

// Доходит ли чертёж до края: есть ли среди крайних пикселей непрозрачный и не белый
const touchesEdge = function (image) {
	const w = image.width;
	const h = image.height;
	const canvas = createCanvas(w, h);
	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
	const strips = [[0, 0, w, 1], [0, h - 1, w, 1], [0, 0, 1, h], [w - 1, 0, 1, h]];
	return strips.some(function (strip) {
		const data = context.getImageData(strip[0], strip[1], strip[2], strip[3]).data;
		for (let k = 0; k < data.length; k += 4) {
			const empty = data[k + 3] === 0 || (data[k] >= 240 && data[k + 1] >= 240 && data[k + 2] >= 240);
			if (!empty) {
				return true;
			}
		}
		return false;
	});
};

(async function () {
	// Края проверяются у всех чертежей JSON, не только у попавших в лист
	const atEdge = new Set();
	let drawings = 0;
	for (let i = 0; i < tasks.length; i++) {
		const png = drawingOf(tasks[i]);
		if (png) {
			drawings++;
			if (touchesEdge(await loadImage(png))) {
				atEdge.add(i);
			}
		}
	}

	const cells = [];
	for (const i of indices) {
		const png = drawingOf(tasks[i]);
		if (png) {
			cells.push({ image: await loadImage(png), caption: caption(tasks[i], i), atEdge: atEdge.has(i) });
		}
	}
	if (!cells.length) {
		console.error('В выбранных задачах нет чертежей. Раннеру для чертежей нужен пакет canvas.');
		process.exit(1);
	}
	if (cells.length < indices.length) {
		console.error('Без чертежа: ' + (indices.length - cells.length) + ' из ' + indices.length + ' задач — в листе их нет.');
	}

	const captionHeight = 22;
	const padding = 5;
	const cols = Math.min(opts.cols, cells.length);
	const rows = Math.ceil(cells.length / cols);
	const sheet = createCanvas(cols * opts.cellWidth, rows * opts.cellHeight);
	const ctx = sheet.getContext('2d');
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, sheet.width, sheet.height);
	ctx.font = '15px sans-serif';
	ctx.textBaseline = 'top';

	cells.forEach(function (cell, k) {
		const x = (k % cols) * opts.cellWidth;
		const y = Math.floor(k / cols) * opts.cellHeight;
		const scale = Math.min(
			(opts.cellWidth - 2 * padding) / cell.image.width,
			(opts.cellHeight - captionHeight - padding) / cell.image.height
		);
		ctx.drawImage(cell.image, x + padding, y + captionHeight, cell.image.width * scale, cell.image.height * scale);
		ctx.fillStyle = '#cc0000';
		ctx.fillText(cell.caption, x + padding, y + 3, opts.cellWidth - 2 * padding);
		// Тонкая рамка клетки, чтобы чертежи не сливались; у чертежа, который доходит
		// до края холста (а другие — нет), рамка оранжевая и толще
		if (cell.atEdge && atEdge.size < drawings) {
			ctx.strokeStyle = '#ff8800';
			ctx.lineWidth = 3;
			ctx.strokeRect(x + 1.5, y + 1.5, opts.cellWidth - 3, opts.cellHeight - 3);
			ctx.lineWidth = 1;
		} else {
			ctx.strokeStyle = '#dddddd';
			ctx.strokeRect(x + 0.5, y + 0.5, opts.cellWidth - 1, opts.cellHeight - 1);
		}
	});

	fs.writeFileSync(opts.out, sheet.toBuffer('image/png'));
	console.error('Лист: ' + opts.out + ' — чертежей: ' + cells.length + ', сетка ' + cols + ' × ' + rows + '.');
	if (atEdge.size === drawings) {
		console.error('Все чертежи JSON (' + drawings + ') доходят до края холста: похоже, так задумано '
			+ '(клетчатая бумага, рамка), и проверка краёв ничего не говорит.');
	} else if (atEdge.size) {
		const list = Array.from(atEdge);
		const shown = list.slice(0, 20);
		console.error('ВНИМАНИЕ: до края холста доходят ' + list.length + ' из ' + drawings
			+ ' чертежей JSON — подпись или линия, вероятно, обрезана: #' + shown.join(', #')
			+ (list.length > shown.length ? ' и ещё ' + (list.length - shown.length) : '') + '. На листе такие клетки — в оранжевой рамке.');
		console.error('Посмотреть их: --pick ' + shown.join(','));
	}
})().catch(function (e) {
	console.error('Не удалось собрать лист: ' + (e && e.stack ? e.stack : e));
	process.exit(1);
});
