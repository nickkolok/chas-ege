let slvopr;
let currentZdn = '';

/**
 * Обновляет содержимое элемента и выполняет типографику.
 * @param {Object} p1 - Объект с текстом и функцией отрисовки.
 */
function obnov(p1) {
    slvopr = p1;
    $('#pole').html(slvopr.txt);
    slvopr.trd();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

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
        return;
    }
    dvig.flObn = 0;
    dvig.startxt = window.vopr.txt;
    dvig.obnov(obnov);

    if (!checkJQuery('sozdat()', 'pole') || !checkMathJax('sozdat()', 'pole')) return;

    $('#protv').hide();
    $('#otv').val('');
    $('#prov').off('click').on('click', prover).show();
    $('#sozd, #podob').hide();
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
    let txt = slvopr.vrn(kand) ? 'Правильно!' : `Неправильно! Правильный ответ: ${slvopr.ver.join(' или ')}`;
    statisticalResponse = slvopr.vrn(kand) ? 1 : 0;

    if (vopr.rsh) {
        txt += `<br/><br/>${vopr.rsh}`;
    }

    $('#protv').html(txt);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    $('#prov').hide();
    $('#sozd').show();
    specCounter(`mini#egeok${chas.mode.egeok ? '#egeok' : ''}#${currentZdn}:${statisticalResponse}`);
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
