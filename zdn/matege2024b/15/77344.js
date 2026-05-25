(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '77344';
        let preference = ['findAll', 'findPercent', 'findWinners'];
        let rand = getSelectedPreferenceFromList(key, preference);

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
                        'Сколько учеников участвовало',
                    answers: students,
                },
                {
                    text: ' стали ' + chislitlx(result, 'ученик') + '. ' +
                        'Всего на олимпиаде присутствовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Какой процент учащихся стал призёрами',
                    answers: percent,
                },
                {
                    text: ' стало ' + percent + '% от числа участников. ' +
                        'Всего на олимпиаде присутствовало ' + chislitlx(students, 'ученик') + '. ' +
                        'Сколько человек стали призёрами',
                    answers: result,
                },
            ][rand],
            postquestion: ' в олимпиаде?',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=77344
//zer00player
