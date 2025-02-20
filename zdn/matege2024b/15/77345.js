(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let randUpgrade = sl1();
        let students = sl(1500, 10000, 100);
        let persent = sl(10, 90, 1);
        let taskNumber = sl(1, 20, 1);
        let gender = ['выпускников', 'выпускниц'].iz();
        let educationInstitution = ['школ', 'университетов', 'колледжей', 'техникумов', 'вечерних школ',].iz();
        let сorrectIncorrect = ['правильно', 'не правильно'][rand];
        let IncorrectCorrect = ['правильно', 'не правильно'][1 - rand];

        let result = students * persent / 100;
        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: 'Из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' + '$' + persent + '$' +
                        '% ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution +
                        ' города ' + [сorrectIncorrect, IncorrectCorrect][randUpgrade] + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: [result, students - result][randUpgrade],
                },
                {
                    text: '$' + [result, students - result][randUpgrade] + '$' + ' из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько процентов ' + gender + ' ' + educationInstitution +
                        ' города ' + [сorrectIncorrect, IncorrectCorrect][randUpgrade] + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: persent,
                },
                {
                    text: '$' + [result, students - result][randUpgrade] + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Что составило ' + '$' + [persent, 100 - persent][randUpgrade] + '$' +
                        '% от всех решивших' + '. Сколько всего ' + gender + ' ' + educationInstitution + ' попробовали решить задачу №' + '$' + taskNumber + '$',
                    answers: students,
                },
                {
                    text: '$' + [result, students - result][randUpgrade] + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Что составило ' + '$' + [persent, 100 - persent][randUpgrade] + '$' +
                        '% от всех решивших' + '. Сколько ' + gender + ' ' + educationInstitution + '  решили задачу №' + '$' + taskNumber + '$' + ' ' + IncorrectCorrect,
                    answers: [students - result, result][randUpgrade],
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77345
//zer00player
