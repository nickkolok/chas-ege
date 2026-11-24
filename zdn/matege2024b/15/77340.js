(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let subject = ['французский', 'китайский', 'немецкий', 'английский', 'испанский', 'корейский', 'польский', 'японский', 'тайский',].iz();
        let educationInstitution = sklonlxkand(['школа', 'лицей', 'гимназия', 'академия', 'колледж', 'университет', 'институт', 'ВУЗ', 'техникум', 'училище'].iz());

        let students = sl(200, 10000, 10);
        let percent = sl(10, 90, 1);
        genAssert(students.kratno(100 / percent), "количество учащихся не кратко 100/процент");
        let result = percent / 100 * students;

        NAtask.setTask({
            text:
                'В ' + educationInstitution.pe + ' ',
            questions: [
                {
                    text: result + ' учащихся изучают ' + subject + ' язык, что составляет ' + percent + '% от числа всех учащихся. ' +
                        'Сколько учащихся обучаются в ' + educationInstitution.pe,
                    answers: students,
                },
                {
                    text: percent + '% учащихся изучает ' + subject + ' язык. Всего в заведении ' + students + ' учащихся. ' +
                        'Сколько учащихся изучают ' + subject + ' язык',
                    answers: result,
                },
                {
                    text: result + ' учащихся изучают ' + subject + ' язык. Всего в заведении ' + students + ' учащихся. ' +
                        'Какой процент учащихся изучает ' + subject + ' язык',
                    answers: percent,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=77340
//zer00player
