(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let key = "1001";
        let preference = ['learned_learned', 'learned_not_learned', 'not_learned_learned', 'not_learned_not_learned'];
		let variant = getSelectedPreferenceFromList(key, preference);

        let numberOfQuestions = sl(10, 100);
        let numberlearnedOrNotlearnedQuestions = sl(1, numberOfQuestions - 1);

        let answers = (variant == 1 || variant == 2) ? (numberOfQuestions - numberlearnedOrNotlearnedQuestions) / numberOfQuestions : numberlearnedOrNotlearnedQuestions / numberOfQuestions;
        genAssertZ1000(answers);
        
        let nameQuestion = sklonlxkand(['билет', 'вопрос'].iz());
        let event = ['экзамене', ['проверочной работе', 'контрольной работе', 'тестировании', 'тесте'].iz()][Number(nameQuestion.ie == 'экзамен')];

        NAtask.setTask({
            text: `На ${event} будет ${chislitlx(numberOfQuestions, nameQuestion.ie, '$')}, ${om.maleNames.iz()} ${`не`.esli(variant > 1)} выучил $${numberlearnedOrNotlearnedQuestions}$ из них. 
			Найдите вероятность того, что ему попадётся ${`не`.esli(variant % 2)} выученный ${nameQuestion.ve}.`,
            answers: answers,
            authors: ['Суматохина Александра'],
            preference,
        });
    }, 100);
})();

// 1001 1002 1003 1004 1005 514617 514637 520474 520515 520538
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.166: 799254
// 5.167: 025E49, 75772A
// 5.168: 8CBDFD, 7D3F5F
// 5.169: 2F1A04, D423EF, 5568F2
// 5.170: F100BC, F5811D, B124AC
// 5.171: 67469D
// 5.172: 976F82
// 5.173: 2A6E4E, 64A8B2
// 5.174: 852D0B
// 5.175: 6923B6
// 5.176: 14F2CA, 76B365
// 5.177: F4BD62
// 5.178: 9FD7B4
// 5.179: 59998B
