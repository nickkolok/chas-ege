(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let firstMultiplier = sl(1, 10, 1);
        let secondMultiplier = sl(1, 10, 1);
        let increaseFirst = sl(1, 10, 1);
        let increaseSecond = increaseFirst + sl(1, 10, 1);
        let resMultiplier = firstMultiplier * secondMultiplier;

        let firstDifference = (firstMultiplier + increaseFirst) * (secondMultiplier + increaseFirst) - resMultiplier;
        let secondDifference = (firstMultiplier + increaseSecond) * (secondMultiplier + increaseSecond) - resMultiplier;

        NAtask.setTask({
            text: 'Если бы каждый из двух множителей увеличили на ' + '$' + increaseFirst + '$' + ', ' +
                'их произведение увеличилось бы на ' + '$' + firstDifference + '$' + '. ' +
                'На сколько увеличится произведение этих множителей, ' +
                'если каждый из них увеличить на ' + '$' + increaseSecond + '$' + '?',
            answers: secondDifference,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/problem?id=514919
//zer00player
