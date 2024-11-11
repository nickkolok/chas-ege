'use strict';

/**
 * Генерирует HTML для конкретной задачи.
 * @param {string} category - Категория задачи.
 * @param {string} taskNumber - Номер задачи в категории.
 * @param {Array} actions - Массив для хранения действий, связанных с задачей.
 * @returns {string} - Сгенерированный HTML для задачи.
 */
const generateHtmlForTask = (category, taskNumber, actions) => {
    let result = '';
    vopr.podg();
    const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;
    result += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
    result += currentTaskPath.vTag('h2');
    console.log(currentTaskPath);

    try {
        nabor.upak[category][taskNumber]();
        vopr.template = currentTaskPath.replace(/^(\.\.\/)+/, '');
        vopr.taskNumber = category;
        result += `<br/>${vopr.txt.vTag('div')}<br/>`;
        result += createTaskButtons(vopr);
        actions.push(vopr.dey);

        if (vopr.rsh) {
            result += createSpoiler(vopr.rsh);
        }

        if (vopr.authors && vopr.authors.length) {
            result += createAuthors(vopr.authors);
        }
    } catch (error) {
        console.error('Ошибка при генерации HTML задачи:', error);
    }

    result += '</div>';
    return result;
};

/**
 * Создает HTML для кнопок взаимодействия с задачей.
 * @param {Object} vopr - Объект задачи, содержащий детали задачи.
 * @returns {string} - HTML для кнопок задачи.
 */
const createTaskButtons = (vopr) => `
    <div>
        <button class="copybutton" style="display:block; float:right;" title="Экспорт в РешуЕГЭ"
            data-task="${encodeURIComponent(JSON.stringify(vopr))}">
            &#x2398;
        </button>
        <button class="renewbutton" style="display:block; float:right; margin-right:1.46em;" title="Заменить задание на похожее">
            &#x27F3;
        </button>
        <button class="addbutton" style="display:block; float:right; margin-right:1.46em;" title="Добавить похожее задание">
            +
        </button>
        Ответ: ${vopr.ver.join('или')}
    </div>
    <br/>
`;

/**
 * Создает секцию спойлера для решения задачи.
 * @param {string} solution - Текст решения задачи.
 * @returns {string} - HTML для секции спойлера.
 */
const createSpoiler = (solution) => `
    <button class="spoiler-show">Показать решение</button>
    <button class="spoiler-hide">Скрыть решение</button>
    <div class="spoiler-body">
        Решение: <br/>
        ${solution}
    </div>
`;

/**
 * Создает HTML для отображения авторов задачи.
 * @param {Array} authors - Массив имен авторов.
 * @returns {string} - HTML для секции авторов.
 */
const createAuthors = (authors) => `
    <br/>
    <div class="katalog-authors">
        Автор${authors.length > 1 ? 'ы' : ''}: &nbsp;${authors.join(', ')}
    </div>
    <br/>
`;

/**
 * Генерирует весь каталог задач.
 */
const generateKatalog = () => {
    let result = '';
    let toc = '';
    const actions = [];
    const br = '<br/>';

    for (const category in nabor.upak) {
        window.comment = '';
        window.availableTaskNumbers = null;

        try {
            nabor.upak[category][nabor.scheduler]();
        } catch (error) {
            console.error('Ошибка при планировании задач:', error);
        }

        result += createCategoryHeader(category, window.comment);
        toc += `<a href="#${category}">${category}. ${window.comment}</a>${br}`;

        const tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[category]);

        for (const taskNumber of tasksToList) {
            if (taskNumber !== 'main' && taskNumber !== 'fipi') {
                result += generateHtmlForTask(category, taskNumber, actions);
            }
        }
        result += '</div>';
    }

    $('#divrez').html(toc + br + result);

    actions.forEach(action => {
        try {
            action();
        } catch (error) {
            console.error('Ошибка при выполнении действия задачи:', error);
        }
    });

    MathJax.Hub.Typeset();
    afterTasksGenerated();
    $('.spoiler-show').click();
};

/**
 * Создает заголовок для категории задач.
 * @param {string} category - Название категории.
 * @param {string} comment - Комментарий или описание категории.
 * @returns {string} - HTML для заголовка категории.
 */
const createCategoryHeader = (category, comment) => `
    <button class="spoiler-show">Показать категорию ${category}</button>
    <button class="spoiler-hide">Скрыть категорию ${category}</button>
    <div class="spoiler-body">
        <h1 id="${category}">Категория ${category}</h1>
        ${comment}
`;

/**
 * Инициализирует действия, связанные с задачами, после их генерации.
 */
const afterTasksGenerated = () => {
    spoiler();
    initializeButtons('copybutton', copyTask);
    initializeButtons('renewbutton', renewTask);
    initializeButtons('addbutton', addTask);
};

/**
 * Инициализирует кнопки с определенным классом и обработчиком событий.
 * @param {string} buttonClass - Класс кнопок для инициализации.
 * @param {Function} handler - Функция-обработчик событий для кнопок.
 */
const initializeButtons = (buttonClass, handler) => {
    $(`button.${buttonClass}[data-already-inited!=true]`).click(handler).attr('data-already-inited', true);
};

/**
 * Обрабатывает действие копирования задачи.
 */
const copyTask = function() {
    console.log(this);
    const taskData = decodeURIComponent(this.getAttribute('data-task'));
    const task = JSON.parse(taskData);
    console.log(task);

    replaceCanvasWithImgInTaskAndHTML($(this).closest('div.task-wrapper')[0], task, () => {
        const fillerCode = createFiller(task);
        copyToClipboard(fillerCode);
    });
};

/**
 * Обрабатывает действие обновления задачи.
 */
const renewTask = function() {
    console.log(this);
    const wrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'), wrapper.getAttribute('data-tasknumber'), actions));
    $(wrapper).replaceWith(taskHtml);
    actions[0]();
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
};

/**
 * Обрабатывает действие добавления новой задачи.
 */
const addTask = function() {
    console.log(this);
    const wrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'), wrapper.getAttribute('data-tasknumber'), actions));
    taskHtml.insertAfter(wrapper);
    actions[0]();
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
};
