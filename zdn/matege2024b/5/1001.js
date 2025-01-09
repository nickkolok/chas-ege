(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let key = "1001";

        let variant = getListedPreference(key, [{
            preference: 'learned_learned',
            preferenceValue: 0,
        }, {
            preference: 'learned_not_learned',
            preferenceValue: 1,

        }, {
            preference: 'not_learned_learned',
            preferenceValue: 2,

        }, {
            preference: 'not_learned_not_learned',
            preferenceValue: 3,

        }], sl(0, 3));

        let numberOfQuestions = sl(10, 100);
        let numberlearnedOrNotlearnedQuestions = sl(5, numberOfQuestions - 1);

        let answers = (variant == 1 || variant == 2) ? (numberOfQuestions - numberlearnedOrNotlearnedQuestions) / numberOfQuestions : numberlearnedOrNotlearnedQuestions / numberOfQuestions;
        genAssertZ1000(answers);
        
        let nameQuestion = sklonlxkand(['билет', 'вопрос'].iz());
        let event = ['экзамене', ['проверочной работе', 'контрольной работе', 'тестировании', 'тесте'].iz()][Number(nameQuestion.ie == 'экзамен')];

        NAtask.setTask({
            text: `На ${event} будет ${chislitlx(numberOfQuestions, nameQuestion.ie, '$')}, ${om.maleNames.iz()} ${`не`.esli(variant > 1)} выучил $${numberlearnedOrNotlearnedQuestions}$ из них. 
			Найдите вероятность того, что ему попадётся ${`не`.esli(variant % 2)} выученный ${nameQuestion.ve}.`,
            answers: answers,
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 1001 1002 1003 1004 1005 514617 514637 520474 520515 520538
