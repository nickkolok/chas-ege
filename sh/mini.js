let slvopr;

/**
 * Обновляет содержимое элемента и выполняет типографику.
 * @param {Object} p1 - Объект с текстом и функцией отрисовки.
 */
function obnov(p1) {
    slvopr = p1;
    $('#pole').html(slvopr.txt);
    slvopr.trd();
    MathJax.Hub.Typeset();
    setTimeout(() => MathJax.Hub.Typeset(), 5000); // Костыль, на случай, если не отрисовалось
}

let currentZdn = '';

/**
 * Создает новое задание и настраивает интерфейс.
 */
function sozdat() {
    $('#pole').html('Задание составляется, подождите...');
    try {
        currentZdn = parsedJSON.mini.src.iz();
        zagr(currentZdn);
    } catch (e) {
        $('#pole').text('Не удалось выделить адреса шаблонов.');
        $('#panel').hide();
    }
    dvig.flObn = 0;
    dvig.startxt = window.vopr.txt;
    dvig.obnov(obnov);

    if (!checkJQuery('sozdat()', 'pole')) return;
    if (!checkMathJax('sozdat()', 'pole')) return;

    $('#protv').hide();
    $('#otv').val('');
    $('#prov').off('click').on('click', prover);
    $('#prov').show();
    $('#sozd').hide();
    $('#podob').hide();
}

/**
 * Проверяет правильность ответа и обновляет интерфейс.
 */
function prover() {
    let statisticalResponse = '';

    const kand = $('#otv').val();
    if (kand === '') {
        if (!confirm('Вы не ввели ответ, нажмите "Отмена" для того, чтобы ввести ответ или "ОК", чтобы сдаться и посмотреть ответ.')) {
            return;
        }
        statisticalResponse = 'N';
    }
    $('#protv').show();
    let txt = '';
    if (slvopr.vrn(kand)) {
        txt = 'Правильно!';
        statisticalResponse = 1;
    } else {
        txt = 'Неправильно! Правильный ответ: ' + slvopr.ver.join(' или ');
        if (statisticalResponse === '') {
            statisticalResponse = 0;
        }
    }
    if (vopr.rsh) {
        txt += '<br/><br/>' + vopr.rsh;
    }
    $('#protv').html(txt);
    MathJax.Hub.Typeset();
    $('#prov').hide();
    $('#sozd').show();
    specCounter('mini' + '#egeok'.esli(chas.mode.egeok) + '#' + currentZdn + ':' + statisticalResponse);
}

/**
 * Пытается создать задание, если MathJax загружен.
 */
function trysozd() {
    if (window.MathJax === undefined) {
        setTimeout(trysozd, 100);
    } else {
        sozdat();
    }
}

/**
 * Инициализирует начальные настройки интерфейса.
 */
const startShell = function () {
    $('#prov').hide();
    $(trysozd);
    allLinksToSpans();
    if (!chas.mode.egeok) {
        $('#check-yourself-strip').show().css({ 'background-color': '#999', 'color': 'white' });
    }
};
