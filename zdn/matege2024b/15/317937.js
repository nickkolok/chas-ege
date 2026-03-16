(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '317937';
        let preference1 = ['findFirstMeat', 'findSecondMeat'];
        let preference2 = ['sumPart100', 'sumPart50', 'sumPart25', 'sumPart20', 'sumPart10', 'sumPart5'];
        let rand = getSelectedPreferenceFromList(key, preference1);
        let randPartOf100 = getSelectedPreferenceFromList(key, preference2);
        let coniferousOrDeciduous = sklonlxkand(['говядина', 'свинина', 'курица', 'индейка', 'козлина', 'конина', 'буйволятина',
            'оленина', 'верблюжатина', 'цесарка', 'треска', 'горбуша', 'минтай',].iz(2));
        let meat = [100, 50, 25, 20, 10, 5][randPartOf100];
        let firstMeat = sl(1, meat - 1, 1);
        let secondMeat = meat - firstMeat;

        genAssertIrreducible(firstMeat, secondMeat, 'части отношения у первого типа мяса и второго имеют общие множители по мимо 1');
        let percent = ([firstMeat, secondMeat][rand] / (secondMeat + firstMeat)) * 100;

        NAtask.setTask({
            text:
                'Для приготовления фарша взяли ' + coniferousOrDeciduous[0].ve + ' и ' + coniferousOrDeciduous[1].ve +
                ' в отношении ' + firstMeat + ':' + secondMeat + '.' +
                ' Какой процент в фарше составляет ' + [coniferousOrDeciduous[0], coniferousOrDeciduous[1]][rand].ie + '?',
            answers: percent,
            preference: [preference1, preference2],
        });
    }, 100);
})();
//https://math-oge.sdamgia.ru/test?likes=317937
//zer00player
