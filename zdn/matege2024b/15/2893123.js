(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '2893123';
        let preference = ['fixed_ratio', 'random_ratio'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let smallPrice = sl(2000, 5000);
        let firstRatio = slKrome([1, 2], 0.2, 2.5, 0.1);
        let secondRatio = slKrome([1, 2, firstRatio], 0.2, 2.5, 0.05);
        let percent = sl(10, 35);
        let discountFactor = 1 - percent / 100;

        let totalBeforeDiscount = smallPrice * (1 + firstRatio + firstRatio * [firstRatio, secondRatio][rand]);
        let totalCost = totalBeforeDiscount * discountFactor;

        genAssertZ1000(totalCost / 10, "Итоговая стоимость должна иметь не более двух знаков после запятой");

        NAtask.setTask({
            text: 'В магазине дизайнерских сумок проходит акция. При покупке одновременно трёх сумок: ' +
                'большой, средней и маленькой, можно получить скидку $' + percent + '\\%$ на каждую. ' +
                'Маленькая сумка стоит ' + chislitlx(smallPrice, 'рубль', 'v$') + ', ' +
                'цена средней сумки в $' + firstRatio + '$ раза больше цены маленькой сумки, ' +
                'а цена большой сумки в $' + [firstRatio, secondRatio][rand] + '$ раза больше цены средней. ' +
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
