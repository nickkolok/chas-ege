(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let moreOrLess = ['бол', 'мен'][rand];
        let lessOrMore = ['бол', 'мен'][1 - rand];
        let moreThanLessThan = ['больше', 'меньше'][rand]

        let difference = sl(2, 12, 1);
        let minAngle = (360 / (2 * difference + 1)).floor();
        let maxAngle = (360 / (difference + 2)).floor();
        let result = maxAngle - minAngle - 1;

        NAtask.setTask({
            text: 'Три луча, выходящие из одной точки, разбивают плоскость на 3 разных угла, измеряемых целым числом градусов. Наи' + moreOrLess + 'ьший угол в ' +
                chislitlx(difference, 'раз', 'v$') + ' ' + moreThanLessThan + ' наи' + lessOrMore + 'ьшего. Сколько значений может принимать величина среднего угла?',
            answers: result,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=514918
//zer00player
