
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let mallName = ['Сладкий мир', 'Сладкоежка', 'Конфетный Король', 'Мамин пекарь', 'Пряничный домик'].iz();
        let name = om.femaleNames.iz();
        let pastry = sklonlxkand(['булочка', 'пончик', 'пирожок', 'ватрушка', 'пампушка', 'пышка', 'пирог'].iz(3));

        let pastryPrice = sl(50, 120);
        let toffeePrice = sl(90, 250);
        let juicePrice = sl(30, 150);
        let juiceCount = sl(2, 5);

        let total = pastryPrice + toffeePrice + juiceCount * juicePrice;

        NAtask.setTask({
            text:
                name.toZagl() + ' купила в магазине «' + mallName + '» ' + pastry[0].ve + ' за ' + chislitlx(pastryPrice, 'рубль', 'v$') + ', ' +
                pastry[1].ve + ' за ' + chislitlx(toffeePrice, 'рубль', 'v$') +
                ' и ' + chislitlx(juiceCount, pastry[2].ie, 'v$') + '. После оплаты ей пришло сообщение, что с карты было списано ' +
                chislitlx(total, 'рубль', 'v$') + '. Какова цена одно'+['го','й'][pastry[2].rod]+' ' + pastry[2].re + '? Ответ дайте в рублях.',
            answers: juicePrice,
        });
    }, 100);
})();

//3601478
//Открытый банк заданий 36F446
//zer00player


