(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let randUpgrade = sl(0, 1);
        let randPartOf100 = sl(0, 5);
        let coniferousOrDeciduous = sklonlxkand(['говядина', 'свинина', 'кролик', 'курица', 'индейка', 'козлина', 'конину', 'буйволятина',
            'оленина', 'цыплёнок', 'верблюжатина', 'цесарка', 'треска', 'судак', 'горбуша', 'минтай', 'карп',].iz(2));
        let firstMeat = [100 - sl(1, 99, 1), 50 - sl(1, 49, 1), 25 - sl(1, 24, 1), 20 - sl(1, 19, 1), 10 - sl(1, 9, 1), 5 - sl(1, 4, 1)][randPartOf100];
        let secondMeat = [100 - firstMeat, 50 - firstMeat, 25 - firstMeat, 20 - firstMeat, 10 - firstMeat, 5 - firstMeat][randPartOf100];

        genAssertIrreducible(firstMeat, secondMeat, 'части отношения у первого типа мяса и второго имеют общие множители по мимо 1');
        let percent = ([secondMeat, firstMeat][rand] / (secondMeat + firstMeat)) * 100;

        NAtask.setTask({
            text:
                'Для приготовления фарша взяли ' + coniferousOrDeciduous[0].ve + ' и ' + coniferousOrDeciduous[1].ve + [' в отношении ' + firstMeat + ':' + secondMeat + '.', ''][randUpgrade] +
                [' Какой процент в фарше составляет ' + coniferousOrDeciduous[1].ie + '?',
                '. Процент ' + coniferousOrDeciduous[1].re + ' в фарше составляет ' + percent + '%. ' + 'Какое соотношение в фарше между ' +
                coniferousOrDeciduous[0].te + ' и ' + coniferousOrDeciduous[1].te + '?'][randUpgrade],
            answers: [percent, firstMeat + ':' + secondMeat][randUpgrade],
        });
    }, 100);
})();
//https://math-oge.sdamgia.ru/test?likes=317937
//zer00player
я
