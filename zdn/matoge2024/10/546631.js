(function () {
    'use strict';
    retryWhileError(function () {

        let colors = om.trickyColors.iz(5);
        let c1 = sl(20, 40);
        let c2 = slKrome(c1, 20, 40);
        let c3 = slKrome(c1, slKrome(c2, 10, 30));
        let rest = sl(40, 100, 2);
        let total = c1 + c2 + c3 + rest;
        
        let probability = rest / total;
        
        let colorsGen = colors.slice(0,3).map(c => c.replace('ий', 'их').replace('ый', 'ых').replace('ой', 'ых'));
        let colorsNomPl = colors.slice(2,5).map(c => c.replace('ий', 'ие').replace('ый', 'ые').replace('ой', 'ые'));
        let colorsInstr = colors.slice(2,5).map(c => c.replace('ий', 'ей').replace('ый', 'ой'));

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'В магазине канцтоваров продаётся $' + total + '$ ручек: ' + '$' + c1 + '$ ' + colorsGen[0] + ', $' + c2 + '$ ' + colorsGen[1] + ', $' + c3 + '$ ' + colorsGen[2] + ', ' + 'остальные — ' + colorsNomPl[0] + ' и ' + colorsNomPl[1] + ', их поровну' + '. ' +
                'Найдите вероятность того, что случайно выбранная в этом магазине ручка будет ' + colorsInstr[0] + ' или ' + colorsInstr[1] + '.',
            answers: probability,
        });
    }, 100);
})();
//546631
//Открытый банк заданий 546631
