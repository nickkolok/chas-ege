(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let secondsPerPage = sl(8, 20, 1);
        let workMinutes = sl(5, 15, 1);
        let workSeconds = workMinutes * 60;

        let a = secondsPerPage, b = 60;
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        let gcdSecondsAnd60 = a;

        a = secondsPerPage;
        b = workMinutes;
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        let gcdSecondsAndMinutes = a;

        genAssert(gcdSecondsAnd60 > 1, "Время печати страницы должно иметь общий делитель с 60");
        genAssert(gcdSecondsAndMinutes > 1, "Время печати страницы должно иметь общий делитель с временем работы принтера в минутах");

        let pagesPrinted = Math.floor(workSeconds / secondsPerPage);

        NAtask.setTask({
            text:
                'Принтер печатает одну страницу за ' + '$' + secondsPerPage + '$' + ' секунд. ' +
                'Какое наибольшее количество страниц можно напечатать на этом принтере за ' + chislitlx(workMinutes, 'минута', '$') + '?',
            answers: pagesPrinted,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509611
//zer00player
