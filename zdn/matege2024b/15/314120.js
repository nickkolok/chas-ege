(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let item = sklonlxkand((om.meltov.ie).iz());
        let prise = sl(200, 1000, 10);
        let payment = sl(10, 5000, 5) + prise * 2;
        let percent = sl(3, 80);
        let count = sl(5, 20);
        let result = prise * (1 - 0.01 * percent);

        NAtask.setTask({
            text: 'Набор ' + item.rm + ', который стоил ' + '$' + prise + '$' +
                ' рублей, продаётся со скидкой ' + '$' + percent + '$' + '%. ',
            questions: [
                {
                    text:
                        'Какое наибольшее число ' + item.rm + ' можно купить за ' + '$' + payment + '$' + ' рублей',
                    answers: (payment / result).floor(),
                },
                {
                    text: 'Сколько рублей будут стоить ' + '$' + count + '$' + ' наборов ' + item.rm + ', купленных в этом магазине',
                    answers: result * count,
                }
            ], postquestion: '?',
        }); NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//zer00player
//https://math-oge.sdamgia.ru/test?likes=314120
