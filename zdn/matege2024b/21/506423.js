
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let nameOfPerson = sklonlxkand([om.maleNames.iz(), om.femaleNames.iz()][rand]);
        let pronoun = ['него', 'неё'][rand];

        let firstMultiplier = sl(2, 10, 1);
        let secondMultiplier = firstMultiplier + sl(1, 5, 1);
        let thirdMultiplier = secondMultiplier + sl(2, 5, 1);

        let copperCoinMultiplier = sl(4, 20, 1);
        let copperCoin = (secondMultiplier + firstMultiplier) * copperCoinMultiplier;

        genAssert(thirdMultiplier * firstMultiplier - secondMultiplier * secondMultiplier > 0, "Серебряных монет должно было стать меньше, а не больше или остаться ровно столько же.");

        let result = copperCoinMultiplier * (thirdMultiplier * firstMultiplier - secondMultiplier * secondMultiplier);

        NAtask.setTask({
            text: 'В  обменном пункте можно совершить одну из двух операций: 1) за ' + chislitlx(firstMultiplier, 'монета', '', ' золотых ') + ' получить ' + secondMultiplier +
                ' серебряных и одну медную; 2) за ' + thirdMultiplier + ' серебряных монет получить ' + secondMultiplier + ' золотых и одну медную. У ' + nameOfPerson.re +
                ' были только серебряные монеты. ' +
                'После нескольких посещений обменного пункта серебряных монет у ' + pronoun + ' стало меньше, ' +
                'золотых не появилось, ' +
                'зато появилось ' + copperCoin + ' медных. ' +
                'На сколько уменьшилось количество серебряных монет у ' + nameOfPerson.re + '?',
            answers: result,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506423
//zer00player

