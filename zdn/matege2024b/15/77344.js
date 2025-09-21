(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let subject = sklonlxkand(['математика', 'физика', 'география', 'биология', 'химия', 'астрономия', 'обществознание', 'история', 'литература'].iz());
        let place = ['городской', 'областной', 'школьной',].iz();

        let students = sl(200, 10000, 5);
        let percent = sl(2, 25, 1);
        genAssert(students.kratno(100 / percent), "количество учащихся не кратко 100/процент");
        let result = percent / 100 * students;

        NAtask.setTask({
            text:
                'Призерами ' + place + ' олимпиады по ' + subject.pe,
            questions: [
                {
                    text: ' стали ' + chislitlx(result, 'ученик') + ', ' +
                        'что составило ' + percent + '% от числа участников. ' +
                        'Сколько учеников участвовало в олимпиаде',
                    answers: students,
                },
                {
                    text: ' стали ' + chislitlx(result, 'ученик') + '. ' +
                        'Всего на олимпиаде присутствовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Какой процент учащихся стал призёрами в олимпиаде',
                    answers: percent,
                },
                {
                    text: ' стало ' + percent + '% от числа участников. ' +
                        'Всего на олимпиаде присутствовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Сколько человек стали призёрами в олимпиаде',
                    answers: result,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=77344
//zer00player
