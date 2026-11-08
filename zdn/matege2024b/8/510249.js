(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510249';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let places = ['на даче', 'у реки', 'в деревне','на озере', 'в доме отдыха', 'на море', 'в санатории', 'на пляже'].iz(2);
		let name = om.femaleNames.iz();

		let correct = [
			`Каждый сотрудник этой фирмы отдыхал летом или ${places[0]}, или ${places[1]}, или и там, и там.`,
			`Если сотрудник этой фирмы не отдыхал  ${places[1]} летом, то он отдыхал ${places[0]}.`,
			`Все сотрудники отдыхали где-то летом.`,
			`Нет сотрудника, который не отдыхал ни ${places[0]}, ни ${places[1]}.`
		];
		let wrong = [
			`Сотрудник этой фирмы, который летом не отдыхал ${places[1]}, не отдыхал и ${places[0]}.`,
			`Если сотрудница ${name} не отдыхала летом ни ${places[0]}, ни ${places[1]}, то она является сотрудником этой фирмы.`,
			`Только некоторые сотрудники отдыхали летом.`,
			`Есть сотрудники, которые не отдыхали вообще.`
		];


		NAtask.setTask({
			text: `Некоторые сотрудники фирмы летом отдыхали ${places[0]}, а некоторые — ${places[1]}. Все сотрудники, которые не отдыхали ${places[1]}, отдыхали ${places[0]}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510249
