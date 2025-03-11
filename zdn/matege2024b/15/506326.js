(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let subscribersFirst = sl(200, 1000, 10);
        let subscribersArrived = sl(20, 190, 10);
        genAssert(subscribersArrived.kratno(subscribersFirst / 100), "количество прибывших кратко 1% от нынешних");

        let subscribersSecond = subscribersFirst + subscribersArrived;
        let result = (subscribersArrived / subscribersFirst) * 100;


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
                        'Известно, что в конце года насчитали ' + subscribersSecond + ' тыс абонентов. ' +
                        'Сколько тыс. человек являлись абнонентами у этой компании в начале года',
                    answers: subscribersFirst,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506326
//zer00player
