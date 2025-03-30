(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let randPartOf100 = sl(0, 5);
        let coniferousOrDeciduous = ['хвойные', 'лиственные'][rand];
        let trees = [100, 50, 25, 20, 10, 5][randPartOf100];
        let deciduousTrees = sl(1, trees - 1);
        let coniferousTrees = trees - deciduousTrees;
        
        genAssertIrreducible(deciduousTrees, coniferousTrees, 'части отношения у хвойных и лиственных имеют общие множители по мимо 1');
        let percent = ([coniferousTrees, deciduousTrees][rand] / (coniferousTrees + deciduousTrees)) * 100;

        NAtask.setTask({
            text:
                'Число хвойных деревьев в парке относится к числу лиственных как ' + coniferousTrees + ':' + deciduousTrees +
                '. Других деревьев в парке нет. Сколько процентов деревьев в парке составляют ' + coniferousOrDeciduous + '?',
            answers: percent,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512711
//zer00player
