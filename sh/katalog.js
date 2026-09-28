'use strict';


/**
 * Получает варианты задания на основе предпочтений
 * @param {string} taskNumber - Номер задания
 * @returns {Array} Массив вариантов (каждый вариант - массив предпочтений или null)
 */
function getTaskVariants(taskNumber) {
	let variants = [null];
	const hasExplicitPreferences = window.nabor && window.nabor.preferences && window.nabor.preferences[taskNumber];
	
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
 * Сохраняет текущее состояние перед генерацией варианта
 * @param {string} taskNumber - Номер задания
 * @returns {Object} Сохраненное состояние
 */
function saveTaskState(taskNumber) {
	return {
		originalPreferences: window.nabor && window.nabor.preferences ? {...window.nabor.preferences} : {},
		originalVopr: {...vopr}
	};
}

/**
 * Восстанавливает состояние после генерации варианта
 * @param {string} taskNumber - Номер задания
 * @param {Object} state - Ранее сохраненное состояние
 */
function restoreTaskState(taskNumber, state) {
	if (window.nabor && window.nabor.preferences) {
		window.nabor.preferences[taskNumber] = state.originalPreferences[taskNumber];
	}
	
	Object.keys(state.originalVopr).forEach(key => {
		vopr[key] = state.originalVopr[key];
	});
}

/**
 * Применяет предпочтения для конкретного варианта
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Предпочтения варианта
 */
function applyVariantPreferences(taskNumber, variant) {
	if (variant !== null) {
		window.nabor = window.nabor || {};
		window.nabor.preferences = window.nabor.preferences || {};
		window.nabor.preferences[taskNumber] = variant;
	}
}

/**
 * Форматирует информацию о варианте для отображения
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
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(category, taskNumber, actionsArray) {
	try {
		const variants = getTaskVariants(taskNumber);
		let htmlContent = '';
		
		for (let i = 0; i < variants.length; i++) {
			const state = saveTaskState(taskNumber);
			
			try {
				applyVariantPreferences(taskNumber, variants[i]);
				
				let variantHtml = '';
				vopr.podg();
				const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;
				
				// Execute the task generator
				nabor.upak[category][taskNumber]();
				variantHtml += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
				
				// Показываем информацию о варианте, если их несколько
				if (variants.length > 1 || variants[i] !== null) {
					const variationInfo = formatVariantInfo(taskNumber, variants[i]);
					variantHtml += `<div class="variant-info">Вариация: '${variationInfo}'</div>`;
				}
				
				variantHtml += currentTaskPath.vTag('h2');
				vopr.template = currentTaskPath.replace(/^(\.\.\/)+/,'');
				vopr.taskNumber = category;
				variantHtml += ('<br/>'+vopr.txt.vTag('div')+'<br/>');
				variantHtml += (
					(
						generateTaskControls() +
						'Ответ: '+vopr.ver.join('или')
					).vTag('div') +
					'<br/>'
				);
				actionsArray.push(vopr.dey);
				variantHtml += createSolutionSection();
				variantHtml += createAuthorsSection();
				variantHtml += '</div>';
				
				htmlContent += variantHtml;
			} finally {
				restoreTaskState(taskNumber, state);
			}
		}
		
		return htmlContent;
	} catch(e) {
		return handleTaskError(category, taskNumber, e);
	}
}


// ============================================================================
// ОСНОВНЫЕ ФУНКЦИИ ГЕНЕРАЦИИ КАТАЛОГА
// ============================================================================

/**
 * Генерирует каталог заданий.
 */
function generateKatalog() {
	var rez='';
	var toc='';
	var masdey=[];
	var br='<br/>';
	for(var kat in nabor.upak) {
		resetCategoryState();
		executeCategoryScheduler(kat);
		rez += buildCategoryHeader(kat);
		toc += buildCategoryTocLink(kat, br);

		for(var zdn of getIncludableTasksForCategory(kat)) {
			rez += generateHtmlForTask(kat,zdn,masdey);
		}
		rez += '</div>';
	}
	$('#divrez').html(toc+br+rez);
	executeDeferredActions(masdey);
	triggerMathJaxRendering();
	afterTasksGenerated();
	$('.spoiler-show').click();
}

/**
 * Генерирует HTML с дополнительными кнопками
 * @returns {string} HTML
 */
function generateTaskControls() {
	return `
		<div>
			<button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
			<button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
			<button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
		</div>
		<br/>
	`;
}

/**
 * Создает секцию с решением
 * @returns {string} HTML
 */
function createSolutionSection() {
	if (!vopr.rsh) {
		return '';
	}

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
	if (!vopr.authors || !vopr.authors.length) {
		return '';
	}

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
 * Получает список заданий для категории, исключая служебные
 * @param {string} category - Категория
 * @returns {Array} Массив номеров заданий, готовых к включению
 */
function getIncludableTasksForCategory(category) {
	const tasks = window.availableTaskNumbers || Object.keys(nabor.upak[category] || {});
	return tasks.filter(taskNumber => taskNumber !== 'main' && taskNumber !== 'fipi');
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
 * Выполняет действия после генерации заданий.
 */
function afterTasksGenerated() {
	spoiler();
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

function copyTask() {
	console.log(this);
	//var theTask = this.getElementsByTagName('span')[0].innerHTML;
	var theTask = decodeURIComponent(this.getAttribute('data-task'));
	console.log(theTask);
	theTask = JSON.parse(theTask);
	console.log(theTask);
	replaceCanvasWithImgInTaskAndHTML($(this).parents('div.task-wrapper')[0], theTask, function() {
		var fillerCode = createFiller(theTask);
		copyToClipboard(fillerCode)
	});
}

function renewTask() {
	console.log(this);
	var wrapper = $(this).parents('div.task-wrapper')[0];
	var actions = [];
	var taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'),wrapper.getAttribute('data-tasknumber'),actions));
	$(wrapper).replaceWith(taskHtml);
	actions[0]();
	triggerMathJaxRendering(taskHtml[0]);
	afterTasksGenerated();
}

function addTask() {
	console.log(this);
	var wrapper = $(this).parents('div.task-wrapper')[0];
	var actions = [];
	var taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'),wrapper.getAttribute('data-tasknumber'),actions));
	taskHtml.insertAfter(wrapper);
	actions[0]();
	triggerMathJaxRendering(taskHtml[0]);
	afterTasksGenerated();
}

/**
 * Запускает рендеринг MathJax для элемента
 * @param {HTMLElement} element - элемент (необязательный параметр)
 */
function triggerMathJaxRendering(element) {
	if (window.MathJax && MathJax.Hub) {
		MathJax.Hub.Typeset(element);
	}
}
