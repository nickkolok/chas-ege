(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '489499';
        let preference = ['samePercent', 'differentPercent'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let pantsPrice = sl(4000, 6000, 100);
        let percentFirst = sl(10, 35);
        let percentSecond = [percentFirst, slKrome([percentFirst], 10, 35)][rand];

        let totalCost = pantsPrice * (3 + (percentFirst - percentSecond) / 100);

        genAssertZ1000(totalCost / 10, "Стоимость должна быть до двух знаков после запятой");

        NAtask.setTask({
            text: 'Мужской костюм состоит из брюк, жилета и пиджака. ' +
                'Пиджак дороже брюк на $' + percentFirst + '\\%$, а жилет дешевле брюк на $' + percentSecond + '\\%$. ' +
                'Сколько стоит мужской костюм, если брюки стоят ' + chislitlx(pantsPrice, 'рубль', 'v$') + '? ' +
                'Ответ дайте в рублях.',
            answers: totalCost,
            preference: preference,
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 1000);
})();
//489499
//Открытый банк заданий 07781B
//zer00player
