(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let randPartOf100 = sl(0, 5);
        let coniferousOrDeciduous = ['хвойные', 'лиственные'][rand];
        let deciduousTrees = [100 - sl(1, 99, 1), 50 - sl(1, 49, 1), 25 - sl(1, 24, 1), 20 - sl(1, 19, 1), 10 - sl(1, 9, 1), 5 - sl(1, 4, 1)][randPartOf100];
        let coniferousTrees = [100 - deciduousTrees, 50 - deciduousTrees, 25 - deciduousTrees, 20 - deciduousTrees, 10 - deciduousTrees, 5 - deciduousTrees][randPartOf100];

        genAssertIrreducible(deciduousTrees, coniferousTrees, 'части отношения у хвойных и лиственных имеют общие множители по мимо 1');
        let percent = ([coniferousTrees, deciduousTrees][rand] / (coniferousTrees + deciduousTrees)) * 100;

        NAtask.setTask({
            text:
            'Число хвойных деревьев в парке относится к числу лиственных как ' + coniferousTrees + ':' + deciduousTrees + '. Других деревьев в парке нет. Сколько процентов деревьев в парке составляют ' + coniferousOrDeciduous + 'ые?',
            answers: percent,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512711
//zer00player
