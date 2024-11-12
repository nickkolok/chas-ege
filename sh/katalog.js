'use strict';

/**
 * Генерирует HTML для задания.
 * @param {string} kat - Категория задания.
 * @param {string} zdn - Номер задания.
 * @param {Array} masdey - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(kat, zdn, masdey) {
    let rez = '';
    vopr.podg();
    const currentTask = `${nabor.adres}${kat}/${zdn}.js`;
    rez += `<div class="task-wrapper" data-category="${kat}" data-tasknumber="${zdn}">`;
    rez += currentTask.vTag('h2');
    console.log(currentTask);

    try {
        nabor.upak[kat][zdn]();
        vopr.template = currentTask.replace(/^(\.\.\/)+/, '');
        vopr.taskNumber = kat;
        rez += `<br/>${vopr.txt.vTag('div')}<br/>`;
        rez += `
            <div>
                <button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
                <button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
                <button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
                Ответ: ${vopr.ver.join('или')}
            </div>
            <br/>
        `;
        masdey.push(vopr.dey);

        if (vopr.rsh) {
            rez += `
                <button class="spoiler-show">Показать решение</button>
                <button class="spoiler-hide">Скрыть решение</button>
                <div class="spoiler-body">Решение: <br/>${vopr.rsh}</div>
            `;
        }

        if (vopr.authors && vopr.authors.length) {
            rez += `
                <br/>
                <div class="katalog-authors">
                    Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;${vopr.authors.join(', ')}
                </div>
                <br/>
            `;
        }
    } catch (e) {
        console.error(e);
    }

    rez += '</div>';
    return rez;
}

/**
 * Генерирует каталог заданий.
 */
function generateKatalog() {
    let rez = '';
    let toc = '';
    const masdey = [];
    const br = '<br/>';

    for (const kat in nabor.upak) {
        window.comment = '';
        window.availableTaskNumbers = null;

        try {
            nabor.upak[kat][nabor.scheduler]();
        } catch (e) {
            console.error(e);
        }

        rez += `
            <button class="spoiler-show">Показать категорию ${kat}</button>
            <button class="spoiler-hide">Скрыть категорию ${kat}</button>
            <div class="spoiler-body">
                <h1 id="${kat}">Категория ${kat}</h1>
                ${window.comment}
        `;
        toc += `<a href="#${kat}">${kat}. ${window.comment}</a>${br}`;

        const tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[kat]);

        for (const zdn of tasksToList) {
            if (zdn !== 'main' && zdn !== 'fipi') {
                rez += generateHtmlForTask(kat, zdn, masdey);
            }
        }

        rez += '</div>';
    }

    $('#divrez').html(toc + br + rez);

    masdey.forEach(action => {
        try {
            action();
        } catch (e) {
            console.error(e);
        }
    });

    MathJax.Hub.Typeset();
    afterTasksGenerated();
    $('.spoiler-show').click();
}

/**
 * Выполняет действия после генерации заданий.
 */
function afterTasksGenerated() {
    spoiler();
    $('button.copybutton[data-already-inited!=true]').click(copyTask).attr('data-already-inited', true);
    $('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
    $('button.addbutton[data-already-inited!=true]').click(addTask).attr('data-already-inited', true);
}

/**
 * Копирует задание в буфер обмена.
 */
function copyTask() {
    console.log(this);
    let theTask = decodeURIComponent(this.getAttribute('data-task'));
    console.log(theTask);
    theTask = JSON.parse(theTask);
    console.log(theTask);

    replaceCanvasWithImgInTaskAndHTML($(this).closest('div.task-wrapper')[0], theTask, () => {
        const fillerCode = createFiller(theTask);
        copyToClipboard(fillerCode);
    });
}

/**
 * Обновляет задание на новое.
 */
function renewTask() {
    console.log(this);
    const wrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'), wrapper.getAttribute('data-tasknumber'), actions));
    $(wrapper).replaceWith(taskHtml);
    actions[0]();
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
}

/**
 * Добавляет новое задание после текущего.
 */
function addTask() {
    console.log(this);
    const wrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'), wrapper.getAttribute('data-tasknumber'), actions));
    taskHtml.insertAfter(wrapper);
    actions[0]();
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
}
