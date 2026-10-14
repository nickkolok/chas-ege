'use strict';

/* =====================================================================
 * Интеграция филворда в страницу «Создание теста для печати» (sh/pechmat.html).
 *
 * Принципы:
 *   - свой филворд на КАЖДЫЙ вариант (слова — числовые ответы именно этого варианта);
 *   - смысл филворда — косвенная самопроверка: в задании печатается сетка с цифрами
 *     БЕЗ списка чисел (список равен списку ответов и всё бы испортил);
 *     список слов есть только в учительском ключе;
 *   - слова берутся из generatedTasks[id].ver (клоны vopr), без парсинга HTML;
 *   - форма и обманки читаются из textarea (#fillwordShape, #fillwordDecoys);
 *   - самодостаточные fillword-variant-N.tex кладутся ВНУТРЬ LaTeX-архива
 *     (рядом с tasks.tex и answers.tex), отдельной ссылки наружу нет;
 *   - при перегенерации задания (кнопка ⟳) пересобирается филворд только его варианта.
 * ===================================================================*/

var fillwordState = {
	byVariant: {},   // variantNumber -> { result, words, decoys, shapeLines, tex }
	rebuilds: 0,
	// алиасы для внешнего кода/тестов: последний обработанный вариант
	result: null,
	words: [],
	decoys: [],
	tex: '',
};

var FILLWORD_DEFAULT_SHAPE = ['_хх_хх_', 'ххххххх', '_ххххх_', '__ххх__', '___х___'];

var FILLWORD_INTRO_HTML =
	'В сетке ниже спрятаны числа: они читаются по горизонтали (слева направо) и по вертикали ' +
	'(сверху вниз) и могут пересекаться — в общей клетке стоит одна и та же цифра. ' +
	'Часть спрятанных чисел совпадает с ответами заданий этого варианта: решив вариант, ' +
	'вы можете проверить себя, отыскав полученный ответ в сетке. ' +
	'Список чисел специально не приводится.';

var FILLWORD_INTRO_TEX =
	'В сетке ниже спрятаны числа: они читаются по горизонтали (слева направо) и по вертикали\n' +
	'(сверху вниз) и могут пересекаться --- в общей клетке стоит одна и та же цифра.\n' +
	'Часть спрятанных чисел совпадает с ответами заданий этого варианта: решив вариант,\n' +
	'вы можете проверить себя, отыскав полученный ответ в сетке.\n' +
	'Список чисел специально не приводится.\n';

/* ---------- настройки со страницы ---------- */

function fillwordShapeLines() {
	var raw = (typeof options !== 'undefined' && options.fillwordShape) || '';
	var lines = String(raw).split(/\r?\n/);
	var nonEmpty = lines.filter(function (l) { return l.trim(); });
	if (!nonEmpty.length) {
		return FILLWORD_DEFAULT_SHAPE.slice();
	}
	return lines; // пустые края обрежет сам FillWord.parseShape
}

function fillwordDecoysList() {
	var raw = (typeof options !== 'undefined' && options.fillwordDecoys) || '';
	return String(raw).split(/[\n;|]+/).map(function (s) { return s.trim(); }).filter(Boolean);
}

/* ---------- слова варианта: из клонов vopr, без парсинга таблицы ---------- */

function fillwordCollectWordsFor(variantNumber) {
	var words = [];
	for (var id in generatedTasks) {
		var task = generatedTasks[id];
		if (!task || task.variantNumber != variantNumber) {
			continue;
		}
		var ver = task.ver;
		if (!ver) {
			continue;
		}
		var list = Object.prototype.toString.call(ver) === '[object Array]' ? ver : [ver];
		for (var i = 0; i < list.length; i++) {
			var parts = String(list[i]).split(/[;\s]+/);
			for (var p = 0; p < parts.length; p++) {
				var t = parts[p].trim();
				// принимаем только «числовые» ответы: -129, 6, 0,5
				if (/^-?\d+(,\d+)?$/.test(t)) {
					words.push(t);
				}
			}
		}
	}
	return words;
}

/* ---------- решение ---------- */

function fillwordBuild(words, decoys, shapeLines, seed) {
	// До трёх попыток с производными сидами: берём раскладку без случайных
	// «лишних чтений» (если такая есть на этом наборе слов).
	var best = null;
	for (var tryN = 0; tryN < 6; tryN++) {
		var fw = new FillWord({
			seed: seed + (tryN ? '-x' + tryN : ''),
			hardMaxScale: 6,
			timeLimit: 4000,
			attempts: 8,
			annealIterations: 4000,
			directionWeight: 3,
			repairExtrasRounds: 8,
			decoys: decoys,
		});
		var r = fw.solve(words, shapeLines);
		if (!best || r.stats.readings.extra < best.stats.readings.extra) {
			best = r;
		}
		if (best.stats.readings.extra === 0 && best.complete) {
			break;
		}
	}
	return best;
}

/* ---------- самодостаточный LaTeX ---------- */

function fillwordEscapeTeX(s) {
	return String(s).replace(/\\/g, '\\textbackslash{}').replace(/([&%$#_{}])/g, '\\$1');
}

function fillwordEscapeHtml(s) {
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fillwordTabularTeX(result, withDigits) {
	var w = result.width;
	var h = result.height;
	var cols = '';
	for (var x = 0; x < w; x++) {
		cols += '@{}c@{}';
	}
	var out = '\\begin{tabular}{' + cols + '}\n';
	for (var y = 0; y < h; y++) {
		var cells = [];
		for (var x2 = 0; x2 < w; x2++) {
			var i = y * w + x2;
			if (!result.mask[i]) {
				cells.push('\\makebox[0.62cm][c]{}');
				continue;
			}
			var ch = result.rows[y][x2];
			var body = withDigits && ch != null ? fillwordEscapeTeX(ch) : '';
			cells.push('\\fbox{\\makebox[0.62cm][c]{\\strut ' + body + '}}');
		}
		out += cells.join(' & ') + ' \\\\\n';
	}
	out += '\\end{tabular}\n';
	return out;
}

function fillwordKeyTeX(result) {
	var out = '\\begin{itemize}\n';
	for (var i = 0; i < result.placements.length; i++) {
		var p = result.placements[i];
		var dir = p.dir === 'h' ? 'по горизонтали' : p.dir === 'v' ? 'по вертикали' : 'по диагонали';
		out += '\\item ' + fillwordEscapeTeX(p.word) + ' --- ' + dir +
			', начало в клетке (' + (p.x + 1) + '; ' + (p.y + 1) + ')' +
			(p.reversed ? ', в обратном порядке' : '') + ';\n';
	}
	out += '\\end{itemize}\n';
	if (result.stats.decoysPlaced) {
		out += '\nВ сетке также присутствуют числа-обманки (' + result.stats.decoysPlaced +
			' шт.): они стоят на поле, но к ответам варианта не относятся и в ключе не перечислены.\n';
	}
	return out;
}

function fillwordToLaTeX(result, variantNumber) {
	var label = (typeof options !== 'undefined' && options.vanishVariants)
		? '' : ' к варианту №' + (options.variantPrefix || '') + variantNumber;
	var tex = '';
	tex += '\\documentclass[a4paper,12pt]{article}\n';
	tex += '\\usepackage[T2A]{fontenc}\n';
	tex += '\\usepackage[utf8]{inputenc}\n';
	tex += '\\usepackage[english,russian]{babel}\n';
	tex += '\\usepackage[left=1.5cm,right=1.5cm,top=1.5cm,bottom=1.5cm]{geometry}\n';
	tex += '% Самодостаточный файл: компилируется pdflatex без внешних зависимостей.\n';
	tex += '% Сгенерировано ЧАС ЕГЭ (fillword), зерно: ' + fillwordEscapeTeX(String(result.seed)) + '\n';
	tex += '\\begin{document}\n\n';
	tex += '\\section*{Филворд' + fillwordEscapeTeX(label) + '}\n\n';
	tex += FILLWORD_INTRO_TEX + '\n';
	tex += '\\begin{center}\n' + fillwordTabularTeX(result, true) + '\\end{center}\n\n';
	tex += '\\section*{Филворд' + fillwordEscapeTeX(label) + ': ключ для учителя}\n\n';
	tex += 'Расположение слов (ключ не предназначен для печати в варианте ученика):\n\n';
	tex += fillwordKeyTeX(result) + '\n';
	tex += '\\end{document}\n';
	return tex;
}

/* ---------- оболочки секций и пересборка ---------- */

// Вызывается из endCurrentVariant(): вариант дописан в strVopr/strOtv —
// добавляем ему собственные оболочки филворда.
function appendFillwordVariantPlaceholders(vnum) {
	if (typeof FillWord === 'undefined' || !options.prepareFillword) {
		return;
	}
	strVopr +=
		'<h2>Филворд</h2>' +
		'<p>' + FILLWORD_INTRO_HTML + '</p>' +
		'<div id="fillword-question-' + vnum + '"></div>';
	strOtv +=
		'<h2>Филворд: ключ' +
		(options.vanishVariants ? '' : ' к варианту №' + options.variantPrefix + vnum) +
		'</h2>' +
		'<div id="fillword-answers-' + vnum + '"></div>';
}

// Пересобирает филворды: всех вариантов (конец генерации) или одного (перегенерация).
function refreshFillword(onlyVariant) {
	if (typeof FillWord === 'undefined' || !options.prepareFillword) {
		return;
	}
	var variants = (typeof onlyVariant === 'number') ? [onlyVariant] : variantsGenerated.slice();
	for (var vi = 0; vi < variants.length; vi++) {
		var vnum = variants[vi];
		var q = document.getElementById('fillword-question-' + vnum);
		var a = document.getElementById('fillword-answers-' + vnum);
		if (!q || !a) {
			continue;
		}
		var words = fillwordCollectWordsFor(vnum);
		if (words.length > 24) {
			words = words.slice(0, 24);
		}
		var decoys = fillwordDecoysList();
		if (words.length < 4) {
			q.innerHTML = '<p>Недостаточно числовых ответов для филворда этого варианта.</p>';
			a.innerHTML = '';
			delete fillwordState.byVariant[vnum];
			continue;
		}
		var shapeLines = fillwordShapeLines();
		var result;
		try {
			result = fillwordBuild(words, decoys, shapeLines,
				String(options.randomSeed) + '-fillword-' + vnum);
		} catch (e) {
			console.error('Филворд варианта ' + vnum + ' не собран:', e);
			q.innerHTML = '';
			a.innerHTML = '';
			continue;
		}
		fillwordState.byVariant[vnum] = {
			result: result,
			words: words,
			decoys: decoys,
			shapeLines: shapeLines,
			tex: fillwordToLaTeX(result, vnum),
		};
		fillwordState.rebuilds++;
		// алиасы последнего результата
		fillwordState.result = result;
		fillwordState.words = words;
		fillwordState.decoys = decoys;
		fillwordState.tex = fillwordState.byVariant[vnum].tex;

		// Задание: сетка С ЦИФРАМИ, но без списка слов и без цветовой разметки —
		// ученик ищет свои ответы в сетке, а не получает их списком.
		q.innerHTML = FillWord.renderSolutionHTML(result, {
			layout: 'table', cell: 26, gap: 2, colorize: false, showLegend: false, standalone: false,
		});
		// Ключ: цветовая разметка слов и легенда (для учителя).
		a.innerHTML = FillWord.renderSolutionHTML(result, {
			layout: 'table', cell: 22, gap: 2, colorize: true, showLegend: true, standalone: false,
		});
	}
}

/* ---------- стартовое значение textarea формы ---------- */

(function () {
	function prefillShape() {
		var s = document.getElementById('fillwordShape');
		if (s && !s.value.trim()) {
			s.value = FILLWORD_DEFAULT_SHAPE.join('\n');
		}
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', prefillShape);
	} else {
		prefillShape();
	}
	// страховка после chasStorage.domData.load(), который выполняется позже нас
	setTimeout(prefillShape, 0);
})();
