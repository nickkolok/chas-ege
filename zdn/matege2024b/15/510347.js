(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let moreOrLess = ['увеличится', 'уменьшится'][rand];
        let prise = sl(110, 490, 10);
        let percent = sl(2, 15, 1);
        let result = prise * (1 + [1, -1][rand] * 0.01 * percent);

        NAtask.setTask({
            text:
                'Ежемесячная плата за телефон ',
            questions: [
                {
                    text: 'составляет ' + prise + ' р. в месяц.' +
                        ' В следующем году она ' + moreOrLess + ' на ' + percent + '%.' +
                        ' Сколько рублей будет составлять ежемесячная плата за телефон в следующем году',
                    answers: result,
                },
                {
                    text: 'составляет ' + prise + ' р. в месяц.' +
                        ' В следующем году она ' + moreOrLess + ' и составит ' + result + ' р.' +
                        ' На какой процент изменится ежемесячная плата за телефон в следующем году',
                    answers: percent,
                },
                {
                    text: 'в следующем году ' + moreOrLess + ' и составит ' +
                        result + ' р., что на ' + percent + '% ' + ['больше', 'меньше'][rand] + ', чем в текущем году.' +
                        ' Сколько рублей составляет ежемесячная плата за телефон в этом году',
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard()
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=510347
//zer00player
