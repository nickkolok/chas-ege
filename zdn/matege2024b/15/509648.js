(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let studentsFirst = sl(200, 10000, 10);
        let studentsArrived = sl(20, 200, 10);
        let studentsSecond = studentsFirst + studentsArrived;

        genAssert(studentsArrived.kratno(studentsFirst/100),"количество прибывших учащихся не кратко 1% от изначального количества обущающихся");
        let result = studentsArrived / studentsFirst * 100;
       

        let educationInstitution = sklonlxkand(['школа', 'лицей', 'гимназия', 'академия', 'колледж', 'университет', 'институт', 'ВУЗ', 'техникум', 'училище'].iz());

        NAtask.setTask({
            text:
                'В начале учебного года в ' + educationInstitution.pe,

            questions: [
                {
                    text: ' было ' + studentsFirst + ' учащихся, ' +
                        'а к концу года их стало ' + studentsSecond + '. ' +
                        'На сколько процентов увеличилось за учебный год число учащихся',
                    answers: result,
                },
                {
                    text: ' было ' + studentsFirst + ' учащихся, ' +
                        'а к концу года их стало на ' + result + '% больше. ' +
                        ' ' + ['На сколько человек увеличилось число учащихся за учебный год', 'Сколько всего теперь учащихся'][rand],
                    answers: [studentsArrived, studentsSecond][rand],
                },
                {
                    text: ' было на ' + result + '% меньше учащихся, чем в конце года. ' +
                        'Известно, что к весне стало ' + studentsSecond + ' учащихся. ' +
                        'Сколько человек обучались в ' + educationInstitution.pe + ' в начале года',
                    answers: studentsFirst,
                },
            ],
            postquestion: '?',
        });
    }, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509648
//zer00player
