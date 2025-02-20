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
        let educationInstitution = ['школ', 'лицеев', 'гимназий', '', 'вечерних школ',].iz();
        let сorrectIncorrect = ['правильно', 'не правильно'][rand];
        let incorrectCorrect = ['правильно', 'не правильно'][1 - rand];

        let result = students * persent / 100;
        let answer = [result, students - result][randUpgrade];
        let checkForCorrect = [сorrectIncorrect, incorrectCorrect][randUpgrade];
        let typeOfPersent = [persent, 100 - persent][randUpgrade];

        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: 'Из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' + '$' + persent + '$' +
                        '% ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько из ' + gender +
                        ' ' + checkForCorrect + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: answer,
                },
                {
                    text: '$' + answer + '$' + ' из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько процентов ' + gender + ' ' +
                        checkForCorrect + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: persent,
                },
                {
                    text: '$' + answer + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Что составило ' + '$' + typeOfPersent + '$' +
                        '% от всех решивших' + '. Сколько всего ' + gender + ' попробовали решить задачу №' + '$' + taskNumber + '$',
                    answers: students,
                },
                {
                    text: '$' + answer + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Что составило ' + '$' + typeOfPersent + '$' +
                        '% от всех решивших' + '. Сколько ' + gender + '  решили задачу №' + '$' + taskNumber + '$' + ' ' + incorrectCorrect,
                    answers: [students - result, result][randUpgrade],
                },
                {
                    text: 'Только ' + '$' + persent + '$' + '% из ' + '$' + students + '$' + ' ' + gender + ' ' +
                        educationInstitution + ' города ' + ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' +
                        '. Сколько ' + gender + '  решили задачу №' + '$' + taskNumber + '$' + ' ' + checkForCorrect,
                    answers: answer,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77345
//zer00player
