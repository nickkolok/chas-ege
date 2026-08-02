(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510269';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let houseNum = sl(10, 50);

		let correct = [
			`Хотя бы один из работающих жителей дома № ${houseNum} учится.`,
			`Хотя бы один из жителей дома № ${houseNum} работает.`,
			`Среди жителей есть те, кто и работает, и учится.`,
			`Есть жители, которые не работают и не учатся.`
		];
		let wrong = [
			`Все жители дома № ${houseNum} работают.`,
			`Среди жителей дома № ${houseNum} нет тех, кто не работает и не учится.`,
			`Каждый работающий обязательно учится.`,
			`Никто не занимается одновременно работой и учёбой.`
		];

		NAtask.setTask({
			text: `Среди жителей дома № ${houseNum} есть те, кто работает, и есть те, кто учится. А также есть те, кто не работает и не учится. Некоторые жители дома № ${houseNum}, которые учатся, ещё и работают. Выберите утверждения, которые `+(rand ? 'неверны' : 'верны') +
			` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510269
