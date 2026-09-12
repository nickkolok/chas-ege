
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let reading1 = sl(10, 999, 1);
        let reading2 = reading1 + sl(2, 20, 1);

        let hasDecimal = sl(0, 1, 1);
        let decDigit = hasDecimal ? sl(1, 9, 1) : '';
        let reading1Str = reading1 + (hasDecimal ? ',' + decDigit : '');
        let reading2Str = reading2 + (hasDecimal ? ',' + decDigit : '');

        let typeOfWater = ['горячей', 'холодной'].iz();
        let waterAcc = typeOfWater === 'горячей' ? 'горячую' : 'холодную';

        let monthsGen = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        let monthsAcc = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

        let monthIndex = sl(0, 10, 1);
        let month1Gen = monthsGen[monthIndex];
        let month2Gen = monthsGen[monthIndex + 1];
        let month1Acc = monthsAcc[monthIndex];

        let priceInRuble = sl(10, 300, 1);
        let dopPriceInKopeki = sl(0, 1, 1) ? sl(1, 9, 1) * 10 : 0;

        let numberOfLiters = reading2 - reading1;
        let paymentForPurchase = numberOfLiters * (priceInRuble * 100 + dopPriceInKopeki) / 100;

        let priceText = priceInRuble + ' руб.';
        if (dopPriceInKopeki > 0) {
            priceText += ' ' + dopPriceInKopeki + ' коп.';
        }

        NAtask.setTask({
            text: 'В квартире установлен прибор учёта расхода ' + typeOfWater + ' воды (счётчик). Показания счётчика 1 ' + month1Gen +
            ' составляли $' + reading1Str + '$ куб. м воды, а 1 ' + month2Gen + ' — $' + reading2Str + '$ куб. м. ' +
            'Сколько нужно заплатить за ' + waterAcc + ' воду за ' + month1Acc + ', если стоимость 1 куб. м ' + typeOfWater +
            ' воды составляет ' + priceText + '? Ответ дайте в рублях.',
            answers: paymentForPurchase,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//https://ege.sdamgia.ru/problem?id=318413
//chas-ege-selena
