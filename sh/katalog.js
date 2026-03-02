'use strict';

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
