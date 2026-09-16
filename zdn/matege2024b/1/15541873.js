(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let name = om.femaleNames.iz();
        let product = sklonlxkand('ломтик');
        let count = sl(3, 7);
        let given = sl(500, 1000, 100);

        let pricePerUnit = sl(30, 150);
        let totalSpent = count * pricePerUnit;
        let change = given - totalSpent;

        genAssert(change > 0, "Сдача не может быть отрицательной");

        NAtask.setTask({
            text:
                'Оплачивая на кассе покупку ' + chislitlx(count, 'молочных ' + product.ie, 'r$') + ', ' +
                name + ' с ' + chislitlx(given, 'рубль', 'r$') + ' получила сдачу ' +
                chislitlx(change, 'рубль', 'v$') + '. Сколько стоит один молочный ' + product.ie + '? Ответ дайте в рублях.',
            answers: pricePerUnit,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();

//15541873
//Открытый банк заданий ED2671
//zer00player
