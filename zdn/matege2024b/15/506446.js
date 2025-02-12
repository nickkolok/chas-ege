(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let nameOfCompany = ['Вершки да Корешки', 'Одичалая Ягода', 'Вкуснее некуда', 'по Ведёрочку', 'Винни и Бинни', 'Сладкая Жизнь', 'Как у Бабушки', 'Счастливый Дачник', 'Крестьянская Революция', 'Как в Союзе!', 'Новые Технологии', 'Вегатерианец', 'Сто Пудов'].iz();
        let nameOfCulture = sklonlxkand(['пшеница', 'рожь', 'кукуруза', 'овёс', 'ячмень', 'горох', 'фасоль', 'свекла'].iz(2));
        let firstCulture = sl(1, 10, 1);
        let secondCulture = slKrome([firstCulture], 1, 10, 1);
        let howManyHectares = (firstCulture + secondCulture) * sl(2, 200, 1);

        genAssert(firstCulture.nod(secondCulture) == 1, 'части отношения у первого посева и второго посева имеют общие множители по мимо 1');

        NAtask.setTask({
            text:
                'Площадь земель фермерского хозяйства "' + nameOfCompany + '", отведённых под посадку сельскохозяйственных культур, ' +
                'составляет ' + howManyHectares + ' га и распределена между ' + nameOfCulture[0].te + ' и ' + nameOfCulture[1].te +
                '  в отношении ' + firstCulture + ':' + secondCulture + ' соответственно.' +
                ' Сколько гектаров занимает ' + nameOfCulture[1].ie + '?',
            answers: howManyHectares / (firstCulture + secondCulture) * [secondCulture, firstCulture][rand],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506446
//zer00player
