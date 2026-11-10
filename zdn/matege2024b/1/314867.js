
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        // Две формулировки одной задачи про счётчик воды (раньше - два шаблона,
        // 314867 и 318413): «В квартире, где проживает Леонид… счётчик показывал
        // расход… Какую сумму должен заплатить Леонид…» и безличная «Показания
        // счётчика… составляли… Сколько нужно заплатить…». Данные у каждой - свои,
        // как было в исходных шаблонах.
        let key = '314867';
        let preference = ['personal', 'impersonal'];
        let personal = getSelectedPreferenceFromList(key, preference) === 0;

        // Всё считаем в целых: показания - в десятых куб. м, цена - в копейках,
        // чтобы ответ не получал «хвостов» вида 1707,6500000001
        let reading1, used, rub, kop;
        if (personal) {
            // Показание - целое от 100 до 1200, расход - от 1,5 до 15 куб. м с шагом 0,1,
            // цена - от 50 до 150 руб. и от 10 до 90 коп.
            reading1 = 10 * sl(100, 1200);
            used = sl(15, 150);
            rub = sl(50, 150);
            kop = sl(1, 9) * 10;
        } else {
            // Показания - от 10 до 999 куб. м, возможно с одним знаком после запятой
            // (одинаковым у обоих), расход - целый, от 2 до 20 куб. м,
            // цена - от 10 до 300 руб., копейки - не всегда
            reading1 = 10 * sl(10, 999) + (sl1() ? sl(1, 9) : 0);
            used = 10 * sl(2, 20);
            rub = sl(10, 300);
            kop = sl1() ? sl(1, 9) * 10 : 0;
        }
        let reading2 = reading1 + used;
        let priceKop = 100 * rub + kop;
        let answer = used * priceKop / 1000;

        let money = function (r, k) {
            return '$' + r + '$ руб.' + (k ? (personal ? ' и ' : ' ') + '$' + k + '$ коп.' : '');
        };

        let water = ['горячей', 'холодной'].iz();
        let monthIndex = sl(0, 11);
        let month1 = om.months[monthIndex];
        let month2 = om.months[(monthIndex + 1) % 12];
        // «$1$ марта», «$1$ апреля»
        let date1 = chislitlx(1, month1, 'r$');
        let date2 = chislitlx(1, month2, 'r$');

        let text;
        if (personal) {
            let name = om.maleNames.iz();
            text = 'В квартире, где проживает ' + name + ', установлен прибор учёта расхода ' + water + ' воды (счётчик). ' +
                date1 + ' счётчик показывал расход $' + reading1 / 10 + '$ куб. м воды, а ' + date2 +
                ' — $' + reading2 / 10 + '$ куб. м. Какую сумму должен заплатить ' + name + ' за ' + month1 +
                ', если цена одного куб. м ' + water + ' воды составляет ' + money(rub, kop) + '? Ответ дайте в рублях.';
        } else {
            text = 'В квартире установлен прибор учёта расхода ' + water + ' воды (счётчик). ' +
                'Показания счётчика ' + date1 + ' составляли $' + reading1 / 10 + '$ куб. м воды, а ' + date2 +
                ' — $' + reading2 / 10 + '$ куб. м. Сколько нужно заплатить за ' + (water === 'горячей' ? 'горячую' : 'холодную') +
                ' воду за ' + month1 + ', если стоимость 1 куб. м ' + water + ' воды составляет ' + money(rub, kop) +
                '? Ответ дайте в рублях.';
        }

        let price = priceKop / 100;
        let analys = 'За ' + month1 + ' израсходовано $' + reading2 / 10 + ' - ' + reading1 / 10 + ' = ' + used / 10 +
            '$ куб. м воды. Один кубометр стоит $' + price + '$ руб., поэтому заплатить нужно $' + used / 10 + ' \\cdot ' + price +
            ' = ' + answer + '$ руб.';

        NAtask.setTask({
            text: text,
            answers: answer,
            analys: analys,
            authors: ['zer00player', 'chas-ege-selena', 'chas-ege-ellariya'],
            preference: [preference],
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=314867
//zer00player, chas-ege-selena, chas-ege-ellariya
//318413


