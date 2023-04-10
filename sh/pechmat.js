'use strict';

var vr1 = chas.mode.svinta ? 100 : 200;
var vr2 = chas.mode.svinta ? 100 : 1500;

var variantNumber;
var nV = 1;
var nZ = 1;
var aZ = [];
var iZ = [];
var aV;
var kZ;
var strVopr = '';
var strOtv = '';
var strResh = '';

var variantsGenerated = [];
var generatedTasks = {};
var tasksInLaTeX = {};
var preparedImages = {};

var options = {};


var largeFontStyle = 'div.z{font-size:128%}\n .MathJax_SVG_Display {font-size: 128%;}'.vTag('style');

function vse1() {
	$('.kolvo').val(1);
}

function vse0() {
	$('.kolvo').val(0);
	$('#cV').val(1);
}

function zapusk() {
	//Сохраняем параметры генерации
	chasStorage.domData.save();

	//Читаем настройки
	options.editable = $('#redakt').is(':checked');
	options.largeFont = $('#largeFont').is(':checked');
	options.customNumber = $('#customNumber').is(':checked');
	options.variantPrefix = $('#variantPrefix').val();
	options.vanishVariants = $('#vanishVariants').is(':checked');
	options.nopagebreak = $('#nopagebreak').is(':checked');
	options.compactAnswers = $('#compact-answers').is(':checked');
	options.solutionsIntoAnswers = $('#solutions-into-answers').is(':checked');
	options.nobackground = $('#nobackground').is(':checked');
	options.firstTaskNumber = 1 * $('#first-task-number').val();
	options.transitTaskNumbers = $('#transitTaskNumbers').is(':checked');
	options.splitAnswersNumber = 1 * $('#split-answers-number').val();
	options.splitAnswerTables = $('#splitAnswerTables').is(':checked');
	options.uniqueAnswersAndSolutions = $('#uniqueAnswersAndSolutions').is(':checked');
	options.startTransitNumber = 1 * $('#start-transit-number').val();
	options.prepareLaTeX = $('#prepareLaTeX').is(':checked');

	if (customNumber) {
		variantNumber = $('#start-number').val() - 1;
	}

	if ($('#htmlcss').is(':checked')) {
		MathJax.Hub.setRenderer('HTML-CSS');
	}

	//Читаем количество заданий
	aV = nV = 1 * $('#cV').val();
	for (var i = 1; i <= nabor.nZad; i++)
		aZ[i] = 1 * ($('#cB' + i).val());

	cacheKat();
	kZ = aZ.sum() * aV;
	if (!kZ) {
		alert('Ни одно задание не выбрано.');
		return;
	}
	iZ = aZ.slice();
	nZ = 0;
	$('#panel').html('Тесты составляются, подождите...');
	$('#gotov').show();
	zadan();
}

function testGotov() {
	$('#gotov').hide();
	if (options.editable) {
		$('#rez, #otv, #rsh').attr('contenteditable', 'true');
	}
	$('#dopoln').show();
	alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
	specCounter('pech');
}

function udalPanel() {
	$('#panel, #menucenter, #inf').remove();
}

function konecSozd() {
	strOtv = '<h2>Ответы</h2>' + strOtv;

	if (options.largeFont) {
		strOtv = largeFontStyle + strOtv;
	}

	$('#otv').html(strOtv);
	$('#rez').html(strVopr);
	if (strResh) {
		$('#rsh').html('<h2>Решения</h2>' + strResh);
	}

	for (var id in generatedTasks) {
		try {
			generatedTasks[id].dey();
		} catch (e) { };
	}
	convertCanvasToImagesIfNeeded();
	if (options.prepareLaTeX) {
		for (var id in generatedTasks) {
			tasksInLaTeX[id] = replaceCanvasWithImgInTask(
				getTaskTextContainerByTaskId(id),
				generatedTasks[id].txt
			).replace(/\\?%/g, '\\%').replace(/<br>/g, '\\\\').replace(/<br\/>/g, '\\\\').replace(/<b>/g, '\\textbf{').replace(/<\/b>/g, '}');
		}
	}

	refreshLaTeXarchive();
	MathJax.Hub.Typeset(testGotov);
	udalPanel();
	spoiler();
	$('.spoiler-show').click();
	$("hr:first").remove();
	$("hr:first").remove();
	document.body.style.backgroundColor = "white";
	$('body').append('<script>udalPanel()</script>');

	$('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
}

function convertCanvasToImagesIfNeeded() {
	if (!options.nobackground) {
		allCanvasToBackgroundImage();
	}
}

function bumpVariantNumber() {
	if (options.customNumber) {
		variantNumber++;
	} else {
		variantNumber = new Date().getTime();
	}
	variantsGenerated.push(variantNumber);
}

function appendVariantTasksCaption() {
	if (!options.vanishVariants) {
		strVopr += '<h2 class="d">Вариант №' + options.variantPrefix + variantNumber + '</h2>';
	}
}

function appendVariantTasksEnding() {
	if (!options.nopagebreak)
		strVopr += '<p style="page-break-before: always"></p>';
}

function appendVariantAnswersCaption() {
	strOtv +=
		'<table ' +
		'class="normtabl tablpech pech-answers-table" ' +
		'id="pech-answers-table-variant-' + variantNumber +
		'">';

	if (!options.vanishVariants) {
		strOtv += '<tr><th colspan="10">';
		if (options.compactAnswers) {
			strOtv += 'Вар. ' + options.variantPrefix + variantNumber;
		} else {
			strOtv += 'Ответы к варианту<br/>№' + options.variantPrefix + variantNumber;
		}
		strOtv += '</th></tr>';
	}
}

function appendVariantAnswersEnding() {
	strOtv += '</table>';
}

function endCurrentVariant() {
	nV--;
	nZ = 0;
	appendVariantTasksEnding();
	appendVariantAnswersEnding();
	if(options.uniqueAnswersOnlyInOneVariant){
		unqDict={};
	}
	zadan();
}

function zadan() {
	if (nZ == 1 + 1 * nabor.nZad) {
		endCurrentVariant();
		return;
	}

	if (nZ == 0) {
		if (!nV) {
			konecSozd();
			return;
		} else {
			iZ = aZ.slice();

			bumpVariantNumber();
			appendVariantTasksCaption();
			appendVariantAnswersCaption();

			nZ = 1;
			zadan();
			return;
		}
	} else {
		if (iZ[nZ] == 0) {
			nZ++;
			zadan();
		} else {
			if (options.splitAnswerTables) {
				var tasksReadyInCurrentVariant = aZ.sum() - iZ.sum();
				if (tasksReadyInCurrentVariant && (tasksReadyInCurrentVariant % options.splitAnswersNumber === 0)) {
					appendVariantAnswersEnding();
					appendVariantAnswersCaption();
				}
			}
			iZ[nZ]--;
			dvig.zadan(obnov, nZ);
		}
		return;
	}
}

function createHtmlForTask(nazvzad) {
	var taskId = variantNumber + '-' + nazvzad;
	vopr.taskId = taskId;
	vopr.taskNumber = nZ;
	vopr.taskCategory = nazvzad;
	vopr.variantNumber = variantNumber;

	return {
		txt:
			'<div class="d" data-task-id="' + taskId + '" data-task-number="' + nZ + '">' +
			'<div class="b">' + nazvzad + '</div>' +
			'<div class="z">' +
			window.vopr.txt +
			'<button class="noprint renewbutton" title="Заменить задание на похожее"' +
			'>' +
			'&#x27F3;' +
			'</button>' +
			'</div>' +
			'<div class="grid-for-writing"></div>' +
			'</div>',
		ver:
			'<tr class="answer-container" data-task-id="' + variantNumber + '-' + nazvzad + '">' +
			('<td>' + options.variantPrefix + variantNumber + '</td>').esli(!options.vanishVariants) +
			'<td>' + nazvzad + '</td>' +
			'<td>' + window.vopr.ver.join('; ') + '</td>' +
			('<td>' + window.vopr.rsh + '</td>').esli(options.solutionsIntoAnswers) +
			'</tr>',
		rsh:
			'<div class="solution-container" data-task-id="'+variantNumber+'-'+nazvzad+'">'+
				(
					'<h3>'+
						('Вариант №'+options.variantPrefix+variantNumber+', ').esli(!options.vanishVariants) +
						'задача '+nazvzad+
					'</h3><br/>'+
					vopr.rsh
				).esli(vopr.rsh)+
			'</div>',
		unq:
			[vopr.ver.join('; '), vopr.rsh, vopr.unq].join(' [:////:] '), // Да, это служебная комбинация символов "баян"
	};
}

var unqDict = {};

function obnov() {
	var nazvzad;

	if (options.transitTaskNumbers) {
		nazvzad = options.startTransitNumber + aZ.sum() - iZ.sum() - 1;
	} else {
		nazvzad =
			dvig.getzadname(nZ) +
			(aZ[nZ] == 1 ? '' : '-' + (aZ[nZ] - iZ[nZ] + options.firstTaskNumber - 1));
	}
	var html = createHtmlForTask(nazvzad);

	if (options.uniqueAnswersAndSolutions && (html.unq in unqDict)) {
		console.log('Deduplicating ' + nazvzad + '...');
		dvig.zadan(obnov, nZ);
		return;
	}

	unqDict[html.unq] = true;

	strVopr += html.txt;
	strOtv += html.ver;
	strResh += html.rsh;

	generatedTasks[vopr.taskId] = vopr.clone();

	var sdel = aZ.sum() * (aV - nV + 1) - iZ.sum();
	var w = sdel / kZ;
	$('.tx').text((100 * w).toFixedLess(1).dopdo(' ', 4) + '%');
	$('#pr1').width($('#pr0').width() * w);
	var v = (vr1 + vr2) * (kZ - sdel) / 1000;
	$('#vrem').text(sdel + ' из ' + kZ + ' ' + v.toDvoet());
	zadan();
}

function shirprim() {
	$('.z').css("width", $('#shir').val() + 'cm');
}

var ds;
var selector1 = '.jqplot-target, .MathJax>nobr>span>span>span';
var selector2 = 'canvas';

function optimcopy() {
	//{{Лютый, бешеный костыль, который нужен, чтобы html2canvas не обрезал знаменатели у MathJax-овских дробей
	var MJspans = $(".MathJax nobr * span");
	for (var i = 0; i < MJspans.length; i++) {
		if (MJspans[i].style.clip) {
			//И невозбранно возмножаем высоту на константу Чурова
			MJspans[i].style.height = '' + 1.468 * MJspans[i].offsetHeight + 'px';
		}
	}

	//}}
	ds = $('.d');
	$('#otv').hide();
	optimcopyd(1);
}

function optimcopyd(n) {
	if (n >= ds.length) {
		$('.d').show();
		$('#otv').show();
		return;
	}
	var d = $(ds[n]);
	ds.hide();
	var sel1 = d.find(selector1);
	var sel2 = d.find(selector2);
	if (!(sel1.length + sel2.length)) {
		setTimeout("optimcopyd(" + n + "+1);", 100);
		return;
	}
	d.show();
	sel1.each(function () {
		innerHTMLtoImg(this);
	});
	sel2.each(function () {
		replaceWithImg(this);
	});
	setTimeout("optimcopyd(" + n + "+1);", 100);
}

var startShell = function () {
	window.vopr.txt = '';
	$('#zadaniya').html(sozdKolvoHtml('pech'));
	$('#gotov').hide();
	galkiKat('#galki_kat', 'pech');
}


function getTaskTextContainerByTaskId(taskId) {
	return $('div.d[data-task-id="' + taskId + '"]')[0];
}

function renewTask() {
	console.log(this);
	var wrapper = $(this).parents('div.d');
	var nazvzad = wrapper.children('div.b')[0].innerHTML;
	console.log(wrapper);
	var taskId = wrapper.attr('data-task-id');
	var taskNumber = wrapper.attr('data-task-number');
	variantNumber = wrapper.attr('data-variant-number');
	var answerRow = $('tr.answer-container[data-task-id=' + taskId + ']');
	var solution = $('div.solution-container[data-task-id=' + taskId + ']');

	nZ = taskNumber;
	dvig.zadan(function () {
		console.log(wrapper);
		var taskHtml = createHtmlForTask(nazvzad);
		wrapper.replaceWith(taskHtml.txt);
		answerRow.replaceWith(taskHtml.ver);
		solution.replaceWith(taskHtml.rsh);
		window.vopr.dey();
		convertCanvasToImagesIfNeeded();
		generatedTasks[vopr.taskId] = vopr.clone();
		if (options.prepareLaTeX) {
			tasksInLaTeX[taskId] = replaceCanvasWithImgInTask(getTaskTextContainerByTaskId(taskId), vopr.txt);
			refreshLaTeXarchive();
		}
		MathJax.Hub.Typeset(taskHtml[0]);
		$('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
	}, taskNumber);
}


function insertGridFields() {
	var fieldHeight = $('#grid-field-height').val();
	$('#grid-svg-template')[0].style.minHeight = fieldHeight + 'cm';

	var cellSize = $('#grid-cell-size').val();
	$('#grid-pattern')[0].setAttribute('width', cellSize);
	$('#grid-pattern')[0].setAttribute('height', cellSize);

	$('#grid-pattern-line-1')[0].setAttribute('x1', cellSize / 2);
	$('#grid-pattern-line-1')[0].setAttribute('x2', cellSize / 2);
	$('#grid-pattern-line-1')[0].setAttribute('y2', cellSize);

	$('#grid-pattern-line-2')[0].setAttribute('y1', cellSize / 2);
	$('#grid-pattern-line-2')[0].setAttribute('y2', cellSize / 2);
	$('#grid-pattern-line-2')[0].setAttribute('x2', cellSize);


	var svg = $('#grid-svg-container').html();
	var svgCode = window.btoa(svg);


	$('#grid-style-placeholder').html(
		'<style>' +
		'.grid-for-writing { ' +
		'display: block;' +
		'min-height: ' + fieldHeight + 'cm;' +
		'background-image: ' + 'url(data:image/svg+xml;base64,' + svgCode + ');' +
		'}' +
		'</style>'
	);

	$('#button-removeGridFields').show();
}

function removeGridFields() {
	$('#grid-style-placeholder').html('');

	$('#button-removeGridFields').hide();
}


function getAnswersSubtableLaTeX(cellsInFirstRow, answersParsedToTeX) {
	var hline = "\n\n\\hline\n";
	return (
		'\\begin{tabular}{' + (new Array(cellsInFirstRow)).fill('|l').join('')+ '|' + '}' +
			'\n\\hline\n' +
			answersParsedToTeX.join(hline) +
			hline +
		'\\end{tabular}' +
		'\n\n\n'
	);
}

function createLaTeXbunchAnswers(variantN) {

	var answerRows = $('table#pech-answers-table-variant-' + variantN + ' tr');

	var answersParsedToTeX = [];
	// The first row may be the caption, so...
	var cellsInFirstRow = (answerRows[2] || answerRows[1] || answerRows[0]).getElementsByTagName('td').length;
	let count = 0;
	for (var row of Array.from(answerRows)) {
		count++;
		var tdCells = row.getElementsByTagName('td');
		if (tdCells.length) {
			//TODO: reverse-decode LaTeX from MathJax
			answersParsedToTeX.push(Array.from(tdCells).map(x => x.innerHTML).join(' & ') + '\\\\');
			if (count % 50 == 0 && count < kZ)
				answersParsedToTeX.push('\\end{tabular}&\\begin{tabular}[t]{' + (new Array(cellsInFirstRow)).fill('|l').join('') + '|' + '}')
		}
	}
	return getAnswersSubtableLaTeX(cellsInFirstRow, answersParsedToTeX);
}

function replaceCanvasWithImgInTask(element, text) {
	if (!(/<canvas/i.test(text))) {
		// Nothing to do
		return text;
	}
	console.log(element);
	var canvases = Array.from(element.getElementsByTagName('canvas'));
	for (var i = 0; i < canvases.length; i++) {
		var imageName = canvases[i].getAttribute('data-nonce').substr(3) + "n" + i;
		preparedImages[imageName] = canvases[i].toDataURL().replace('data:image/png;base64,','');
		text = text.replace(/<canvas.*?<\/canvas>/, '\\addpictoright[0.4\\linewidth]{'+imageName+'}');
	}
	if (canvases.length) {
		text =
			'\\ifdefined\\OnBeforeIllustratedTask\\OnBeforeIllustratedTask\\fi\n' +
			text.trim() +
			'\n\\ifdefined\\OnAfterIllustratedTask\\OnAfterIllustratedTask\\fi' +
		'';
	}

	return text;
}

function createLaTeXbunchTasks(variantN) {
	var bunchText = "";
	for (var taskId in tasksInLaTeX) {
		if (generatedTasks[taskId].variantNumber == variantN) {
			bunchText +=
				"\n" +
				"\\begin{taskBN}{" + generatedTasks[taskId].taskCategory + "}" + "\n" +
				tasksInLaTeX[taskId] + "\n" +
				"\\end{taskBN}\n\n";
		}

	}
	return bunchText;
}

function refreshLaTeXarchive() {
	if (!options.prepareLaTeX) {
		return;
	}
	var zip = new JSZip();
	var bunchUnited = "", bunchTasks = "";
	var answers = "\\begin{document}\n\n\\begin{multicols}{"+variantsGenerated.length+"}";

	for(var variantN of variantsGenerated){
		var head =
			'\n\n' +
			'\\ifdefined\\OnBeforeVariant\\OnBeforeVariant\\fi\n' +
			'\\def\\examvart{\\varianttitle ' + options.variantPrefix + variantN + '}\n' +
			'\\ifdefined\\OnStartVariant\\OnStartVariant\\fi' +
			'\n\n';
		var tail =
			'\\ifdefined\\OnAfterVariant\\OnAfterVariant\\fi';
		bunchTasks += head + createLaTeXbunchTasks(variantN) + tail;
		answers += createLaTeXbunchAnswers(variantN);
	}

	answers += "\n\n\\end{multicols}\n\n\\end{document}";

	zip.file("tasks.tex", bunchTasks);
	zip.file("answers.tex", "\\documentclass[a5paper]{article}\n\\usepackage[T2A]{fontenc}\n\\usepackage[utf8]{inputenc}\n\\usepackage[english,russian]{babel}\n\\usepackage{multicol}\n\n" + answers);

	var img = zip.folder("images");
	for (var i in preparedImages) {
		img.file(i + ".png", preparedImages[i], { base64: true });
	}
	zip.generateAsync({ type: "base64" }).then(function (base64) {
		$('#latex-archive-placeholder').show();
		$('#latex-archive-placeholder')[0].href = "data:application/zip;base64," + base64;
	});
}

var preambula = "\\documentclass[twocolumn]{article}\n\\usepackage{dashbox}\n\\setlength{\\columnsep}{40pt}\n\\usepackage[T2A]{fontenc}\n\\usepackage[utf8]{inputenc}\n\\usepackage[english,russian]{babel}\n\\usepackage{graphicx}\n\\graphicspath{{images/}}\n\\DeclareGraphicsExtensions{.pdf,.png,.jpg}\n\n\\linespread{1.15}\n\n\\usepackage{../../egetask}\n\\usepackage{../../egetask-math-11-2022}\n\n\\def\\examyear{2023}\n\\usepackage[colorlinks,linkcolor=blue]{hyperref}";

var hyperref = "\\def\\rfoottext{Разрешается свободное копирование в некоммерческих целях с указанием источника }\n\\def\\lfoottext{Источник \\href{https://vk.com/egemathika}{https://vk.com/egemathika}}";

var watermark = "\\usepackage{draftwatermark}\n\\SetWatermarkLightness{0.9}\n\\SetWatermarkText{https://vk.com/egemathika}\n\\SetWatermarkScale{ 0.4 }\n";

var preambulaForTab = "\\documentclass[landscape,9pt]{extarticle}\n" + "\\usepackage{dashbox}\n" + "\\setlength{\\columnsep}{40pt}\n" + "\\usepackage[T2A]{fontenc}\n" + "\\usepackage[utf8]{inputenc}\n" + "\\usepackage[english,russian]{babel}\n" + "\\usepackage{graphicx}\n" + "\\usepackage{multirow}\n\n" + "\\graphicspath{{images/}}\n\n" + "\\usepackage{egetask_alternative}\n\n" + "\\linespread{1.15}\n\n";
