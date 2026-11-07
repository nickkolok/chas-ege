(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let key = '1001';
        let preference = ['learned_learned', 'learned_not_learned', 'not_learned_learned', 'not_learned_not_learned'];
        let variant = getSelectedPreferenceFromList(key, preference);

        let numberOfQuestions = sl(10, 100);
        let numberOfLearnedOrNotLearnedQuestions = sl(1, numberOfQuestions - 1);

        let answers = (variant == 1 || variant == 2) ? (numberOfQuestions - numberOfLearnedOrNotLearnedQuestions) / numberOfQuestions : numberOfLearnedOrNotLearnedQuestions / numberOfQuestions;
        genAssertZ1000(answers);

        let nameQuestion = sklonlxkand(['билет', 'вопрос'].iz());

        NAtask.setTask({
            text: `На экзамене будет ${chislitlx(numberOfQuestions, nameQuestion.ie, '$')}, ` +
                `${om.maleNames.iz()} ${'не '.printIf(variant > 1)}выучил $${numberOfLearnedOrNotLearnedQuestions}$ из них. ` +
                `Найдите вероятность того, что ему попадётся ${'не'.printIf(variant % 2)}выученный ${nameQuestion.ve}.`,
            answers: answers,
            authors: ['Суматохина Александра'],
            preference,
        });
    }, 100);
})();

// 1001 1002 1003 1004 1005 514617 514637 520474 520515 520538
// 799254
// 025E49, 75772A
// 8CBDFD, 7D3F5F
// 2F1A04, D423EF, 5568F2
// F100BC, F5811D, B124AC
// 67469D
// 976F82
// 2A6E4E, 64A8B2
// 852D0B
// 6923B6
// 14F2CA, 76B365
// F4BD62
// 9FD7B4
// 59998B
