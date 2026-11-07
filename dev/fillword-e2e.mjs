/**
 * e2e-проверка интеграции филворда в страницу печати (sh/pechmat.html).
 *
 *   node dev/fillword-e2e.mjs
 *
 * Сценарий: статический сервер над dist/, открытие pechmat.html с набором
 * matege2024b, ДВА варианта, своя форма (квадрат 4×4) и обманки через textarea.
 * Проверяется:
 *   - свой филворд на каждый вариант (секции в #rez/#otv и записи byVariant);
 *   - в задании НЕТ списка чисел (иначе это прямая выдача ответов): сетка с
 *     цифрами есть, перечисления слов нет;
 *   - в LaTeX-архиве лежат fillword-variant-1.tex и fillword-variant-2.tex
 *     (и нет отдельного fillword.tex), отдельной ссылки наружу нет;
 *   - tex самодостаточен и не содержит списка чисел в ученической части;
 *   - перегенерация задания (⟳) пересобирает филворд только своего варианта;
 *   - обманки размещены, случайных чтений (extra) нет.
 * Артефакты: dev/fillword-e2e-fillword.tex, dev/fillword-e2e.png.
 */
'use strict';

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 8091;

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
	const urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
	const file = path.join(DIST, path.normalize(urlPath).replace(/^([/\\])+/, ''));
	if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
		res.writeHead(404); res.end('404'); return;
	}
	res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
	res.end(fs.readFileSync(file));
});
await new Promise((r) => server.listen(PORT, r));
console.log('сервер dist/ на порту', PORT);

const browser = await puppeteer.launch({
	headless: true,
	protocolTimeout: 600000,
	args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});
const page = await browser.newPage();
page.on('dialog', (d) => d.accept());
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e.message).slice(0, 200)));
page.on('console', (m) => {
	const t = m.text();
	if (/филворд|Филворд|fillword|error|Error|не удалось/i.test(t)) console.log('PAGE:', t.slice(0, 200));
});

const hash = encodeURIComponent(JSON.stringify({
	nabor: { zagol: '../zdn/mat2014/mat2014.js' },
	style: { fon: 'white', pan: '#e9b96e', menuLinkTarget: '_self' },
}));

console.log('открываю pechmat.html…');
await page.goto(`http://127.0.0.1:${PORT}/sh/pechmat.html?0.42#${hash}`, { waitUntil: 'domcontentloaded', timeout: 120000 });

await page.waitForFunction(
	() => typeof window.zapusk === 'function' && typeof window.FillWord === 'function' && document.querySelectorAll('#zadaniya input').length > 0,
	{ timeout: 180000, polling: 500 },
);
console.log('страница готова, запускаю генерацию ДВУХ вариантов…');

await page.evaluate(() => {
	document.getElementById('prepareLaTeX').checked = true;
	document.getElementById('prepareFillword').checked = true;
	document.getElementById('fillwordShape').value = 'хххх\nхххх\nхххх\nхххх';
	document.getElementById('fillwordDecoys').value = '3,14\n-77';
	// фиксированный сид и нумерация: генерация вариантов полностью детерминирована
	document.getElementById('randomSeed').value = 'fillword-e2e-42';
	document.getElementById('customNumber').checked = true;
	document.getElementById('start-number').value = '1';
	vse1();
	document.getElementById('cV').value = '2';
});
await page.evaluate(() => zapusk());

await page.waitForFunction(() => window.fillwordState && window.fillwordState.rebuilds >= 2, { timeout: 300000, polling: 500 });
console.log('филворды вариантов собраны.');

await page.waitForFunction(
	() => {
		const a = document.getElementById('latex-archive-placeholder');
		return a && a.style.display !== 'none' && (a.href || '').indexOf('data:application/zip') === 0;
	},
	{ timeout: 120000, polling: 300 },
);

const info = await page.evaluate(() => {
	const st = window.fillwordState;
	const vnums = Object.keys(st.byVariant);
	const per = vnums.map((v) => {
		const rec = st.byVariant[v];
		const q = document.getElementById('fillword-question-' + v);
		return {
			v: v,
			words: rec.words,
			complete: rec.result.complete,
			extraReadings: rec.result.stats.readings.extra,
			decoysPlaced: rec.result.stats.decoysPlaced,
			decoysTotal: rec.result.stats.decoysTotal,
			shapeIsSquare: rec.result.width === rec.result.height && rec.result.width % 4 === 0,
			questionHasDigits: /\d/.test(q ? q.innerHTML : ''),
			texSelfContained: rec.tex.indexOf('\\documentclass') === 0,
			texNoWordList: rec.tex.indexOf('Найдите в сетке следующие числа') === -1,
			texHasKey: rec.tex.indexOf('ключ для учителя') !== -1,
		};
	});
	return {
		variants: vnums.length,
		per: per,
		rebuilds: st.rebuilds,
		sectionsInRez: document.querySelectorAll('#rez [id^="fillword-question-"]').length,
		sectionsInOtv: document.querySelectorAll('#otv [id^="fillword-answers-"]').length,
		rezLeaksWordList: per.some((p) => document.getElementById('rez').innerHTML.indexOf(p.words.slice(0, 6).join(', ')) !== -1),
		rezHasDisclaimer: document.getElementById('rez').innerHTML.indexOf('Список чисел специально не приводится') !== -1,
		noExternalTexLink: !document.getElementById('fillword-tex-placeholder'),
	};
});

const zipNames = await page.evaluate(async () => {
	const href = document.getElementById('latex-archive-placeholder').href;
	const zip = await JSZip.loadAsync(href.split(',')[1], { base64: true });
	return Object.keys(zip.files);
});

const tex1 = await page.evaluate(async () => {
	const href = document.getElementById('latex-archive-placeholder').href;
	const zip = await JSZip.loadAsync(href.split(',')[1], { base64: true });
	return await zip.file('fillword-variant-1.tex').async('string');
});
fs.writeFileSync(path.join(ROOT, 'dev', 'fillword-e2e-fillword.tex'), tex1);
await page.screenshot({ path: path.join(ROOT, 'dev', 'fillword-e2e.png') });

// ---- перегенерация задания: пересобирается только свой вариант ----
const rebuildsBefore = info.rebuilds;
const texBefore = await page.evaluate(() => Object.keys(window.fillwordState.byVariant).map((v) => window.fillwordState.byVariant[v].tex).join('|SPLIT|'));
await page.click('button.renewbutton');
await page.waitForFunction((prev) => window.fillwordState.rebuilds > prev, { timeout: 180000, polling: 300 }, rebuildsBefore);
const afterRenew = await page.evaluate((prevTex) => {
	const st = window.fillwordState;
	const before = prevTex.split('|SPLIT|');
	const keys = Object.keys(st.byVariant);
	let changed = 0;
	for (let i = 0; i < keys.length; i++) {
		if (st.byVariant[keys[i]].tex !== before[i]) changed++;
	}
	return {
		rebuilds: st.rebuilds,
		changedVariants: changed,
		complete: keys.every((v) => st.byVariant[v].result.complete),
		extraReadings: keys.reduce((s, v) => s + st.byVariant[v].result.stats.readings.extra, 0),
		extrasDetail: keys.flatMap((v) => st.byVariant[v].result.readings.extra.map((x) => v + ':' + x.word)),
	};
}, texBefore);

console.log(JSON.stringify({ info, zipNames: zipNames.filter((n) => n.indexOf('images/') !== 0), afterRenew }, null, 2));
console.log('--- начало fillword-variant-1.tex ---');
console.log(tex1.split('\n').slice(0, 16).join('\n'));

// обманки размещаются best-effort: требуем хотя бы одну на вариант
// и хотя бы один вариант с полностью размещённым комплектом
const perOk = info.per.every((p) => p.complete && p.extraReadings === 0 && p.decoysPlaced >= 1 && p.decoysTotal === 2 && p.shapeIsSquare && p.questionHasDigits && p.texSelfContained && p.texNoWordList && p.texHasKey)
	&& Math.max(...info.per.map((p) => p.decoysPlaced)) === 2;
const ok =
	info.variants === 2 &&
	info.sectionsInRez === 2 &&
	info.sectionsInOtv === 2 &&
	!info.rezLeaksWordList &&
	info.rezHasDisclaimer &&
	info.noExternalTexLink &&
	zipNames.includes('fillword-variant-1.tex') &&
	zipNames.includes('fillword-variant-2.tex') &&
	!zipNames.includes('fillword.tex') &&
	afterRenew.rebuilds === rebuildsBefore + 1 &&
	afterRenew.changedVariants === 1 &&
	afterRenew.complete &&
	afterRenew.extraReadings === 0 &&
	perOk;

await browser.close();
server.close();
console.log(ok ? '\n✅ e2e: по филворду на вариант, без утечки ответов, tex в архиве' : '\n❌ e2e: проверки не прошли');
process.exit(ok ? 0 : 1);
