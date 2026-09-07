(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510269';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let people = ['дачников', 'садоводов', 'жителей', 'фермеров'].iz();
		let location = ['посёлке', 'селе', 'деревне', 'городе'].iz();
		let item1 = ['виноград', 'картофель', 'лук', 'чеснок'].iz();
		let item2 = ['груши', 'яблоки', 'сливы', 'вишни'].iz();

		let correct = [
			`Среди тех, кто выращивает ${item1}, есть ${people} из этого ${location}.`,
			`Есть хотя бы один ${people} в этом ${location}, который выращивает и ${item2}, и ${item1}.`,
			`Некоторые ${people}, выращивающие ${item1}, также выращивают и ${item2}.`,
			`Существуют ${people} в этом ${location}, которые не выращивают ни ${item1}, ни ${item2}.`
		];
		let wrong = [
			`Если ${people} из этого ${location} не выращивает ${item1}, то он выращивает ${item2}.`,
			`Если ${people} в этом ${location} выращивает ${item1}, то он не выращивает ${item2}.`,
			`Все ${people} в этом ${location} выращивают либо ${item1}, либо ${item2}.`,
			`Никто из ${people} не выращивает одновременно ${item1} и ${item2}.`
		];

		NAtask.setTask({
			text: `Среди ${people} в ${location} есть те, кто выращивает ${item1}, и есть те, кто выращивает ${item2}. А также есть те, кто не выращивает ни ${item1}, ни ${item2}. Некоторые ${people} в этом ${location}, выращивающие ${item1}, также выращивают и ${item2}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510269
// Исходный номер задачи: DE39F4
