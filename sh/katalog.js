'use strict';

/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(category, taskNumber, actionsArray) {
	let htmlContent = '';
	vopr.podg();
	const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;

	try {
		nabor.upak[category][taskNumber]();

		const variants = getTaskVariants(taskNumber);
		
		for (let i = 0; i < variants.length; i++) {
			const originalPreferences = window.nabor.preferences ? {...window.nabor.preferences} : {};
			const originalVopr = {...vopr};
			
			try {
				applyVariantPreferences(taskNumber, variants[i]);

				nabor.upak[category][taskNumber]();

				htmlContent += generateVariantWrapper(category, taskNumber, currentTaskPath, variants, i, actionsArray);

			} finally {
				restoreVariantState(taskNumber, originalPreferences, originalVopr);
			}
		}
	} catch (e) {
		console.error(e);
		htmlContent += generateErrorHtml(category, taskNumber, e);
	}

	return htmlContent;
}

/**
 * Получает варианты задания на основе предпочтений
 * @param {string} taskNumber - Номер задания
 * @returns {Array} Массив вариантов
 */
function getTaskVariants(taskNumber) {
	let variants = [null]; // Default case - single variant
	
	let hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
	
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
 * Восстанавливает состояние после генерации варианта
 * @param {string} taskNumber - Номер задания
 * @param {Object} originalPreferences - Исходные предпочтения
 * @param {Object} originalVopr - Исходное состояние vopr
 */
function restoreVariantState(taskNumber, originalPreferences, originalVopr) {
	if (window.nabor.preferences) {
		window.nabor.preferences[taskNumber] = originalPreferences[taskNumber];
	}
	
	Object.keys(originalVopr).forEach(key => {
		if (vopr[key] !== originalVopr[key]) {
			vopr[key] = originalVopr[key];
		}
	});
}

/**
 * Генерирует обертку для варианта задания
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {string} currentTaskPath - Путь к заданию
 * @param {Array} variants - Массив вариантов
 * @param {number} index - Индекс текущего варианта
 * @param {Array} actionsArray - Массив действий
 * @returns {string} HTML варианта
 */
function generateVariantWrapper(category, taskNumber, currentTaskPath, variants, index, actionsArray) {
	let html = '';
	
	html += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
	html += currentTaskPath.vTag('h2');

	if (variants.length > 1 || hasExplicitPreferences(taskNumber)) {
		html += generateVariantInfo(taskNumber, variants[index]);
	}

	vopr.template = currentTaskPath.replace(/^(\.\.\/)+/, '');
	vopr.taskNumber = category;
	html += `<br/>${vopr.txt.vTag('div')}<br/>`;
	html += generateTaskControls(actionsArray);
	
	if (vopr.rsh) {
		html += generateSolutionHtml();
	}

	if (vopr.authors && vopr.authors.length) {
		html += generateAuthorsHtml();
	}

	html += '</div>';
	
	return html;
}

/**
 * Проверяет наличие явных предпочтений
 * @param {string} taskNumber - Номер задания
 * @returns {boolean}
 */
function hasExplicitPreferences(taskNumber) {
	return window.nabor.preferences && window.nabor.preferences[taskNumber];
}

/**
 * Генерирует информацию о варианте
 * @param {string} taskNumber - Номер задания
 * @param {any} variant - Текущий вариант
 * @returns {string} HTML с информацией о варианте
 */
function generateVariantInfo(taskNumber, variant) {
	const currentVariation = [taskNumber];
	if (Array.isArray(variant)) {
		currentVariation.push(variant.join('_'));
		currentVariation.push(variant.join(' '));
	} else {
		currentVariation.push(variant, variant);
	}
	return `<div class="variant-info">Вариация: '${currentVariation.join(' ')}'</div>`;
}

/**
 * Генерирует HTML с кнопками управления и ответом
 * @param {Array} actionsArray - Массив действий
 * @returns {string} HTML
 */
function generateTaskControls(actionsArray) {
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
 * Генерирует HTML с информацией об авторах
 * @returns {string} HTML
 */
function generateAuthorsHtml() {
	return `
		<br/>
		<div class="katalog-authors">
			Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;${vopr.authors.join(', ')}
		</div>
		<br/>
	`;
}

/**
 * Генерирует HTML при ошибке
 * @param {string} category - Категория
 * @param {string} taskNumber - Номер задания
 * @param {Error} error - Объект ошибки
 * @returns {string} HTML с сообщением об ошибке
 */
function generateErrorHtml(category, taskNumber, error) {
	return `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
		Error generating task: ${error.message}
	</div>`;
}
