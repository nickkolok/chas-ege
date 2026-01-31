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
        let educationInstitution = ['школ', 'лицеев', 'гимназий', '', 'вечерних школ'].iz();
        let сorrectIncorrect = ['правильно', 'неправильно'][rand];
        let incorrectCorrect = ['правильно', 'неправильно'][1 - rand];
        let tryToSolve = [', приступивших к решению задачи', ' решавших эту задачу', ' попытавшихся решить задачу'].iz();

        let result = students * persent / 100;
        let answer = [result, students - result][randUpgrade];
        let checkForCorrect = [сorrectIncorrect, incorrectCorrect][randUpgrade];
        let typeOfPersent = [persent, 100 - persent][randUpgrade];

        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: 'Из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' + '$' + persent + '$' +
                        '% ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько из ' + gender + ' ' + educationInstitution +
                        ' ' + checkForCorrect + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: answer,
                },
                {
                    text: '$' + answer + '$' + ' из ' + '$' + students + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + '. Сколько процентов ' + gender + ' ' + educationInstitution + ' ' +
                        checkForCorrect + ' решили задачу №' + '$' + taskNumber + '$',
                    answers: persent,
                },
                {
                    text: '$' + answer + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + ', что составило ' + '$' + typeOfPersent + '$' +
                        '% от всех' + tryToSolve + '. Сколько всего ' + gender + ' ' + educationInstitution + ' попробовали решить задачу №' + '$' + taskNumber + '$',
                    answers: students,
                },
                {
                    text: '$' + answer + '$' + ' ' + gender + ' ' + educationInstitution + ' города ' +
                        ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' + ', что составило ' + '$' + typeOfPersent + '$' +
                        '% от всех' + tryToSolve + '. Сколько ' + gender + ' ' + educationInstitution + '  решили задачу №' + '$' + taskNumber + '$' + ' ' + incorrectCorrect,
                    answers: [students - result, result][randUpgrade],
                },
                {
                    text: 'Только ' + '$' + persent + '$' + '% из ' + '$' + students + '$' + ' ' + gender + ' ' +
                        educationInstitution + ' города ' + ' ' + сorrectIncorrect + ' решили задачу №' + '$' + taskNumber + '$' +
                        '. Сколько ' + gender + ' ' + educationInstitution + '  решили задачу №' + '$' + taskNumber + '$' + ' ' + checkForCorrect,
                    answers: answer,
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77345
//zer00player
