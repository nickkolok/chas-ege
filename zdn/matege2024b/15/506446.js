(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let randUpgrade = sl1();
        let nameOfCompany = ['Вершки да Корешки', 'Одичалая Ягода', 'Вкуснее некуда', 'по Ведёрочку', 'Винни и Бинни', 'Сладкая Жизнь', 'Как у Бабушки', 'Счастливый Дачник', 'Крестьянская Революция', 'Как в Союзе!', 'Новые Технологии', 'Вегатерианец', 'Сто Пудов'].iz();
        let nameOfCulture = sklonlxkand(['пшеница', 'рожь', 'кукуруза', 'овёс', 'ячмень', 'горох', 'фасоль', 'свекла'].iz(2));
        let firstCulture = sl(1, 10, 1);
        let secondCulture = slKrome([firstCulture], 1, 10, 1);
        let howManyHectares = (firstCulture + secondCulture) * sl(2, 200, 1);

        genAssertIrreducible(firstCulture, secondCulture, 'части отношения у первого посева и второго посева имеют общие множители по мимо 1');
        let result = (howManyHectares / (firstCulture + secondCulture)) * [firstCulture, secondCulture][rand];
        NAtask.setTask({
            text:
                'Площадь земель фермерского хозяйства "' + nameOfCompany + '", отведённых под посадку сельскохозяйственных культур, ' +
                ['составляет ' + howManyHectares + ' га и ', ''][randUpgrade] + 'распределена между ' + nameOfCulture[0].te + ' и ' + nameOfCulture[1].te +
                '  в отношении ' + firstCulture + ':' + secondCulture + ' соответственно.' +
                [' Сколько гектаров занимает ' + [nameOfCulture[0].ie, nameOfCulture[1].ie][rand] + '?', ' Сколько гектаров занимает поле, если площадь земель, отведённых под посадку '
                    + [nameOfCulture[0].re, nameOfCulture[1].re][rand] + ', составляет ' + result + ' га?'][randUpgrade],
            answers: [result, howManyHectares][randUpgrade],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506446
//zer00player
