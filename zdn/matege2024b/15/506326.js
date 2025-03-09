(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let ratio = sl(2,50,1);
        let subscribersFirst = sl(500, 10000, 10);
        let subscribersArrived = (subscribersFirst * ratio) / 100;

        let subscribersSecond = subscribersFirst + subscribersArrived;

        let result = Math.round((subscribersArrived / subscribersFirst) * 100 * 1000) / 1000;
        
        genAssertZ1000(result, "слишком много знаков после запятой");

        let company = ['Юг', 'Восток', 'Запад', 'Север', 'Ветер', 'Роза ветров', 'Штиль', 'Шторм', 'Ураган', 'Морзе'].iz();

        NAtask.setTask({
            text:
                'В начале года в телефонной компании "' + company + '"',

            questions: [
                {
                    text: ' число абонентов составляло ' + subscribersFirst + ' тыс. человек, ' +
                        'а к концу года их стало ' + subscribersSecond + ' тыс. человек. ' +
                        'На сколько процентов увеличилось за год число абонентов этой компании',
                    answers: result,
                },
                {
                    text: ' число абонентов составляло ' + subscribersFirst + ' тыс. человек, ' +
                        'а к концу года их стало на ' + result + '% больше. ' +
                        ' ' + ['На сколько тыс. человек увеличилось число абонентов за год', 'Сколько всего теперь тыс. абонентов обслуживаются у этой компании'][rand],
                    answers: [subscribersArrived, subscribersSecond][rand],
                },
                {
                    text: ' было на ' + result + '% меньше абонентов, чем в конце года. ' +
                        'Известно, что в конце года насчитали ' + subscribersSecond + ' тыс человек. ' +
                        'Сколько тыс. человек являлись абнонентами у этой компании в начале года',
                    answers: subscribersFirst,
                },
            ],
            postquestion: '?'+' Ответ округлять до тысячных.',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506326
//zer00player
