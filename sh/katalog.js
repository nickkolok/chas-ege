/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
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
        // Execute the task generator
        nabor.upak[category][taskNumber]();

        // Handle variations if preferences exist
        let variants = [null]; // Default case - single variant
        if (vopr.preference && Array.isArray(vopr.preference) && vopr.preference.length > 0) {
            variants = generateVariations(vopr.preference);
        }

        // Generate HTML for each variant
        for (let i = 0; i < variants.length; i++) {
            if (variants[i] !== null) {
                // Set preferences for this variant
                window.nabor.preferences = window.nabor.preferences || {};
                window.nabor.preferences[taskNumber] = variants[i];
                // Regenerate task with new preferences
                nabor.upak[category][taskNumber]();
            }

            htmlContent += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
            htmlContent += currentTaskPath.vTag('h2');

            if (variants.length > 1) {
                const currentVariation = Array.isArray(variants[i])
                    ? variants[i].join(', ')
                    : variants[i][0];
                htmlContent += `<div class="variant-info">Вариация: ${currentVariation}</div>`;
            }

            vopr.template = currentTaskPath.replace(/^(\.\.\/)+/, '');
            vopr.taskNumber = category;
            htmlContent += `<br/>${vopr.txt.vTag('div')}<br/>`;
            htmlContent += `
                <div>
                    <button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
                    <button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
                    <button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
                    Ответ: ${vopr.ver.join('или')}
                </div>
                <br/>
            `;

            if (vopr.dey) {
                actionsArray.push(vopr.dey);
            }

            if (vopr.rsh) {
                htmlContent += `
                    <button class="spoiler-show">Показать решение</button>
                    <button class="spoiler-hide">Скрыть решение</button>
                    <div class="spoiler-body">Решение: <br/>${vopr.rsh}</div>
                `;
            }

            if (vopr.authors && vopr.authors.length) {
                htmlContent += `
                    <br/>
                    <div class="katalog-authors">
                        Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;${vopr.authors.join(', ')}
                    </div>
                    <br/>
                `;
            }

            htmlContent += '</div>';
        }
    } catch (e) {
        console.error(e);
        htmlContent += `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
            Error generating task: ${e.message}
        </div>`;
    }

    return htmlContent;
}
