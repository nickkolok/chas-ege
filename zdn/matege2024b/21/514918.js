(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let moreOrLess = ['бол', 'мен'][rand];
        let lessOrMore = ['бол', 'мен'][1 - rand];
        let moreThanLessThan = ['больше', 'меньше'][rand];

        let difference = sl(2, 20, 1);
        let minAngle = (360 / (2 * difference + 1));
        let maxAngle = (360 / (difference + 2));

        let result = maxAngle.floor() - minAngle.floor() - Number(maxAngle % 1 == 0 || minAngle % 1 == 0);

        NAtask.setTask({
            text: 'Три луча, выходящие из одной точки, разбивают плоскость на $3$ ' +
                'разных угла, измеряемых целым числом градусов. Наи' + moreOrLess + 'ьший угол в ' +
                chislitlx(difference, 'раз', 'v$') + ' ' + moreThanLessThan +
                ' наи' + lessOrMore + 'ьшего. Сколько значений может принимать величина среднего угла?',
            answers: result,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=514918
//zer00player
