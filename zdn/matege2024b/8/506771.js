(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506771';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = 2;
		let nWrong = 2;

		let isMale = sl(0, 1);
		let namesSource = isMale ? om.childMaleNames : om.childFemaleNames;
		let names = sklonlxkand(namesSource.iz(4));

		let correct = [
			`Среди указанных четырёх человек нет никого старше ${names[3].re}.`,
			`${names[0].ie} младше ${names[3].re}.`
		];
		let wrong = [
			`${names[1].ie} и ${names[0].ie} одного возраста.`,
			`${names[2].ie} старше ${names[3].re}.`
		];

		NAtask.setTask({
			text: `${names[1].ie} старше ${names[0].re}, но младше ${names[3].re}. ${names[2].ie} не старше ${names[1].re}. Выберите все утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506771
