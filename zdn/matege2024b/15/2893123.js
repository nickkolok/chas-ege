(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '2893123';
        let preference = ['same_ratio', 'random_ratio'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let smallPrice = sl(2000, 5000);
        let firstRatio = slKrome([2], 1.1, 2.5, 0.1);
        let secondRatio = [firstRatio, slKrome([2, firstRatio], 1.1, 2.5, 0.1)][rand];
        let percent = sl(10, 35);
        let discountFactor = 1 - percent / 100;

        let totalBeforeDiscount = smallPrice * (1 + firstRatio + firstRatio * secondRatio);
        let totalCost = totalBeforeDiscount * discountFactor;

        genAssertAlmostInteger(totalCost, "Итоговая стоимость должна быть целой");

        NAtask.setTask({
            text: 'В магазине дизайнерских сумок проходит акция. При покупке одновременно трёх сумок: ' +
                'большой, средней и маленькой, можно получить скидку $' + percent + '\\%$ на каждую. ' +
                'Маленькая сумка стоит ' + chislitlx(smallPrice, 'рубль', 'v$') + ', ' +
                'цена средней сумки в $' + firstRatio + '$ раза больше цены маленькой сумки, ' +
                'а цена большой сумки в $' + secondRatio + '$ раза больше цены средней. ' +
                'Сколько будут стоить три сумки со скидкой? Ответ дайте в рублях.',
            answers: totalCost,
            preference: preference,
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 1000);
})();
//2893123
//Открытый банк заданий 2C2543
//zer00player
