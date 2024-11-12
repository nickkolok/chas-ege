'use strict';

const vr1 = chas.mode.svinta ? 100 : 200;
const vr2 = chas.mode.svinta ? 100 : 1500;

let variantNumber = 0;
let nV = 1;
let nZ = 1;
let aZ = [];
let iZ = [];
let aV;
let kZ;
let strVopr = '';
let strOtv = '';
let strResh = '';

let variantsGenerated = [];
let generatedTasks = {};
let tasksInLaTeX = {};
let preparedImages = {};

let options = {};

const largeFontStyle = 'div.z{font-size:128%}\n .MathJax_SVG_Display {font-size: 128%;}'.vTag('style');
const SELECTORS = {
    kolvo: '.kolvo',
    cV: '#cV',
    panel: '#panel',
    gotov: '#gotov',
    otv: '#otv',
    rez: '#rez',
    rsh: '#rsh',
    dopoln: '#dopoln',
    pr0: '#pr0',
    pr1: '#pr1',
    vrem: '#vrem',
    shir: '#shir',
    gridFieldHeight: '#grid-field-height',
    gridCellSize: '#grid-cell-size',
    gridSvgTemplate: '#grid-svg-template',
    gridPattern: '#grid-pattern',
    gridPatternLine1: '#grid-pattern-line-1',
    gridPatternLine2: '#grid-pattern-line-2',
    gridSvgContainer: '#grid-svg-container',
    gridStylePlaceholder: '#grid-style-placeholder',
    buttonRemoveGridFields: '#button-removeGridFields',
    latexArchivePlaceholder: '#latex-archive-placeholder'
};

// Устанавливает значение 1 для всех элементов с классом 'kolvo'
function vse1() {
    $(SELECTORS.kolvo).val(1);
}

// Устанавливает значение 0 для всех элементов с классом 'kolvo' и 1 для элемента с id 'cV'
function vse0() {
    $(SELECTORS.kolvo).val(0);
    $(SELECTORS.cV).val(1);
}

// Читает настройки из элементов управления и сохраняет их в объекте options
function readOptions() {
    options = {
        editable: $('#redakt').is(':checked'),
        largeFont: $('#largeFont').is(':checked'),
        customNumber: $('#customNumber').is(':checked'),
        variantPrefix: $('#variantPrefix').val(),
        vanishVariants: $('#vanishVariants').is(':checked'),
        nopagebreak: $('#nopagebreak').is(':checked'),
        compactAnswers: $('#compact-answers').is(':checked'),
        solutionsIntoAnswers: $('#solutions-into-answers').is(':checked'),
        nobackground: $('#nobackground').is(':checked'),
        firstTaskNumber: Number($('#first-task-number').val()),
        transitTaskNumbers: $('#transitTaskNumbers').is(':checked'),
        splitAnswersNumber: Number($('#split-answers-number').val()),
        splitAnswerTables: $('#splitAnswerTables').is(':checked'),
        uniqueAnswersAndSolutions: $('#uniqueAnswersAndSolutions').is(':checked'),
        startTransitNumber: Number($('#start-transit-number').val()),
        prepareLaTeX: $('#prepareLaTeX').is(':checked'),
        forceIntegers: $('#forceIntegers').is(':checked'),
        randomSeed: $('#randomSeed').val() || Date.now()
    };

    if (options.customNumber) {
        variantNumber = $('#start-number').val() - 1;
    }

    sluchch.forceIntegers = options.forceIntegers;

    if ($('#htmlcss').is(':checked')) {
        MathJax.Hub.setRenderer('HTML-CSS');
    }
}

// Запускает процесс генерации тестов
function zapusk() {
    chasStorage.domData.save();
    readOptions();

    aV = nV = Number($(SELECTORS.cV).val());
    for (let i = 1; i <= nabor.nZad; i++) {
        aZ[i] = Number($('#cB' + i).val());
    }

    cacheKat();
    kZ = aZ.reduce((sum, val) => sum + val, 0) * aV;
    if (!kZ) {
        alert('Ни одно задание не выбрано.');
        return;
    }
    iZ = aZ.slice();
    nZ = 0;
    $(SELECTORS.panel).html('Тесты составляются, подождите...');
    $(SELECTORS.gotov).show();
    zadan();
}

// Показывает сообщение о завершении генерации тестов
function testGotov() {
    $(SELECTORS.gotov).hide();
    if (options.editable) {
        $(SELECTORS.rez + ', ' + SELECTORS.otv + ', ' + SELECTORS.rsh).attr('contenteditable', 'true');
    }
    $(SELECTORS.dopoln).show();
    alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
    specCounter('pech');
}

// Удаляет элементы панели
function udalPanel() {
    $(SELECTORS.panel + ', #menucenter, #inf').remove();
}

// Завершает создание тестов и обновляет интерфейс
function konecSozd() {
    strOtv = '<h2>Ответы</h2>' + strOtv;

    if (options.largeFont) {
        strOtv = largeFontStyle + strOtv;
    }

    $(SELECTORS.otv).html(strOtv);
    $(SELECTORS.rez).html(strVopr);
    if (strResh) {
        $(SELECTORS.rsh).html('<h2>Решения</h2>' + strResh);
    }

    for (let id in generatedTasks) {
        try {
            generatedTasks[id].dey();
        } catch (e) {}
    }
    convertCanvasToImagesIfNeeded();
    if (options.prepareLaTeX) {
        for (let id in generatedTasks) {
            tasksInLaTeX[id] = replaceCanvasWithImgInTask(
                getTaskTextContainerByTaskId(id),
                generatedTasks[id].txt
            )
            .replace(/\\?%/g, '\\%')
            .replace(/<br>/g, '\\\\')
            .replace(/<br\/>/g, '\\\\')
            .replace(/<b>/g, '\\textbf{')
            .replace(/<\/b>/g, '}');
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

// Конвертирует все canvas в изображения, если это необходимо
function convertCanvasToImagesIfNeeded() {
    if (!options.nobackground) {
        allCanvasToBackgroundImage();
    }
}

// Увеличивает номер варианта
function bumpVariantNumber() {
    if (options.customNumber) {
        variantNumber++;
    } else {
        variantNumber = new Date().getTime();
    }
    variantsGenerated.push(variantNumber);
}

// Добавляет заголовок для задач варианта
function appendVariantTasksCaption() {
    if (!options.vanishVariants) {
        strVopr += `<h2 class="d">Вариант №${options.variantPrefix}${variantNumber}</h2>`;
    }
}

// Добавляет окончание для задач варианта
function appendVariantTasksEnding() {
    if (!options.nopagebreak) {
        strVopr += '<p style="page-break-before: always"></p>';
    }
}

// Добавляет заголовок для ответов варианта
function appendVariantAnswersCaption() {
    strOtv +=
        `<table class="normtabl tablpech pech-answers-table" id="pech-answers-table-variant-${variantNumber}">`;

    if (!options.vanishVariants) {
        strOtv += '<tr><th colspan="10">';
        if (options.compactAnswers) {
            strOtv += `Вар. ${options.variantPrefix}${variantNumber}`;
        } else {
            strOtv += `Ответы к варианту<br/>№${options.variantPrefix}${variantNumber}`;
        }
        strOtv += '</th></tr>';
    }
}

// Добавляет окончание для ответов варианта
function appendVariantAnswersEnding() {
    strOtv += '</table>';
}

// Завершает текущий вариант
function endCurrentVariant() {
    nV--;
    nZ = 0;
    appendVariantTasksEnding();
    appendVariantAnswersEnding();
    if (options.uniqueAnswersOnlyInOneVariant) {
        unqDict = {};
    }
    zadan();
}

// Обрабатывает задания
function zadan() {
    if (nZ === 1 + nabor.nZad) {
        endCurrentVariant();
        return;
    }

    if (nZ === 0) {
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
        if (iZ[nZ] === 0) {
            nZ++;
            zadan();
        } else {
            const tasksReadyInCurrentVariant = aZ.reduce((sum, val) => sum + val, 0) - iZ.reduce((sum, val) => sum + val, 0);
            const seed = `${options.randomSeed}__${variantsGenerated.length}__${tasksReadyInCurrentVariant}`;
            Math.seedrandom(seed);

            if (options.splitAnswerTables) {
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

// Создает HTML для задания
function createHtmlForTask(nazvzad) {
    const taskId = `${variantNumber}-${nazvzad}`;
    vopr.taskId = taskId;
    vopr.taskNumber = nZ;
    vopr.taskCategory = nazvzad;
    vopr.variantNumber = variantNumber;

    const solutionText = vopr.rsh ? vopr.rsh : ' '; // Вставляем пробел, если решение пустое

    return {
        txt: `<div class="d" data-task-id="${taskId}" data-task-number="${nZ}" data-variant-number="${variantNumber}">
                <div class="b">${nazvzad}</div>
                <div class="z">
                    ${window.vopr.txt}
                    <button class="noprint renewbutton" title="Заменить задание на похожее">&#x27F3;</button>
                </div>
                <div class="grid-for-writing"></div>
              </div>`,
        ver: `<tr class="answer-container" data-task-id="${variantNumber}-${nazvzad}">
                ${options.vanishVariants ? '' : `<td>${options.variantPrefix}${variantNumber}</td>`}
                <td>${nazvzad}</td>
                <td>${window.vopr.ver.join('; ')}</td>
                ${options.solutionsIntoAnswers ? `<td>${solutionText}</td>` : ''}
              </tr>`,
        rsh: `<div class="solution-container" data-task-id="${variantNumber}-${nazvzad}">
                ${vopr.rsh ? `<h3>${options.vanishVariants ? '' : `Вариант №${options.variantPrefix}${variantNumber}, `}задача ${nazvzad}</h3><br/>${vopr.rsh}` : ''}
              </div>`,
        unq: [vopr.ver.join('; '), vopr.rsh, vopr.unq].join(' [:////:] '),
    };
}

let unqDict = {};

// Обновляет текущее задание
function obnov() {
    let nazvzad;

    if (options.transitTaskNumbers) {
        nazvzad = options.startTransitNumber + aZ.reduce((sum, val) => sum + val, 0) - iZ.reduce((sum, val) => sum + val, 0) - 1;
    } else {
        nazvzad = dvig.getzadname(nZ) + (aZ[nZ] === 1 ? '' : `-${aZ[nZ] - iZ[nZ] + options.firstTaskNumber - 1}`);
    }
    const html = createHtmlForTask(nazvzad);

    if (options.uniqueAnswersAndSolutions && (html.unq in unqDict)) {
        console.log(`Deduplicating ${nazvzad}...`);
        dvig.zadan(obnov, nZ);
        return;
    }

    unqDict[html.unq] = true;

    strVopr += html.txt;
    strOtv += html.ver;
    strResh += html.rsh;

    grabCurrentTask();

    const sdel = aZ.reduce((sum, val) => sum + val, 0) * (aV - nV + 1) - iZ.reduce((sum, val) => sum + val, 0);
    const w = sdel / kZ;
    $('.tx').text((100 * w).toFixed(1).padEnd(4, ' ') + '%');
    $('#pr1').width($('#pr0').width() * w);
    const v = (vr1 + vr2) * (kZ - sdel) / 1000;
    $('#vrem').text(`${sdel} из ${kZ} ${v.toFixed(2)}`);
    zadan();
}

// Устанавливает ширину элементов с классом 'z'
function shirprim() {
    $('.z').css("width", $('#shir').val() + 'cm');
}

let ds;
const selector1 = '.jqplot-target, .MathJax>nobr>span>span>span';
const selector2 = 'canvas';

// Оптимизирует копирование
function optimcopy() {
    const MJspans = $(".MathJax nobr * span");
    for (let i = 0; i < MJspans.length; i++) {
        if (MJspans[i].style.clip) {
            MJspans[i].style.height = `${1.468 * MJspans[i].offsetHeight}px`;
        }
    }

    ds = $('.d');
    $('#otv').hide();
    optimcopyd(1);
}

// Рекурсивно оптимизирует копирование
function optimcopyd(n) {
    if (n >= ds.length) {
        $('.d').show();
        $('#otv').show();
        return;
    }
    const d = $(ds[n]);
    ds.hide();
    const sel1 = d.find(selector1);
    const sel2 = d.find(selector2);
    if (!(sel1.length + sel2.length)) {
        setTimeout(() => optimcopyd(n + 1), 100);
        return;
    }
    d.show();
    sel1.each(function () {
        innerHTMLtoImg(this);
    });
    sel2.each(function () {
        replaceWithImg(this);
    });
    setTimeout(() => optimcopyd(n + 1), 100);
}

var startShell = function () {
    window.vopr.txt = '';
    $('#zadaniya').html(sozdKolvoHtml('pech'));
    $('#gotov').hide();
    galkiKat('#galki_kat', 'pech');
}

// Возвращает контейнер текста задания по его ID
function getTaskTextContainerByTaskId(taskId) {
    return $(`div.d[data-task-id="${taskId}"]`)[0];
}

// Захватывает текущее задание
function grabCurrentTask() {
    generatedTasks[vopr.taskId] = vopr.clone();
    generatedTasks[vopr.taskId].address = `${window.nabor.adres}${dvig.getzadname(nZ)}/${window.nomer}`;
}

// Обновляет задание
function renewTask() {
    console.log(this);
    const wrapper = $(this).parents('div.d');
    const nazvzad = wrapper.children('div.b')[0].innerHTML;
    console.log(wrapper);
    const taskId = wrapper.attr('data-task-id');
    const taskNumber = wrapper.attr('data-task-number');
    variantNumber = wrapper.attr('data-variant-number');
    const answerRow = $(`tr.answer-container[data-task-id=${taskId}]`);
    const solution = $(`div.solution-container[data-task-id=${taskId}]`);

    nZ = taskNumber;
    dvig.zadan(() => {
        console.log(wrapper);
        const taskHtml = createHtmlForTask(nazvzad);
        wrapper.replaceWith(taskHtml.txt);
        answerRow.replaceWith(taskHtml.ver);
        solution.replaceWith(taskHtml.rsh);
        window.vopr.dey();
        convertCanvasToImagesIfNeeded();
        grabCurrentTask();
        if (options.prepareLaTeX) {
            tasksInLaTeX[taskId] = replaceCanvasWithImgInTask(getTaskTextContainerByTaskId(taskId), vopr.txt);
            refreshLaTeXarchive();
        }
        MathJax.Hub.Typeset(taskHtml[0]);
        $('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
    }, taskNumber);
}

// Вставляет поля сетки
function insertGridFields() {
    const fieldHeight = $('#grid-field-height').val();
    $('#grid-svg-template')[0].style.minHeight = `${fieldHeight}cm`;

    const cellSize = $('#grid-cell-size').val();
    $('#grid-pattern')[0].setAttribute('width', cellSize);
    $('#grid-pattern')[0].setAttribute('height', cellSize);

    $('#grid-pattern-line-1')[0].setAttribute('x1', cellSize / 2);
    $('#grid-pattern-line-1')[0].setAttribute('x2', cellSize / 2);
    $('#grid-pattern-line-1')[0].setAttribute('y2', cellSize);

    $('#grid-pattern-line-2')[0].setAttribute('y1', cellSize / 2);
    $('#grid-pattern-line-2')[0].setAttribute('y2', cellSize / 2);
    $('#grid-pattern-line-2')[0].setAttribute('x2', cellSize);

    const svg = $('#grid-svg-container').html();
    const svgCode = window.btoa(svg);

    $('#grid-style-placeholder').html(
        `<style>
            .grid-for-writing {
                display: block;
                min-height: ${fieldHeight}cm;
                background-image: url(data:image/svg+xml;base64,${svgCode});
            }
        </style>`
    );

    $('#button-removeGridFields').show();
}

// Удаляет поля сетки
function removeGridFields() {
    $('#grid-style-placeholder').html('');
    $('#button-removeGridFields').hide();
}

// Возвращает подтаблицу ответов в формате LaTeX
function getAnswersSubtableLaTeX(cellsInFirstRow, answersParsedToTeX) {
    const hline = "\n\\\\\n\\hline\n";
    return (
        `\\begin{tabular}{${new Array(cellsInFirstRow).fill('|l').join('')}|}` +
        `\n\\hline\n${answersParsedToTeX.join(hline)}${hline}` +
        '\\end{tabular}\n\n\n'
    );
}

// Создает пакет ответов в формате LaTeX
function createLaTeXbunchAnswers(variantN) {
    const answerRows = $(`table#pech-answers-table-variant-${variantN} tr`);
    const answersParsedToTeX = [];
    const cellsInFirstRow = (answerRows[2] || answerRows[1] || answerRows[0]).getElementsByTagName('td').length;
    for (const row of Array.from(answerRows)) {
        const tdCells = row.getElementsByTagName('td');
        if (tdCells.length) {
            answersParsedToTeX.push(Array.from(tdCells).map(x => x.innerHTML).join(' & '));
        }
    }
    return getAnswersSubtableLaTeX(cellsInFirstRow, answersParsedToTeX);
}

// Заменяет canvas на изображения в задании
function replaceCanvasWithImgInTask(element, text) {
    if (!(/<canvas/i.test(text))) {
        return text;
    }
    console.log(element);
    const canvases = Array.from(element.getElementsByTagName('canvas'));
    for (let i = 0; i < canvases.length; i++) {
        const imageName = canvases[i].getAttribute('data-nonce').substr(3) + "n" + i;
        preparedImages[imageName] = canvases[i].toDataURL().replace('data:image/png;base64,', '');
        text = text.replace(/<canvas.*?<\/canvas>/, `\\addpictoright[0.4\\linewidth]{${imageName}}`);
    }
    if (canvases.length) {
        text =
            '\\ifdefined\\OnBeforeIllustratedTask\\OnBeforeIllustratedTask\\fi\n' +
            text.trim() +
            '\n\\ifdefined\\OnAfterIllustratedTask\\OnAfterIllustratedTask\\fi';
    }

    return text;
}

// Создает пакет заданий в формате LaTeX
function createLaTeXbunchTasks(variantN) {
    let bunchText = "";
    for (const taskId in tasksInLaTeX) {
        if (generatedTasks[taskId].variantNumber === variantN) {
            bunchText +=
                `\n\\begin{taskBN}{${generatedTasks[taskId].taskCategory}}\n` +
                `% ${generatedTasks[taskId].address}\n` +
                `${tasksInLaTeX[taskId]}\n` +
                '\\end{taskBN}\n';
        }
    }
    return bunchText;
}

// Обновляет архив LaTeX
function refreshLaTeXarchive() {
    if (!options.prepareLaTeX) {
        return;
    }
    const zip = new JSZip();
    let bunchTasks = "";
    let answers = `\\begin{document}\n\n\\begin{multicols}{${variantsGenerated.length > 10 ? 6 : variantsGenerated.length}}`;

    for (const variantN of variantsGenerated) {
        const head =
            '\n\n' +
            '\\ifdefined\\OnBeforeVariant\\OnBeforeVariant\\fi\n' +
            `\\def\\examvart{\\varianttitle ${options.variantPrefix}${variantN}}\n` +
            '\\ifdefined\\OnStartVariant\\OnStartVariant\\fi\n\n';
        const tail = '\\ifdefined\\OnAfterVariant\\OnAfterVariant\\fi';
        bunchTasks += head + createLaTeXbunchTasks(variantN) + tail;
        answers += createLaTeXbunchAnswers(variantN);
    }

    answers += "\n\n\\end{multicols}\n\n\\end{document}";

    bunchTasks += `\n\n%Random seed:${options.randomSeed}`;

    zip.file("tasks.tex", bunchTasks);
    zip.file("answers.tex", "\\documentclass[a4paper]{article}\n\\usepackage[T2A]{fontenc}\n\\usepackage[utf8]{inputenc}\n\\usepackage[english,russian]{babel}\n\\usepackage{multicol}\n\n\\setlength{\\columnsep}{0pt}\n\\usepackage[\n\tleft = 0.5cm,\n\tright = 0.5cm,\n\ttop = 0.5cm,\n\tbottom = 0.5cm,\n]{geometry}" + answers);

    const img = zip.folder("images");
    for (const i in preparedImages) {
        img.file(`${i}.png`, preparedImages[i], { base64: true });
    }
    zip.generateAsync({ type: "base64" }).then(function (base64) {
        $('#latex-archive-placeholder').show();
        $('#latex-archive-placeholder')[0].href = `data:application/zip;base64,${base64}`;
    });
}
