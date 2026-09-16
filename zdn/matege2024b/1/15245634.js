(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let price = sl(20, 60);
        let budget = sl(200, 1000);

        let maxPacks = (budget / price).floor();

        genAssert(maxPacks > 2, "Слишком мало пачек задачи");

        genAssert(budget % price != 0, "бюджет на цену не должен делится нацело");
        
        let pack = sklonlxkand(['печенье', 'чай', 'ряженка', 'молоко', 'мука', 'вермишель'].iz());

        NAtask.setTask({
            text:
                'Пачка ' + pack.re + ' стоит ' + chislitlx(price, 'рубль', 'v$') +
                '. Какое наибольшее количество пачек ' + pack.re + ' можно купить на ' +
                chislitlx(budget, 'рубль', 'v$') + '?',
            answers: maxPacks,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//15245634
//Открытый банк заданий E8A142
//zer00player


