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
		let htmlContent = '';
		vopr.podg();
		const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;

		// Execute the task generator
		nabor.upak[category][taskNumber]();
		htmlContent += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
		htmlContent += currentTaskPath.vTag('h2');
		vopr.template = currentTaskPath.replace(/^(\.\.\/)+/,'');
		vopr.taskNumber = category;
		htmlContent+=('<br/>'+vopr.txt.vTag('div')+'<br/>');
		htmlContent+=(
			(
				generateTaskControls() +
				'Ответ: '+vopr.ver.join('или')
			).vTag('div') +
			'<br/>'
		);
		actionsArray.push(vopr.dey);
		if(vopr.rsh) {
			htmlContent += generateSolutionHtml();
		}
		htmlContent += createAuthorsSection();
		htmlContent += '</div>';
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
 * Генерирует HTML с решением
 * @returns {string} HTML
 */
function generateSolutionHtml() {
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
