'use strict';

// ============================================================================
// ОСНОВНЫЕ ФУНКЦИИ ГЕНЕРАЦИИ ЗАДАНИЙ
// ============================================================================

/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(category, taskNumber, actionsArray) {
    try {
        prepareTaskGeneration(category, taskNumber);
        const variants = getTaskVariants(taskNumber);
        
        let htmlContent = '';
        for (let i = 0; i < variants.length; i++) {
            htmlContent += generateVariantHtml(category, taskNumber, variants[i], i, variants.length, actionsArray);
        }
        return htmlContent;
    } catch (e) {
        return handleTaskError(category, taskNumber, e);
    }
}

/**
 * Подготавливает окружение для генерации задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 */
function prepareTaskGeneration(category, taskNumber) {
    vopr.podg();
    nabor.upak[category][taskNumber]();
}

/**
 * Получает варианты задания на основе предпочтений
 * @param {string} taskNumber - Номер задания
 * @returns {Array} Массив вариантов
 */
function getTaskVariants(taskNumber) {
    let variants = [null];
    const hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
    
    if (vopr.preference && Array.isArray(vopr.preference) && vopr.preference.length > 0) {
        if (hasExplicitPreferences) {
            variants = [window.nabor.preferences[taskNumber]];
        } else {
            variants = generateVariations(vopr.preference);
        }
    }
    return variants;
}

/**
 * Генерирует HTML для одного варианта задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Текущий вариант
 * @param {number} index - Индекс варианта
 * @param {number} totalVariants - Общее количество вариантов
 * @param {Array} actionsArray - Массив действий
 * @returns {string} HTML варианта
 */
function generateVariantHtml(category, taskNumber, variant, index, totalVariants, actionsArray) {
    const state = saveCurrentState(taskNumber);
    
    try {
        applyVariantPreferences(taskNumber, variant);
        regenerateTask(category, taskNumber);
        
        return buildVariantHtml(category, taskNumber, variant, index, totalVariants, actionsArray);
    } finally {
        restoreState(taskNumber, state);
    }
}

/**
 * Сохраняет текущее состояние перед генерацией варианта
 * @param {string} taskNumber - Номер задания
 * @returns {Object} Сохраненное состояние
 */
function saveCurrentState(taskNumber) {
    return {
        originalPreferences: window.nabor.preferences ? {...window.nabor.preferences} : {},
        originalVopr: {...vopr}
    };
}

/**
 * Восстанавливает состояние после генерации варианта
 * @param {string} taskNumber - Номер задания
 * @param {Object} state - Ранее сохраненное состояние
 */
function restoreState(taskNumber, state) {
    if (window.nabor.preferences) {
        window.nabor.preferences[taskNumber] = state.originalPreferences[taskNumber];
    }
    
    Object.keys(state.originalVopr).forEach(key => {
        if (vopr[key] !== state.originalVopr[key]) {
            vopr[key] = state.originalVopr[key];
        }
    });
}

/**
 * Применяет предпочтения для конкретного варианта
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Предпочтения варианта
 */
function applyVariantPreferences(taskNumber, variant) {
    if (variant !== null) {
        window.nabor.preferences = window.nabor.preferences || {};
        window.nabor.preferences[taskNumber] = variant;
    }
}

/**
 * Перегенерирует задание с текущими настройками
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 */
function regenerateTask(category, taskNumber) {
    nabor.upak[category][taskNumber]();
}

/**
 * Собирает полный HTML для варианта
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Текущий вариант
 * @param {number} index - Индекс варианта
 * @param {number} totalVariants - Общее количество вариантов
 * @param {Array} actionsArray - Массив действий
 * @returns {string} Полный HTML варианта
 */
function buildVariantHtml(category, taskNumber, variant, index, totalVariants, actionsArray) {
    let html = createTaskWrapperStart(category, taskNumber);
    html += createTaskTitle(category, taskNumber);
    html += createVariantInfoIfNeeded(taskNumber, variant, index, totalVariants);
    html += createTaskContent(category, taskNumber);
    html += createTaskFooter(actionsArray);
    html += createSolutionSection();
    html += createAuthorsSection();
    html += closeTaskWrapper();
    
    return html;
}

/**
 * Создает открывающий тег обертки задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @returns {string} HTML
 */
function createTaskWrapperStart(category, taskNumber) {
    return `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
}

/**
 * Создает заголовок задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @returns {string} HTML
 */
function createTaskTitle(category, taskNumber) {
    const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;
    return currentTaskPath.vTag('h2');
}

/**
 * Создает информацию о варианте, если их несколько
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Текущий вариант
 * @param {number} index - Индекс варианта
 * @param {number} totalVariants - Общее количество вариантов
 * @returns {string} HTML
 */
function createVariantInfoIfNeeded(taskNumber, variant, index, totalVariants) {
    const hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
    
    if (totalVariants > 1 || hasExplicitPreferences) {
        const variation = formatVariantInfo(taskNumber, variant);
        return `<div class="variant-info">Вариация: '${variation}'</div>`;
    }
    return '';
}

/**
 * Форматирует информацию о варианте
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Текущий вариант
 * @returns {string} Отформатированная строка
 */
function formatVariantInfo(taskNumber, variant) {
    const parts = [taskNumber];
    if (Array.isArray(variant)) {
        parts.push(variant.join('_'), variant.join(' '));
    } else {
        parts.push(variant, variant);
    }
    return parts.join(' ');
}

/**
 * Создает основное содержание задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @returns {string} HTML
 */
function createTaskContent(category, taskNumber) {
    vopr.template = `${nabor.adres}${category}/${taskNumber}.js`.replace(/^(\.\.\/)+/, '');
    vopr.taskNumber = category;
    return `<br/>${vopr.txt.vTag('div')}<br/>`;
}

/**
 * Создает футер задания с кнопками и ответом
 * @param {Array} actionsArray - Массив действий
 * @returns {string} HTML
 */
function createTaskFooter(actionsArray) {
    if (vopr.dey) {
        actionsArray.push(vopr.dey);
    }
    
    return `
        <div>
            <button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
            <button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
            <button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
            Ответ: ${vopr.ver.join('или')}
        </div>
        <br/>
    `;
}

/**
 * Создает секцию с решением
 * @returns {string} HTML
 */
function createSolutionSection() {
    if (!vopr.rsh) return '';
    
    return `
        <button class="spoiler-show">Показать решение</button>
        <button class="spoiler-hide">Скрыть решение</button>
        <div class="spoiler-body">Решение: <br/>${vopr.rsh}</div>
    `;
}

/**
 * Создает секцию с авторами
 * @returns {string} HTML
 */
function createAuthorsSection() {
    if (!vopr.authors || !vopr.authors.length) return '';
    
    const authorLabel = `Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;`;
    return `
        <br/>
        <div class="katalog-authors">
            ${authorLabel}${vopr.authors.join(', ')}
        </div>
        <br/>
    `;
}

/**
 * Закрывает обертку задания
 * @returns {string} HTML
 */
function closeTaskWrapper() {
    return '</div>';
}

/**
 * Обрабатывает ошибку генерации задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {Error} error - Объект ошибки
 * @returns {string} HTML с сообщением об ошибке
 */
function handleTaskError(category, taskNumber, error) {
    console.error(error);
    return `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
        Error generating task: ${error.message}
    </div>`;
}


// ============================================================================
// ОСНОВНЫЕ ФУНКЦИИ ГЕНЕРАЦИИ КАТАЛОГА
// ============================================================================

/**
 * Генерирует каталог заданий.
 */
function generateKatalog() {
    const state = initializeCatalogState();
    
    for (const category in nabor.upak) {
        processCategory(category, state);
    }

    renderCatalog(state);
    finalizeCatalogGeneration(state.actionsArray);
}

/**
 * Инициализирует состояние для генерации каталога
 * @returns {Object} Состояние каталога
 */
function initializeCatalogState() {
    return {
        htmlContent: '',
        tableOfContents: '',
        actionsArray: [],
        lineBreak: '<br/>'
    };
}

/**
 * Обрабатывает одну категорию заданий
 * @param {string} category - Категория
 * @param {Object} state - Состояние каталога
 */
function processCategory(category, state) {
    resetCategoryState();
    executeCategoryScheduler(category);
    addCategoryHeader(category, state);
    addCategoryTasks(category, state);
    closeCategory(state);
}

/**
 * Сбрасывает состояние для новой категории
 */
function resetCategoryState() {
    window.comment = '';
    window.availableTaskNumbers = null;
}

/**
 * Выполняет планировщик категории
 * @param {string} category - Категория
 */
function executeCategoryScheduler(category) {
    try {
        if (nabor.upak[category] && nabor.upak[category][nabor.scheduler]) {
            nabor.upak[category][nabor.scheduler]();
        }
    } catch (e) {
        console.error(`Ошибка в планировщике категории ${category}:`, e);
    }
}

/**
 * Добавляет заголовок категории
 * @param {string} category - Категория
 * @param {Object} state - Состояние каталога
 */
function addCategoryHeader(category, state) {
    state.htmlContent += buildCategoryHeader(category);
    state.tableOfContents += buildCategoryTocLink(category, state.lineBreak);
}

/**
 * Строит HTML заголовка категории
 * @param {string} category - Категория
 * @returns {string} HTML
 */
function buildCategoryHeader(category) {
    return `
        <button class="spoiler-show">Показать категорию ${category}</button>
        <button class="spoiler-hide">Скрыть категорию ${category}</button>
        <div class="spoiler-body">
            <h1 id="${category}">Категория ${category}</h1>
            ${window.comment || ''}
    `;
}

/**
 * Строит ссылку в оглавлении
 * @param {string} category - Категория
 * @param {string} lineBreak - Разделитель
 * @returns {string} HTML ссылки
 */
function buildCategoryTocLink(category, lineBreak) {
    return `<a href="#${category}">${category}. ${window.comment || ''}</a>${lineBreak}`;
}

/**
 * Добавляет все задания категории
 * @param {string} category - Категория
 * @param {Object} state - Состояние каталога
 */
function addCategoryTasks(category, state) {
    const tasksToList = getTasksForCategory(category);
    
    for (const taskNumber of tasksToList) {
        if (isTaskIncludable(taskNumber)) {
            state.htmlContent += generateHtmlForTask(category, taskNumber, state.actionsArray);
        }
    }
}

/**
 * Получает список заданий для категории
 * @param {string} category - Категория
 * @returns {Array} Массив номеров заданий
 */
function getTasksForCategory(category) {
    return window.availableTaskNumbers || Object.keys(nabor.upak[category] || {});
}

/**
 * Проверяет, нужно ли включать задание
 * @param {string} taskNumber - Номер задания
 * @returns {boolean}
 */
function isTaskIncludable(taskNumber) {
    return taskNumber !== 'main' && taskNumber !== 'fipi';
}

/**
 * Закрывает блок категории
 * @param {Object} state - Состояние каталога
 */
function closeCategory(state) {
    state.htmlContent += '</div>';
}

/**
 * Рендерит каталог в DOM
 * @param {Object} state - Состояние каталога
 */
function renderCatalog(state) {
    const element = $('#divrez');
    if (!element.length) {
        console.error('Элемент #divrez не найден');
        return;
    }
    element.html(state.tableOfContents + state.lineBreak + state.htmlContent);
}

/**
 * Завершает генерацию каталога
 * @param {Array} actionsArray - Массив действий
 */
function finalizeCatalogGeneration(actionsArray) {
    executeDeferredActions(actionsArray);
    triggerMathJaxRendering();
    afterTasksGenerated();
    expandAllCategories();
}

/**
 * Выполняет отложенные действия
 * @param {Array} actionsArray - Массив действий
 */
function executeDeferredActions(actionsArray) {
    actionsArray.forEach(action => {
        try {
            if (typeof action === 'function') {
                action();
            }
        } catch (e) {
            console.error('Ошибка выполнения отложенного действия:', e);
        }
    });
}

/**
 * Запускает рендеринг MathJax
 */
function triggerMathJaxRendering() {
    if (window.MathJax && MathJax.Hub) {
        MathJax.Hub.Typeset();
    }
}

/**
 * Разворачивает все категории
 */
function expandAllCategories() {
    $('.spoiler-show').click();
}


// ============================================================================
// ФУНКЦИИ ПОСТ-ГЕНЕРАЦИОННОЙ ОБРАБОТКИ
// ============================================================================

/**
 * Выполняет действия после генерации заданий.
 */
function afterTasksGenerated() {
    if (typeof spoiler === 'function') {
        spoiler();
    }
    initializeAllButtons();
}

/**
 * Инициализирует все кнопки
 */
function initializeAllButtons() {
    initializeButton('.copybutton', copyTask);
    initializeButton('.renewbutton', renewTask);
    initializeButton('.addbutton', addTask);
}

/**
 * Инициализирует конкретный тип кнопок
 * @param {string} selector - CSS селектор
 * @param {Function} handler - Обработчик события
 */
function initializeButton(selector, handler) {
    $(`${selector}[data-already-inited!=true]`)
        .click(handler)
        .attr('data-already-inited', true);
}


// ============================================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================================================

/**
 * Копирует задание в буфер обмена.
 * @param {Event} event - Событие
 */
function copyTask(event) {
    const button = event.currentTarget;
    const taskData = parseTaskDataFromButton(button);
    if (!taskData) return;

    processTaskWithCanvas(button, taskData, (processedTaskData) => {
        const fillerCode = createFiller(processedTaskData);
        copyToClipboard(fillerCode);
    });
}

/**
 * Парсит данные задания из атрибута кнопки
 * @param {HTMLElement} button - Кнопка
 * @returns {Object|null} Распарсенные данные или null
 */
function parseTaskDataFromButton(button) {
    const encodedData = button.getAttribute('data-task');
    if (!encodedData) {
        console.error('Атрибут data-task не найден');
        return null;
    }

    try {
        const decodedData = decodeURIComponent(encodedData);
        return JSON.parse(decodedData);
    } catch (e) {
        console.error('Ошибка парсинга данных задания:', e);
        return null;
    }
}

/**
 * Обрабатывает задание с canvas
 * @param {HTMLElement} button - Кнопка
 * @param {Object} taskData - Данные задания
 * @param {Function} callback - Функция обратного вызова
 */
function processTaskWithCanvas(button, taskData, callback) {
    const taskWrapper = findTaskWrapper(button);
    if (!taskWrapper) {
        callback(taskData);
        return;
    }

    if (typeof replaceCanvasWithImgInTaskAndHTML === 'function') {
        replaceCanvasWithImgInTaskAndHTML(taskWrapper, taskData, () => callback(taskData));
    } else {
        callback(taskData);
    }
}

/**
 * Находит обертку задания
 * @param {HTMLElement} element - Элемент внутри задания
 * @returns {HTMLElement|null} Обертка задания
 */
function findTaskWrapper(element) {
    return $(element).closest('div.task-wrapper')[0] || null;
}

/**
 * Обновляет задание на новое.
 * @param {Event} event - Событие
 */
function renewTask(event) {
    replaceTask(event.currentTarget, 'replace');
}

/**
 * Добавляет новое задание после текущего.
 * @param {Event} event - Событие
 */
function addTask(event) {
    replaceTask(event.currentTarget, 'after');
}

/**
 * Заменяет или добавляет задание
 * @param {HTMLElement} button - Кнопка
 * @param {string} mode - Режим: 'replace' или 'after'
 */
function replaceTask(button, mode) {
    const taskWrapper = findTaskWrapper(button);
    if (!taskWrapper) {
        console.error('Обертка задания не найдена');
        return;
    }

    const { category, taskNumber } = extractTaskInfo(taskWrapper);
    if (!category || !taskNumber) {
        console.error('Не удалось получить информацию о задании');
        return;
    }

    const actions = [];
    const taskHtml = generateNewTaskHtml(category, taskNumber, actions);
    
    insertTaskInDom(taskWrapper, taskHtml, mode);
    finalizeTaskInsertion(taskHtml, actions);
}

/**
 * Извлекает информацию о задании из обертки
 * @param {HTMLElement} taskWrapper - Обертка задания
 * @returns {Object} Информация о задании
 */
function extractTaskInfo(taskWrapper) {
    return {
        category: taskWrapper.getAttribute('data-category'),
        taskNumber: taskWrapper.getAttribute('data-tasknumber')
    };
}

/**
 * Генерирует HTML для нового задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {Array} actionsArray - Массив действий
 * @returns {jQuery} jQuery объект с HTML
 */
function generateNewTaskHtml(category, taskNumber, actionsArray) {
    const htmlString = generateHtmlForTask(category, taskNumber, actionsArray);
    return $(htmlString);
}

/**
 * Вставляет задание в DOM
 * @param {HTMLElement} taskWrapper - Текущая обертка
 * @param {jQuery} taskHtml - HTML нового задания
 * @param {string} mode - Режим вставки
 */
function insertTaskInDom(taskWrapper, taskHtml, mode) {
    if (mode === 'replace') {
        $(taskWrapper).replaceWith(taskHtml);
    } else if (mode === 'after') {
        taskHtml.insertAfter(taskWrapper);
    }
}

/**
 * Завершает вставку задания
 * @param {jQuery} taskHtml - HTML нового задания
 * @param {Array} actionsArray - Массив действий
 */
function finalizeTaskInsertion(taskHtml, actionsArray) {
    executeDeferredActions(actionsArray);
    triggerMathJaxRenderingForElement(taskHtml[0]);
    afterTasksGenerated();
}

/**
 * Запускает рендеринг MathJax для элемента
 * @param {HTMLElement} element - Элемент
 */
function triggerMathJaxRenderingForElement(element) {
    if (window.MathJax && MathJax.Hub) {
        MathJax.Hub.Typeset(element);
    }
}

