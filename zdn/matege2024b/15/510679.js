(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let howMuchIncreased = sl(2, 10, 0.1);
        let howMuchDecreased = [2, 4, 5, 10, 20, 25, 50].iz();

        let increasedOrDecreased = ['увеличилось', 'уменьшилось'][rand];
        let ByHowMuchGet = [howMuchIncreased, howMuchDecreased][rand];

        let result = [100 * howMuchIncreased - 100, 100 - 100 / howMuchDecreased][rand];

        NAtask.setTask({
            text:
                'Число посетителей сайта ' + increasedOrDecreased + ' за месяц в ' + chislitlx(ByHowMuchGet, 'раз', '$') +
                '. На сколько процентов ' + increasedOrDecreased + ' число посетителей сайта за этот месяц?',
            answers: result,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=510679
//zer00player
