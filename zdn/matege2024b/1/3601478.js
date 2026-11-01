
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '3601478';
        let preference = ['cookies', 'juice', 'pastries'];
        let variant = getSelectedPreferenceFromList(key, preference);

        let mallName = ['Сладкий мир', 'Сладкоежка', 'Конфетный Король', 'Мамин пекарь', 'Пряничный домик'].iz();
        let name = om.femaleNames.iz();
        let pastry = sklonlxkand(['булочка', 'пончик', 'пирожок', 'ватрушка', 'пампушка', 'пышка', 'пирог'].iz(3));

        let firstKnownPrice = sl(50, 120);
        let secondKnownPrice = sl(90, 250);
        let unitPrice = sl(30, 150);
        let count = sl(2, 5);

        let total = firstKnownPrice + secondKnownPrice + count * unitPrice;

        let purchases = [
            chislitlx(count, 'пачка', 'v$') + ' печенья, пакет сока стоимостью ' +
                chislitlx(firstKnownPrice, 'рубль', 'v$') + ' и упаковку фигурного мармелада за ' +
                chislitlx(secondKnownPrice, 'рубль', 'v$'),
            'бисквитное пирожное за ' + chislitlx(firstKnownPrice, 'рубль', 'v$') +
                ', упаковку ирисок за ' + chislitlx(secondKnownPrice, 'рубль', 'v$') +
                ' и ' + chislitlx(count, 'пакетик', 'v$') + ' фруктового сока',
            pastry[0].ve + ' за ' + chislitlx(firstKnownPrice, 'рубль', 'v$') + ', ' +
                pastry[1].ve + ' за ' + chislitlx(secondKnownPrice, 'рубль', 'v$') +
                ' и ' + chislitlx(count, pastry[2].ie, 'v$'),
        ][variant];

        let question = [
            'Сколько стоит одна пачка печенья?',
            'Какова цена одного пакетика фруктового сока?',
            'Какова цена одно' + ['го', 'й'][pastry[2].rod] + ' ' + pastry[2].re + '?',
        ][variant];

        NAtask.setTask({
            text:
                name.toZagl() + ' купила в магазине «' + mallName + '» ' + purchases +
                '. После оплаты ей пришло сообщение, что с карты было списано ' +
                chislitlx(total, 'рубль', 'v$') + '. ' + question + ' Ответ дайте в рублях.',
            answers: unitPrice,
            preference,
        });
    }, 100);
})();

//3601478
//Открытый банк заданий 36F446
//Открытый банк заданий B0D52F
//zer00player


