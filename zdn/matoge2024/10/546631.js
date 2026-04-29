(function () {
    'use strict';
    retryWhileError(function () {

        let colors = om.trickyColors.iz(5);
        let [c1, c2, c3, c4] = arrayOfUniqueValues(4, 20, 40, 2);
        let total = c1 + c2 + c3 + c4*2;
                
        let numbers = [c1, c2, c3, c4, c4];
       
        let colorsGen = colors.slice(0,3).map(c => c.replace('ий', 'их').replace('ый', 'ых').replace('ой', 'ых'));
        let colorsNomPl = colors.slice(3,5).map(c => c.replace('ий', 'ие').replace('ый', 'ые').replace('ой', 'ые'));
        
        let randNumbers = arrayOfUniqueValues(2, 0, colors.length - 1);
        let colorsInstr = [colors[randNumbers[0]], colors[randNumbers[1]]].map(c => c.replace('ий', 'ей').replace('ый', 'ой'));
        let probability = (numbers[randNumbers[0]]+numbers[randNumbers[1]]) / total;

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'В магазине канцтоваров продаётся ' + chislitlx(total, 'ручка', '$') + ' ручек: ' + '$' + c1 + '$ ' + colorsGen[0] + ', $' + c2 + '$ ' + colorsGen[1] + ', $' + c3 + '$ ' + colorsGen[2] + 
            ', ' + 'остальные — ' + colorsNomPl[0] + ' и ' + colorsNomPl[1] + ', их поровну' + '. ' +
                'Найдите вероятность того, что случайно выбранная в этом магазине ручка будет ' + colorsInstr.join(' или ') + '.',
            answers: probability,
        });
    }, 1000);
})();
//546631
//Открытый банк заданий 546631
