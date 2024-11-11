'use strict';

// Конфигурационные переменные
const FAST_MODE_DELAY = chas.mode.svinta ? 100 : 200;
const SLOW_MODE_DELAY = chas.mode.svinta ? 100 : 1500;

// Переменные состояния
let currentVariantIndex = 0;
let remainingVariantCount = 1;
let currentTaskIndex = 1;
let tasksPerCategoryCount = [];
let remainingTasksPerCategoryCount = [];
let totalVariantCount;
let totalTaskCount;
let taskHtmlContent = '';
let answerHtmlContent = '';
let solutionHtmlContent = '';

// Структуры данных для хранения сгенерированного контента
const generatedVariantIndices = [];
const generatedTaskData = {};
const taskLaTeXContent = {};
const imageCache = {};

// Объект для хранения пользовательских настроек
const userPreferences = {};

// Стиль для крупного шрифта
const LARGE_FONT_STYLE = 'div.z{font-size:128%}\n .MathJax_SVG_Display {font-size: 128%;}'.vTag('style');

// Устанавливает количество заданий в 1
const setTaskCountToOne = () => $taskCountInput.val(1);

// Устанавливает количество заданий в 0 и сбрасывает счетчик вариантов
const resetTaskCountAndVariantIndex = () => {
    $taskCountInput.val(0);
    $variantCountInput.val(1);
};

// Читает пользовательские настройки из интерфейса
function loadUserPreferences() {
    const preferences = [
        { key: 'isEditable', selector: '#redakt', type: 'checkbox' },
        { key: 'useLargeFont', selector: '#largeFont', type: 'checkbox' },
        { key: 'useCustomNumbering', selector: '#customNumber', type: 'checkbox' },
        { key: 'variantPrefix', selector: '#variantPrefix', type: 'value' },
        { key: 'hideVariants', selector: '#vanishVariants', type: 'checkbox' },
        { key: 'noPageBreak', selector: '#nopagebreak', type: 'checkbox' },
        { key: 'compactAnswers', selector: '#compact-answers', type: 'checkbox' },
        { key: 'includeSolutionsInAnswers', selector: '#solutions-into-answers', type: 'checkbox' },
        { key: 'noBackground', selector: '#nobackground', type: 'checkbox' },
        { key: 'firstTaskNumber', selector: '#first-task-number', type: 'int' },
        { key: 'transitTaskNumbers', selector: '#transitTaskNumbers', type: 'checkbox' },
        { key: 'splitAnswersNumber', selector: '#split-answers-number', type: 'int' },
        { key: 'splitAnswerTables', selector: '#splitAnswerTables', type: 'checkbox' },
        { key: 'uniqueAnswersAndSolutions', selector: '#uniqueAnswersAndSolutions', type: 'checkbox' },
        { key: 'startTransitNumber', selector: '#start-transit-number', type: 'int' },
        { key: 'prepareLaTeX', selector: '#prepareLaTeX', type: 'checkbox' },
        { key: 'forceIntegers', selector: '#forceIntegers', type: 'checkbox' },
        { key: 'randomSeed', selector: '#randomSeed', type: 'value', default: Date.now().toString() }
    ];

    preferences.forEach(({ key, selector, type, default: defaultValue }) => {
        switch (type) {
            case 'checkbox':
                userPreferences[key] = $(selector).is(':checked');
                break;
            case 'int':
                userPreferences[key] = parseInt($(selector).val(), 10);
                break;
            case 'value':
                userPreferences[key] = $(selector).val() || defaultValue;
                break;
        }
    });

    if (userPreferences.useCustomNumbering) {
        currentVariantIndex = parseInt($('#start-number').val(), 10) - 1;
    }

    sluchch.forceIntegers = userPreferences.forceIntegers;

    if ($('#htmlcss').is(':checked')) {
        MathJax.Hub.setRenderer('HTML-CSS');
    }
}

// Запускает процесс генерации тестов
function startTestGeneration() {
    chasStorage.domData.save();
    loadUserPreferences();

    totalVariantCount = remainingVariantCount = parseInt($variantCountInput.val(), 10);
    tasksPerCategoryCount = Array.from({ length: nabor.nZad }, (_, i) => parseInt($(`#cB${i + 1}`).val(), 10));

    cacheKat();
    totalTaskCount = tasksPerCategoryCount.reduce((sum, value) => sum + value, 0) * totalVariantCount;
    if (!totalTaskCount) {
        alert('Ни одно задание не выбрано.');
        return;
    }
    remainingTasksPerCategoryCount = [...tasksPerCategoryCount];
    currentTaskIndex = 0;
    $panel.html('Тесты составляются, подождите...');
    $readyButton.show();
    generateTasks();
}

// Обрабатывает завершение генерации тестов
function handleTestCompletion() {
    $readyButton.hide();
    if (userPreferences.isEditable) {
        $('#rez, #otv, #rsh').attr('contenteditable', 'true');
    }
    $('#dopoln').show();
    alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
    specCounter('pech');
}

// Удаляет панель после завершения
const removePanel = () => $('#panel, #menucenter, #inf').remove();

// Завершает создание тестов и отображает результаты
function finalizeTestCreation() {
    answerHtmlContent = `<h2>Ответы</h2>${answerHtmlContent}`;

    if (userPreferences.useLargeFont) {
        answerHtmlContent = LARGE_FONT_STYLE + answerHtmlContent;
    }

    $('#otv').html(answerHtmlContent);
    $('#rez').html(taskHtmlContent);
    if (solutionHtmlContent) {
        $('#rsh').html(`<h2>Решения</h2>${solutionHtmlContent}`);
    }

    Object.values(generatedTaskData).forEach(task => {
        try {
            task.dey();
        } catch (e) {
            console.error(e);
        }
    });

    convertCanvasToImagesIfNeeded();
    if (userPreferences.prepareLaTeX) {
        Object.keys(generatedTaskData).forEach(id => {
            taskLaTeXContent[id] = replaceCanvasWithImgInTask(
                getTaskTextContainerByTaskId(id),
                generatedTaskData[id].txt
            )
            .replace(/\\?%/g, '\\%')
            .replace(/<br>/g, '\\\\')
            .replace(/<br\/>/g, '\\\\')
            .replace(/<b>/g, '\\textbf{')
            .replace(/<\/b>/g, '}');
        });
    }

    refreshLaTeXarchive();
    MathJax.Hub.Typeset(handleTestCompletion);
    removePanel();
    spoiler();
    $('.spoiler-show').click();
    $("hr:first").remove();
    $("hr:first").remove();
    document.body.style.backgroundColor = "white";
    $('body').append('<script>removePanel()</script>');

    $('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
}

// Конвертирует canvas в изображения, если необходимо
const convertCanvasToImagesIfNeeded = () => {
    if (!userPreferences.noBackground) {
        allCanvasToBackgroundImage();
    }
};

// Увеличивает номер варианта
const incrementVariantIndex = () => {
    currentVariantIndex = userPreferences.useCustomNumbering ? currentVariantIndex + 1 : new Date().getTime();
    generatedVariantIndices.push(currentVariantIndex);
};

// Добавляет заголовок для заданий варианта
const addVariantTasksHeader = () => {
    if (!userPreferences.hideVariants) {
        taskHtmlContent += `<h2 class="d">Вариант №${userPreferences.variantPrefix}${currentVariantIndex}</h2>`;
    }
};

// Добавляет окончание для заданий варианта
const addVariantTasksFooter = () => {
    if (!userPreferences.noPageBreak) {
        taskHtmlContent += PAGE_BREAK_HTML;
    }
};

// Добавляет заголовок для ответов варианта
const addVariantAnswersHeader = () => {
    answerHtmlContent += `<table class="normtabl tablpech pech-answers-table" id="pech-answers-table-variant-${currentVariantIndex}">`;

    if (!userPreferences.hideVariants) {
        answerHtmlContent += '<tr><th colspan="10">';
        answerHtmlContent += userPreferences.compactAnswers ? `Вар. ${userPreferences.variantPrefix}${currentVariantIndex}` : `Ответы к варианту<br/>№${userPreferences.variantPrefix}${currentVariantIndex}`;
        answerHtmlContent += '</th></tr>';
    }
};

// Добавляет окончание для ответов варианта
const addVariantAnswersFooter = () => {
    answerHtmlContent += '</table>';
};

// Завершает текущий вариант
function completeCurrentVariant() {
    remainingVariantCount--;
    currentTaskIndex = 0;
    addVariantTasksFooter();
    addVariantAnswersFooter();
    if (userPreferences.uniqueAnswersOnlyInOneVariant) {
        uniqueAnswerDict = {};
    }
    generateTasks();
}

// Основная функция генерации заданий
function generateTasks() {
    if (currentTaskIndex === 1 + nabor.nZad) {
        completeCurrentVariant();
        return;
    }

    if (currentTaskIndex === 0) {
        if (!remainingVariantCount) {
            finalizeTestCreation();
            return;
        }
        startNewVariant();
        return;
    }

    if (remainingTasksPerCategoryCount[currentTaskIndex] === 0) {
        currentTaskIndex++;
        generateTasks();
        return;
    }

    const tasksReadyInCurrentVariant = tasksPerCategoryCount.reduce((sum, value) => sum + value, 0) - remainingTasksPerCategoryCount.reduce((sum, value) => sum + value, 0);
    const seed = `${userPreferences.randomSeed}__${generatedVariantIndices.length}__${tasksReadyInCurrentVariant}`;
    Math.seedrandom(seed);

    if (userPreferences.splitAnswerTables && tasksReadyInCurrentVariant && (tasksReadyInCurrentVariant % userPreferences.splitAnswersNumber === 0)) {
        addVariantAnswersFooter();
        addVariantAnswersHeader();
    }
    remainingTasksPerCategoryCount[currentTaskIndex]--;
    dvig.zadan(updateCurrentTask, currentTaskIndex);
}

// Начинает новый вариант
function startNewVariant() {
    remainingTasksPerCategoryCount = [...tasksPerCategoryCount];
    incrementVariantIndex();
    addVariantTasksHeader();
    addVariantAnswersHeader();
    currentTaskIndex = 1;
    generateTasks();
}

// Создает HTML для задания
function createTaskHtml(taskCategory) {
    const taskId = `${currentVariantIndex}-${taskCategory}`;
    vopr.taskId = taskId;
    vopr.taskNumber = currentTaskIndex;
    vopr.taskCategory = taskCategory;
    vopr.variantNumber = currentVariantIndex;

    return {
        txt: `<div class="d" data-task-id="${taskId}" data-task-number="${currentTaskIndex}" data-variant-number="${currentVariantIndex}">
                <div class="b">${taskCategory}</div>
                <div class="z">
                    ${window.vopr.txt}
                    <button class="noprint renewbutton" title="Заменить задание на похожее">
                        &#x27F3;
                    </button>
                </div>
                <div class="grid-for-writing"></div>
            </div>`,
        ver: `<tr class="answer-container" data-task-id="${currentVariantIndex}-${taskCategory}">
                ${!userPreferences.hideVariants ? `<td>${userPreferences.variantPrefix}${currentVariantIndex}</td>` : ''}
                <td>${taskCategory}</td>
                <td>${window.vopr.ver.join('; ')}</td>
                ${userPreferences.includeSolutionsInAnswers ? `<td>${window.vopr.rsh}</td>` : ''}
            </tr>`,
        rsh: `<div class="solution-container" data-task-id="${currentVariantIndex}-${taskCategory}">
                ${vopr.rsh ? `<h3>${!userPreferences.hideVariants ? `Вариант №${userPreferences.variantPrefix}${currentVariantIndex}, ` : ''}задача ${taskCategory}</h3><br/>${vopr.rsh}` : ''}
            </div>`,
        unq: [vopr.ver.join('; '), vopr.rsh, vopr.unq].join(' [:////:] '), // Служебная комбинация символов
    };
}

let uniqueAnswerDict = {};

// Обновляет текущее задание
function updateCurrentTask() {
    let taskCategory = getTaskCategory();

    const html = createTaskHtml(taskCategory);

    if (userPreferences.uniqueAnswersAndSolutions && (html.unq in uniqueAnswerDict)) {
        console.log(`Deduplicating ${taskCategory}...`);
        dvig.zadan(updateCurrentTask, currentTaskIndex);
        return;
    }

    uniqueAnswerDict[html.unq] = true;

    taskHtmlContent += html.txt;
    answerHtmlContent += html.ver;
    solutionHtmlContent += html.rsh;

    storeCurrentTask();

    const tasksCompleted = tasksPerCategoryCount.reduce((sum, value) => sum + value, 0) * (totalVariantCount - remainingVariantCount + 1) - remainingTasksPerCategoryCount.reduce((sum, value) => sum + value, 0);
    updateProgress(tasksCompleted, totalTaskCount);
    generateTasks();
}

// Получает категорию задания
function getTaskCategory() {
    if (userPreferences.transitTaskNumbers) {
        return userPreferences.startTransitNumber + tasksPerCategoryCount.reduce((sum, value) => sum + value, 0) - remainingTasksPerCategoryCount.reduce((sum, value) => sum + value, 0) - 1;
    }
    return dvig.getzadname(currentTaskIndex) + (tasksPerCategoryCount[currentTaskIndex] === 1 ? '' : `-${tasksPerCategoryCount[currentTaskIndex] - remainingTasksPerCategoryCount[currentTaskIndex] + userPreferences.firstTaskNumber - 1}`);
}

// Устанавливает ширину примера
const setExampleWidth = () => $('.z').css("width", `${$('#shir').val()}cm`);

let taskElements;
const mathJaxSelector = '.jqplot-target, .MathJax>nobr>span>span>span';
const canvasSelector = 'canvas';

// Оптимизирует копирование
function optimizeCopy() {
    const mathJaxSpans = $(".MathJax nobr * span");
    mathJaxSpans.each((_, span) => {
        if (span.style.clip) {
            span.style.height = `${1.468 * span.offsetHeight}px`;
        }
    });

    taskElements = $('.d');
    $('#otv').hide();
    optimizeCopyForElement(1);
}

// Оптимизирует копирование для конкретного элемента
function optimizeCopyForElement(index) {
    if (index >= taskElements.length) {
        $('.d').show();
        $('#otv').show();
        return;
    }
    const taskElement = $(taskElements[index]);
    taskElements.hide();
    const mathJaxElements = taskElement.find(mathJaxSelector);
    const canvasElements = taskElement.find(canvasSelector);
    if (!(mathJaxElements.length + canvasElements.length)) {
        setTimeout(() => optimizeCopyForElement(index + 1), 100);
        return;
    }
    taskElement.show();
    mathJaxElements.each((_, elem) => innerHTMLtoImg(elem));
    canvasElements.each((_, elem) => replaceWithImg(elem));
    setTimeout(() => optimizeCopyForElement(index + 1), 100);
}

// Инициализирует начальные настройки
const initializeSettings = () => {
    window.vopr.txt = '';
    $('#zadaniya').html(sozdKolvoHtml('pech'));
    $('#gotov').hide();
    galkiKat('#galki_kat', 'pech');
};

// Получает контейнер текста задания по его ID
const getTaskTextContainerByTaskId = (taskId) => $(`div.d[data-task-id="${taskId}"]`)[0];

// Сохраняет текущее задание
function storeCurrentTask() {
    generatedTaskData[vopr.taskId] = { ...vopr };
    generatedTaskData[vopr.taskId].address = `${window.nabor.adres}${dvig.getzadname(currentTaskIndex)}/${window.nomer}`;
}

// Обновляет задание
function renewTask() {
    console.log(this);
    const taskWrapper = $(this).closest('div.d');
    const taskCategory = taskWrapper.children('div.b')[0].innerHTML;
    console.log(taskWrapper);
    const taskId = taskWrapper.attr('data-task-id');
    const taskNumber = taskWrapper.attr('data-task-number');
    currentVariantIndex = taskWrapper.attr('data-variant-number');
    const answerRow = $(`tr.answer-container[data-task-id=${taskId}]`);
    const solutionContainer = $(`div.solution-container[data-task-id=${taskId}]`);

    currentTaskIndex = taskNumber;
    dvig.zadan(() => {
        console.log(taskWrapper);
        const taskHtml = createTaskHtml(taskCategory);
        taskWrapper.replaceWith(taskHtml.txt);
        answerRow.replaceWith(taskHtml.ver);
        solutionContainer.replaceWith(taskHtml.rsh);
        window.vopr.dey();
        convertCanvasToImagesIfNeeded();
        storeCurrentTask();
        if (userPreferences.prepareLaTeX) {
            taskLaTeXContent[taskId] = replaceCanvasWithImgInTask(getTaskTextContainerByTaskId(taskId), vopr.txt);
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

    const svgContent = $('#grid-svg-container').html();
    const svgBase64 = window.btoa(svgContent);

    $('#grid-style-placeholder').html(
        `<style>
            .grid-for-writing {
                display: block;
                min-height: ${fieldHeight}cm;
                background-image: url(data:image/svg+xml;base64,${svgBase64});
            }
        </style>`
    );

    $('#button-removeGridFields').show();
}

// Удаляет поля сетки
const removeGridFields = () => {
    $('#grid-style-placeholder').html('');
    $('#button-removeGridFields').hide();
};

// Получает подтаблицу ответов в формате LaTeX
function getAnswersSubtableLaTeX(cellsInFirstRow, answersParsedToTeX) {
    const hline = "\n\\\\\n\\hline\n";
    return (
        `\\begin{tabular}{${new Array(cellsInFirstRow).fill('|l').join('')}|}` +
        `\n\\hline\n` +
        answersParsedToTeX.join(hline) +
        hline +
        '\\end{tabular}\n\n\n'
    );
}

// Создает пакет ответов в формате LaTeX для варианта
function createLaTeXAnswersPackage(variantNumber) {
    const answerRows = $(`table#pech-answers-table-variant-${variantNumber} tr`);
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

// Заменяет canvas на изображение в задании
function replaceCanvasWithImgInTask(element, text) {
    if (!(/<canvas/i.test(text))) {
        return text;
    }
    console.log(element);
    const canvases = Array.from(element.getElementsByTagName('canvas'));
    canvases.forEach((canvas, i) => {
        const imageName = canvas.getAttribute('data-nonce').substr(3) + "n" + i;
        imageCache[imageName] = canvas.toDataURL().replace('data:image/png;base64,', '');
        text = text.replace(/<canvas.*?<\/canvas>/, `\\addpictoright[0.4\\linewidth]{${imageName}}`);
    });
    if (canvases.length) {
        text =
            '\\ifdefined\\OnBeforeIllustratedTask\\OnBeforeIllustratedTask\\fi\n' +
            text.trim() +
            '\n\\ifdefined\\OnAfterIllustratedTask\\OnAfterIllustratedTask\\fi';
    }

    return text;
}

// Создает пакет заданий в формате LaTeX для варианта
function createLaTeXTasksPackage(variantNumber) {
    return Object.entries(taskLaTeXContent)
        .filter(([taskId]) => generatedTaskData[taskId].variantNumber === variantNumber)
        .map(([taskId, content]) => (
            `\n\\begin{taskBN}{${generatedTaskData[taskId].taskCategory}}\n` +
            `% ${generatedTaskData[taskId].address}\n` +
            `${content}\n\\end{taskBN}\n`
        ))
        .join('');
}

// Обновляет архив LaTeX
function refreshLaTeXarchive() {
    if (!userPreferences.prepareLaTeX) {
        return;
    }
    const zip = new JSZip();
    let tasksText = "";
    let answersText = "\\begin{document}\n\n\\begin{multicols}{" + ((generatedVariantIndices.length > 10) ? 6 : generatedVariantIndices.length) + "}";

    generatedVariantIndices.forEach(variantNumber => {
        const header =
            '\n\n' +
            '\\ifdefined\\OnBeforeVariant\\OnBeforeVariant\\fi\n' +
            `\\def\\examvart{\\varianttitle ${userPreferences.variantPrefix}${variantNumber}}\n` +
            '\\ifdefined\\OnStartVariant\\OnStartVariant\\fi' +
            '\n\n';
        const footer =
            '\\ifdefined\\OnAfterVariant\\OnAfterVariant\\fi';
        tasksText += header + createLaTeXTasksPackage(variantNumber) + footer;
        answersText += createLaTeXAnswersPackage(variantNumber);
    });

    answersText += "\n\n\\end{multicols}\n\n\\end{document}";

    tasksText += "\n\n%Random seed:" + userPreferences.randomSeed;

    zip.file("tasks.tex", tasksText);
    zip.file("answers.tex", "\\documentclass[a4paper]{article}\n\\usepackage[T2A]{fontenc}\n\\usepackage[utf8]{inputenc}\n\\usepackage[english,russian]{babel}\n\\usepackage{multicol}\n\n\\setlength{\\columnsep}{0pt}\n\\usepackage[\n\tleft = 0.5cm,\n\tright = 0.5cm,\n\ttop = 0.5cm,\n\tbottom = 0.5cm,\n]{geometry}" + answersText);

    const imgFolder = zip.folder("images");
    Object.entries(imageCache).forEach(([imageName, data]) => {
        imgFolder.file(`${imageName}.png`, data, { base64: true });
    });

    zip.generateAsync({ type: "base64" }).then(base64 => {
        $('#latex-archive-placeholder').show();
        $('#latex-archive-placeholder')[0].href = `data:application/zip;base64,${base64}`;
    });
}
