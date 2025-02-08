(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let howMuchIncreased = sl(2, 10, 1);

        NAtask.setTask({
            text:
                'Число посетителей сайта увеличилось за месяц в ' + chislitlx(howMuchIncreased, 'раз', '$') +
                '. На сколько процентов увеличилось число посетителей сайта за этот месяц?',
            answers: 100 * howMuchIncreased - 100,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=510679
//zer00player
