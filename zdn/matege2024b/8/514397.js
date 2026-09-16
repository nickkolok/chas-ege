(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514397';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let name = sklonlxkand(om.childFemaleNames.iz(3));
		let diffAgeFirst = sl(1, 3);
		let diffAgeSecnd = diffAgeFirst + sl(1, 3);

		let correct = [
			`Среди указанных девочек нет никого младше ${name[2].re}.`,
			`Любая девочка, помимо указанных, которая старше ${name[0].re}, также старше ${name[2].re}.`,
			`${name[1].ie} старше ${name[0].re}, а ${name[0].ie} старше ${name[2].re}.`,
			`Разница между возрастом ${name[1].re} и ${name[2].re} составляет ${chislitlx(diffAgeSecnd + diffAgeFirst, `год`, `$`)}.`
		];
		let wrong = [
			`Любая девочка, помимо указанных, которая старше ${name[2].re}, также старше ${name[0].re}.`,
			`${name[1].ie} и ${name[2].ie} одного возраста.`,
			`${name[0].ie} младше ${name[2].re}.`,
			`Все три девочки одного возраста.`
		];

		NAtask.setTask({
			text: `${name[0].ie} младше ${name[1].re} на ${chislitlx(diffAgeFirst, `год`, `$`)}, но старше ${name[2].re} на ${chislitlx(diffAgeSecnd, `год`, `$`)}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях.` +
				` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514397
