(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514497';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let names = sklonlxkand(['Китти', 'Машка', 'Лада', 'Мурка', 'Соня', 'Бацила', 'Люся', 'Дуся', 'Бусинка'].iz(3));
		let weightFirst = sl(2, 5);
		let weightSecond = sl(0.5, weightFirst - 0.5, 0.5);

		let correct = [
			`Любая кошка, помимо указанных, которая весит меньше ${names[2].re}, весит также меньше ${names[0].re}.`,
			`Среди указанных кошек нет кошек тяжелее ${names[0].re}.`,
			`${names[0].ie} тяжелее ${names[1].re} на ${weightFirst} кг.`,
			`${names[2].ie} легче ${names[1].re} на ${weightSecond} кг.`
		];
		let wrong = [
			`Любая кошка, помимо указанных, которая весит меньше ${names[0].re}, весит также меньше ${names[2].re}.`,
			`${names[1].ie} весит меньше ${names[2].re}.`,
			`${names[2].ie} тяжелее ${names[0].re}.`,
			`Все три кошки одного веса.`
		];

		NAtask.setTask({
			text: `Кошка ${names[0].ie} весит на ${weightFirst} килограмма больше кошки ${names[1].re}, а кошка ${names[2].ie} на ${weightSecond} килограмма легче кошки ${names[1].re}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях.` +
				` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/test?pid=514497
