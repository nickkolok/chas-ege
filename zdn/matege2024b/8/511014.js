(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511014';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let subject = ['экономике', 'английскому языку', 'математике', 'физике', 'китайскому языку',
			 'обществознанию', 'биологии', 'немецкому языку', 'истории', 'биологии', 'географии'].iz();
		let students = sl(15, 30);
		let minScore = sl(30, 60);
		let maxScore = sl(minScore + 10, 100);

		let correct = [
			`Среди этих выпускников есть человек, который получил ${maxScore} баллов за ЕГЭ по ${subject}.`,
			`Баллы за ЕГЭ по ${subject} любого из этих ${students} человек не ниже ${minScore - sl(1, 15)}.`,
			`Минимальный балл строго больше ${minScore - sl(1, 15)}.`,
			`Максимальный балл равен ${maxScore}.`,
			`Все баллы находятся в диапазоне от ${minScore} до ${maxScore}.`,
			`Ни один выпускник не получил меньше ${minScore} баллов.`
		];
		let wrong = [
			`Среди этих выпускников есть ${students} человек с равными баллами за ЕГЭ по ${subject}.`,
			`Среди этих выпускников есть человек, получивший ${minScore - sl(5, 25)} баллов за ЕГЭ по ${subject}.`,
			`Все выпускники получили одинаковые баллы.`,
			`Максимальный балл меньше ${maxScore}.`,
			`Минимальный балл равен ${minScore - sl(5, 25)}.`,
			`Найдётся выпускник с баллом выше ${maxScore}.`
		];

		NAtask.setTask({
			text: `Двадцать выпускников одного из одиннадцатых классов сдавали ЕГЭ по ${subject}. Самый низкий полученный балл был равен ${minScore}, а самый высокий — ${maxScore}. Выберите одно или несколько утверждений, которые ` +
				(rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511014
