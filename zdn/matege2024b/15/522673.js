(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let anotherRand = sl(0, 4, 1);

        let endPrilag = ['-й', '-ю'][rand];
        let anotherEndPrilagFirst = ['ый', 'ую'][rand];
        let anotherEndPrilagSecond = ['ой', 'ую'][rand];
        let endChislit = ['х', 'х', 'ти', 'ми', 'ти'][anotherRand];
        let oneItem = ['один', 'одна'][rand];

        let clotherMR = sklonlxkand(['свитер', 'халат', 'плащ', 'дождевик'].iz());
        let clotherWR = sklonlxkand(['рубашка', 'футболка', 'куртка', 'кофта'].iz());
        let clothers = [clotherMR, clotherWR][rand];

        let prise = sl(300, 5000, 10);
        let percent = sl(10, 80, 1);
        let countOfClother = sl(2, 4, 1);
        let anotherCountOfClother = [2, 4, 6, 8, 10][anotherRand];

        let result = (countOfClother - 1) * prise + (100 - percent) * 0.01 * prise;
        let anotherResult = (anotherCountOfClother / 2) * prise + (anotherCountOfClother / 2) * ((100 - percent) * 0.01 * prise);

        NAtask.setTask({
            text:
                'В спортивном магазине ' + ['любой', 'любая'][rand] + ' ' + clothers.ie,
            questions: [
                {
                    text: ' стоит ' + '$' + prise + '$' + 'р. ' +
                        'Сейчас магазин проводит акцию: при покупке ' + '$' + countOfClother + '$' + '-x ' + clothers.rm + ' — скидка на ' + '$' +
                        countOfClother + '$' + endPrilag + ' ' + clothers.ve + ' ' + '$' + percent + '$' + '%. ' +
                        'Сколько рублей придётся заплатить за покупку ' + '$' + countOfClother + '$' + '-x ' + clothers.rm + ' в период действия акции',
                    answers: result,
                },
                {
                    text: ' стоит ' + '$' + prise + '$' + 'р. ' +
                        'Сейчас магазин проводит акцию: при покупке ' + clothers.rm +
                        ' — скидка на кажд' + anotherEndPrilagFirst + ' втор' + anotherEndPrilagSecond + ' составляет ' + '$' + percent + '$' + '%. ' +
                        'Сколько рублей придётся заплатить за покупку ' +
                        '$' + anotherCountOfClother + '$' + '-' + endChislit + ' ' + clothers.rm + ' в период действия акции',
                    answers: anotherResult,
                },
                {
                    text: ' стоит ' + '$' + prise + '$' + 'р. ' +
                        'Сейчас магазин проводит акцию: при покупке ' + '$' + countOfClother + '$' + '-x ' + clothers.rm + ' — будет скидка на ' + '$' +
                        countOfClother + '$' + endPrilag + ' ' + clothers.ve + '. ' +
                        'Покупатель оплатил покупку ' + '$' + countOfClother + '$' + '-x ' + clothers.rm +
                        ' в период действия акции, что стоило ему ' + '$' + result + '$' + 'р. ' + 'Сколько процентов составляет скидка',
                    answers: percent,
                },
                {
                    text: ' попадает под акцию: при покупке ' + '$' + countOfClother + '$' + '-x ' + clothers.rm + ' — скидка на ' + '$' +
                        countOfClother + '$' + endPrilag + ' ' + clothers.ve + ' ' + '$' + percent + '$' + '%. ' +
                        'Покупатель оплатил покупку ' + '$' + countOfClother + '$' + '-x ' + clothers.rm +
                        ' в период действия акции, что стоило ему ' + '$' + result + '$' + 'р. ' +
                        'Сколько стоит ' + oneItem + ' ' + clothers.ie + ' без акции',
                    answers: prise,
                },
                {
                    text: ' стоит ' + '$' + prise + '$' + 'р. ' +
                        'Сейчас магазин проводит акцию: при покупке ' + '$' + anotherCountOfClother + '$' + '-x ' + clothers.rm +
                        ' — будет скидка на кажд' + anotherEndPrilagFirst + ' втор' + anotherEndPrilagSecond + ' ' + clothers.ve + '. ' +
                        'Покупатель оплатил покупку ' + '$' + anotherCountOfClother + '$' + '-' + endChislit +
                        ' ' + clothers.rm + ' в период действия акции, что стоило ему ' + '$' + anotherResult + '$' + 'р. ' +
                        'Сколько процентов составляет скидка',
                    answers: percent,
                },
                {
                    text: ' попадает под акцию: при покупке ' + '$' + anotherCountOfClother + '$' + '-x ' + clothers.rm +
                        ' — скидка на кажд' + anotherEndPrilagFirst + ' втор' + anotherEndPrilagSecond + ' составляет ' + '$' + percent + '$' + '%. ' +
                        'Покупатель оплатил покупку ' + '$' + anotherCountOfClother + '$' + '-' + endChislit + ' ' + clothers.rm +
                        ' в период действия акции, что стоило ему ' + '$' + anotherResult + '$' + 'р. ' +
                        'Сколько стоит ' + oneItem + ' ' + clothers.ie + ' без акции',
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=522673
//zer00player
