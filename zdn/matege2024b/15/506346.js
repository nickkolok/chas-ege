(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let randUpgrade = sl1();
        let mlnRuble = sl(10, 100, 1);
        let persent = sl(10, 50, 1);

        let result = mlnRuble * persent / 100;

        NAtask.setTask({
            text:
                ['Городской бюджет составляет ' + '$' + mlnRuble + '$' + ' млн рублей, а расходы на одну из его статей составили ' + '$' + persent + '$' + '%.' +
                    ' Сколько ' + ['миллионов', ''][rand] + ' рублей потрачено на эту статью бюджета?',
                ' На расходы одной из статей город выделил ' + '$' + result + '$' + ' млн рублей, что составило ' + '$' + persent + '$' +
                '% от всего городского бюджета.' + ' Сколько ' + ['миллионов', ''][rand] + ' рублей было изначально в бюджете?'][randUpgrade],
            answers: [[result, result * 1000000][rand], [mlnRuble, mlnRuble * 1000000][rand]][randUpgrade],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506346
//zer00player
