/**
 * e2e-проверка интеграции филворда в страницу печати (sh/pechmat.html).
 *
 *   node dev/fillword-e2e.mjs
 *
 * Поднимает статический сервер над dist/, открывает pechmat.html с набором
 * matege2024b, генерирует один вариант, дожидается филворда и проверяет:
 *   - филворд есть в HTML задания (#rez) и в HTML ответов (#otv);
 *   - fillwordState.result получен, случайных чтений (extra) нет;
 *   - в LaTeX-архиве (zip) лежит самодостаточный fillword.tex;
 *   - отдельная ссылка на fillword.tex появилась.
 * Артефакты отладки: dev/fillword-e2e-fillword.tex и dev/fillword-e2e.png.
 *
 * Запуск под root: puppeteer сам получит --no-sandbox из переменных ниже.
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
	args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});
const page = await browser.newPage();
page.on('dialog', (d) => d.accept());
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e.message).slice(0, 200)));
page.on('console', (m) => {
	const t = m.text();
	if (/Филворд|fillword/i.test(t)) console.log('PAGE:', t.slice(0, 200));
});

const hash = encodeURIComponent(JSON.stringify({
	nabor: { zagol: '../zdn/matege2024b/matege2024b.js' },
	style: { fon: 'white', pan: '#e9b96e', menuLinkTarget: '_self' },
}));

console.log('открываю pechmat.html…');
await page.goto(`http://127.0.0.1:${PORT}/sh/pechmat.html?0.42#${hash}`, { waitUntil: 'domcontentloaded', timeout: 120000 });

await page.waitForFunction(
	() => typeof window.zapusk === 'function' && typeof window.FillWord === 'function' && document.querySelectorAll('#zadaniya input').length > 0,
	{ timeout: 180000, polling: 500 },
);
console.log('страница готова, запускаю генерацию варианта…');

await page.evaluate(() => {
	document.getElementById('prepareLaTeX').checked = true;
	document.getElementById('prepareFillword').checked = true;
	// своя форма (квадрат 4×4) и обманки через textarea оболочки
	document.getElementById('fillwordShape').value = 'хххх\nхххх\nхххх\nхххх';
	document.getElementById('fillwordDecoys').value = '3,14\n-77';
	vse1();
	document.getElementById('cV').value = '1';
});
await page.evaluate(() => zapusk());

await page.waitForFunction(() => window.fillwordState && window.fillwordState.result, { timeout: 300000, polling: 500 });
console.log('филворд собран.');

await page.waitForFunction(
	() => {
		const a = document.getElementById('latex-archive-placeholder');
		return a && a.style.display !== 'none' && (a.href || '').indexOf('data:application/zip') === 0;
	},
	{ timeout: 120000, polling: 300 },
);

const info = await page.evaluate(() => {
	const st = window.fillwordState;
	return {
		words: st.words,
		scale: st.result.scale,
		complete: st.result.complete,
		overlaps: st.result.stats.overlaps,
		extraReadings: st.result.stats.readings.extra,
		decoysPlaced: st.result.stats.decoysPlaced,
		decoysTotal: st.result.stats.decoysTotal,
		shapeIsSquare: st.result.width === st.result.height && st.result.width % 4 === 0,
		rebuilds: st.rebuilds,
		texSelfContained: st.tex.indexOf('\\documentclass') === 0,
		rezHasFillword: document.getElementById('rez').innerHTML.indexOf('Филворд') !== -1,
		otvHasFillword: document.getElementById('otv').innerHTML.indexOf('Филворд') !== -1,
		archiveLinkShown: document.getElementById('latex-archive-placeholder').style.display !== 'none',
		texLinkShown: document.getElementById('fillword-tex-placeholder').style.display !== 'none',
	};
});

// ---- перегенерация задания (кнопка ⟳): филворд должен пересобраться ----
const rebuildsBefore = info.rebuilds;
const wordsBefore = info.words.join(',');
await page.click('button.renewbutton');
await page.waitForFunction((prev) => window.fillwordState.rebuilds > prev, { timeout: 180000, polling: 300 }, rebuildsBefore);
const afterRenew = await page.evaluate(() => ({
	rebuilds: window.fillwordState.rebuilds,
	words: window.fillwordState.words.join(','),
	complete: window.fillwordState.result.complete,
	extraReadings: window.fillwordState.result.stats.readings.extra,
	texOk: window.fillwordState.tex.indexOf('\\documentclass') === 0,
	questionHtml: document.getElementById('fillword-question').innerHTML.length,
}));
console.log('после перегенерации:', JSON.stringify({ rebuildsBefore, ...afterRenew, wordsChanged: afterRenew.words !== wordsBefore }));

const zipNames = await page.evaluate(async () => {
	const href = document.getElementById('latex-archive-placeholder').href;
	const zip = await JSZip.loadAsync(href.split(',')[1], { base64: true });
	return Object.keys(zip.files);
});

const tex = await page.evaluate(async () => {
	const href = document.getElementById('latex-archive-placeholder').href;
	const zip = await JSZip.loadAsync(href.split(',')[1], { base64: true });
	return await zip.file('fillword.tex').async('string');
});
fs.writeFileSync(path.join(ROOT, 'dev', 'fillword-e2e-fillword.tex'), tex);
await page.screenshot({ path: path.join(ROOT, 'dev', 'fillword-e2e.png') });

console.log(JSON.stringify({ info, zipNames }, null, 2));
console.log('--- начало fillword.tex ---');
console.log(tex.split('\n').slice(0, 14).join('\n'));

const ok =
	info.complete &&
	info.decoysPlaced === info.decoysTotal && info.decoysTotal === 2 &&
	info.shapeIsSquare &&
	afterRenew.rebuilds > rebuildsBefore &&
	afterRenew.complete &&
	afterRenew.extraReadings === 0 &&
	afterRenew.texOk &&
	info.extraReadings === 0 &&
	info.rezHasFillword &&
	info.otvHasFillword &&
	info.texSelfContained &&
	info.texLinkShown &&
	zipNames.includes('fillword.tex') &&
	zipNames.includes('tasks.tex') &&
	zipNames.includes('answers.tex');

await browser.close();
server.close();
console.log(ok ? '\n✅ e2e: филворд в HTML и в LaTeX-архиве — всё на месте' : '\n❌ e2e: проверки не прошли');
process.exit(ok ? 0 : 1);
