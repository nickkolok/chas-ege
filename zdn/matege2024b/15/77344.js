(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let subject = sklonlxkand(['математика', 'физика', 'география', 'биология', 'химия', 'астрономия', 'обществознание', 'история', 'литература'].iz());
        let place = ['городской', 'областной', 'школьной',].iz();

        let students = sl(200, 10000, 5);
        let percent = sl(5, 20, 1);
        genAssert(students.kratno(100 / percent), "количество учащихся не кратко 100/процент");
        let result = percent / 100 * students;

        NAtask.setTask({
            text:
                'Призерами ' + place + ' олимпиады по ' + subject.pe + ' стало ',
            questions: [
                {
                    text: chislitlx(result, 'ученик') + ', ' +
                        'что составило ' + percent + '% от числа участников. ' +
                        'Сколько учеников участвовало в олимпиаде',
                    answers: students,
                },
                {
                    text: chislitlx(result, 'ученик') + '. ' +
                        'Всего на олимпиаде присутсвовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Какой процент учащихся победил в олимпиаде',
                    answers: percent,
                },
                {
                    text: percent + '% от числа участников. ' +
                        'Всего на олимпиаде присутсвовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Сколько человек победили в олимпиаде',
                    answers: result,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=77344
//zer00player
