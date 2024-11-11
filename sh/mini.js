'use strict';

let currentTask = null;

/**
 * Обновляет содержимое поля с задачей.
 * @param {Object} task - Объект задачи.
 */
const updateTaskContent = (task) => {
    currentTask = task;
    $('#pole').html(currentTask.txt);
    currentTask.trd();
    MathJax.Hub.Typeset();
    // Костыль на случай, если не отрисовалось
    setTimeout(() => MathJax.Hub.Typeset(), 5000);
};

/**
 * Создает новую задачу.
 */
const createTask = () => {
    $('#pole').html('Задание составляется, подождите...');
    try {
        const taskSource = parsedJSON.mini.src.iz();
        loadTask(taskSource);
    } catch (error) {
        $('#pole').text('Не удалось выделить адреса шаблонов.');
        $('#panel').hide();
    }

    dvig.flObn = 0;
    dvig.startxt = window.vopr.txt;
    dvig.obnov(updateTaskContent);

    if (!checkJQuery('createTask', 'pole')) return;
    if (!checkMathJax('createTask', 'pole')) return;

    $('#protv').hide();
    $('#otv').val('');
    $('#prov').off('click').on('click', checkAnswer);
    $('#prov').show();
    $('#sozd').hide();
    $('#podob').hide();
};

/**
 * Проверяет ответ пользователя.
 */
const checkAnswer = () => {
    let statisticalResponse = '';

    const userAnswer = $('#otv').val();
    if (userAnswer === '') {
        if (!confirm('Вы не ввели ответ, нажмите "Отмена" для того, чтобы ввести ответ или "ОК", чтобы сдаться и посмотреть ответ.')) {
            return;
        }
        statisticalResponse = 'N';
    }

    $('#protv').show();
    let feedback = '';
    if (currentTask.vrn(userAnswer)) {
        feedback = 'Правильно!';
        statisticalResponse = 1;
    } else {
        feedback = `Неправильно! Правильный ответ: ${currentTask.ver.join(' или ')}`;
        if (statisticalResponse === '') {
            statisticalResponse = 0;
        }
    }

    if (vopr.rsh) {
        feedback += `<br/><br/>${vopr.rsh}`;
    }

    $('#protv').html(feedback);
    MathJax.Hub.Typeset();
    $('#prov').hide();
    $('#sozd').show();
    specCounter(`mini#egeok${chas.mode.egeok ? '#egeok' : ''}#${currentTask}: ${statisticalResponse}`);
};

/**
 * Пытается создать задачу, когда MathJax загружен.
 */
const tryCreateTask = () => {
    if (window.MathJax === undefined) {
        setTimeout(tryCreateTask, 100);
    } else {
        createTask();
    }
};

/**
 * Инициализирует начальные действия.
 */
const initializeShell = () => {
    $('#prov').hide();
    $(tryCreateTask);
    allLinksToSpans();
    if (!chas.mode.egeok) {
        $('#check-yourself-strip').show().css({ 'background-color': '#999', 'color': 'white' });
    }
};

initializeShell();
