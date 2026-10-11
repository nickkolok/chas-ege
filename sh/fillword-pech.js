'use strict';

/* =====================================================================
 * Интеграция филворда в страницу «Создание теста для печати» (sh/pechmat.html).
 *
 * При составлении теста:
 *   1) слова берутся ЦИВИЛИЗОВАННО — из клонов vopr (generatedTasks[id].ver),
 *      а не разбором HTML таблицы ответов;
 *   2) форма филворда и список обманок читаются из textarea на странице
 *      (#fillwordShape, #fillwordDecoys; по умолчанию — сердечко и без обманок);
 *   3) филворд добавляется в печатную HTML-страницу (задание в #rez, ответ в #otv)
 *      и пересобирается при перегенерации отдельного задания (кнопка ⟳);
 *   4) самодостаточный fillword.tex кладётся в LaTeX-архив (рядом с tasks.tex
 *      и answers.tex) и отдаётся отдельной ссылкой.
 * ===================================================================*/

var fillwordState = {
	result: null,
	words: [],
	decoys: [],
	shapeLines: [],
	tex: '',
	rebuilds: 0,
};

var FILLWORD_DEFAULT_SHAPE = ['_хх_хх_', 'ххххххх', '_ххххх_', '__ххх__', '___х___'];

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

/* ---------- слова: из клонов vopr, без парсинга таблицы ---------- */

function fillwordCollectWords() {
	var words = [];
	for (var id in generatedTasks) {
		var ver = generatedTasks[id].ver;
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
	var fw = new FillWord({
		seed: seed,
		hardMaxScale: 6,
		timeLimit: 4000,
		attempts: 8,
		annealIterations: 4000,
		directionWeight: 3,
		decoys: decoys,
	});
	return fw.solve(words, shapeLines);
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

function fillwordToLaTeX(result, words) {
	var wordsTeX = words.map(fillwordEscapeTeX).join(', ');
	var tex = '';
	tex += '\\documentclass[a4paper,12pt]{article}\n';
	tex += '\\usepackage[T2A]{fontenc}\n';
	tex += '\\usepackage[utf8]{inputenc}\n';
	tex += '\\usepackage[english,russian]{babel}\n';
	tex += '\\usepackage[left=1.5cm,right=1.5cm,top=1.5cm,bottom=1.5cm]{geometry}\n';
	tex += '% Самодостаточный файл: компилируется pdflatex без внешних зависимостей.\n';
	tex += '% Сгенерировано ЧАС ЕГЭ (fillword), зерно: ' + fillwordEscapeTeX(String(result.seed)) + '\n';
	tex += '\\begin{document}\n\n';
	tex += '\\section*{Филворд}\n\n';
	tex += 'Найдите в сетке следующие числа: ' + wordsTeX + '.\n\n';
	tex += 'Числа читаются по горизонтали и по вертикали; они могут пересекаться\n';
	tex += '(в узле пересечения стоит одна и та же цифра). Каждая клетка фигуры\n';
	tex += 'принадлежит хотя бы одному числу либо заполнена случайной цифрой.\n\n';
	tex += '\\begin{center}\n' + fillwordTabularTeX(result, false) + '\\end{center}\n\n';
	tex += '\\section*{Филворд: ответы}\n\n';
	tex += '\\begin{center}\n' + fillwordTabularTeX(result, true) + '\\end{center}\n\n';
	tex += '\\end{document}\n';
	return tex;
}

/* ---------- вставка в печатные строки и пересборка ---------- */

// Вызывается в konecSozd() до вставки strVopr/strOtv в DOM: готовит оболочки.
function appendFillwordSections() {
	fillwordState.result = null;
	fillwordState.tex = '';
	if (typeof FillWord === 'undefined') {
		console.warn('FillWord не загружен — филворд пропущен.');
		return;
	}
	if (!options.prepareFillword) {
		return;
	}
	strVopr += '<h2>Филворд</h2><div id="fillword-question"></div>';
	strOtv += '<h2>Филворд: ответы</h2><div id="fillword-answers"></div>';
}

// Вызывается после вставки HTML в DOM и после каждой перегенерации задания:
// пересобирает филворд из актуальных ответов (generatedTasks уже обновлён).
function refreshFillword() {
	if (typeof FillWord === 'undefined' || !options.prepareFillword) {
		return;
	}
	var q = document.getElementById('fillword-question');
	var a = document.getElementById('fillword-answers');
	if (!q || !a) {
		return;
	}
	var words = fillwordCollectWords();
	if (words.length > 24) {
		words = words.slice(0, 24);
	}
	var decoys = fillwordDecoysList();
	if (words.length < 4) {
		q.innerHTML = '<p>Недостаточно числовых ответов для филворда.</p>';
		a.innerHTML = '';
		fillwordState.result = null;
		fillwordState.tex = '';
		return;
	}
	var shapeLines = fillwordShapeLines();
	var result;
	try {
		result = fillwordBuild(words, decoys, shapeLines, String(options.randomSeed) + '-fillword');
	} catch (e) {
		console.error('Филворд не собран:', e);
		q.innerHTML = '';
		a.innerHTML = '';
		return;
	}
	fillwordState.result = result;
	fillwordState.words = words;
	fillwordState.decoys = decoys;
	fillwordState.shapeLines = shapeLines;
	fillwordState.rebuilds++;

	q.innerHTML =
		'<p>Найдите в сетке числа: ' + fillwordEscapeHtml(words.join(', ')) + '. ' +
		'Числа читаются по горизонтали и вертикали и могут пересекаться ' +
		'(общая клетка — одна и та же цифра).</p>' +
		FillWord.renderPuzzleHTML(result, {
			layout: 'table', cell: 26, gap: 2, showLegend: false, standalone: false,
		});
	a.innerHTML = FillWord.renderSolutionHTML(result, {
		layout: 'table', cell: 22, gap: 2, showLegend: true, standalone: false,
	});

	fillwordState.tex = fillwordToLaTeX(result, words);
	var link = document.getElementById('fillword-tex-placeholder');
	if (link) {
		link.style.display = '';
		link.href = 'data:text/x-tex;charset=utf-8,' + encodeURIComponent(fillwordState.tex);
		link.setAttribute('download', 'fillword.tex');
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
