(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();

        let clotherMR = sklonlxkand(['свитер', 'халат', 'плащ', 'дождевик', 'товар'].iz());
        let clotherWR = sklonlxkand(['рубашка', 'футболка', 'куртка', 'кофта'].iz());
        let clothers = [clotherMR, clotherWR][rand];

        let cost = ['стоил', 'стоила'][rand];
        let hasBecome = ['стал', 'стала'][rand]
        let mw = ['', 'а'][rand];
        let prise = sl(300, 5000, 10);
        let percent = sl(10, 80, 1);

        let result = (100 - percent) * 0.01 * prise;


        NAtask.setTask({
            text:
                clothers.ve.toZagl() + ' на распродаже уценили',
            questions: [
                {
                    text: ' на ' + '$' + percent + '$' + '%, при этом он' + mw + ' ' + hasBecome + ' стоить ' + '$' + result + '$' + ' р. ' +
                        'Сколько рублей ' + cost + ' ' + clothers.ie + ' до распродажи',
                    answers: prise,
                },
                {
                    text: ', при этом он' + mw + ' ' + hasBecome + ' стоить ' + '$' + result + '$' + ' р. ' + 'До распродажи ' + clothers.ie + ' ' + cost +
                        ' ' + '$' + prise + '$' + ' р. Сколько процентов составляет скидка',
                    answers: percent,
                },
                {
                    text: ' на ' + '$' + percent + '$' + '%.' + ' До распродажи ' + clothers.ie + ' ' + cost + ' ' + '$' + prise + '$' +
                        ' р. Сколько рублей стоит ' + clothers.ie + ' во время распродажи',
                    answers: result,
                },

            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506426
//zer00player
