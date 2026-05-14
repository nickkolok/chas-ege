(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514751';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let fishCount = sl(20, 50);
		let minLen = sl(3, 5);
		let maxLen = sl(minLen + 2, 12);

		let correct = [
			`В этом аквариуме нет рыбки длиной ${maxLen + sl(1, 10)}см.`,
			`Разница в длине любых двух рыбок не больше ${maxLen - minLen}см.`,
			`Все рыбки длиннее ${minLen - 1}см.`,
			`Не существует рыбки короче ${minLen}см.`
		];
		let wrong = [
			`${sl(3, 15)} рыбок в этом аквариуме короче ${minLen}см.`,
			`Длина каждой рыбки больше ${maxLen}см.`,
			`Все рыбки имеют длину ровно ${maxLen}см.`,
			`Разница в длине может достигать ${maxLen - minLen + sl(1, 10)}см.`,
			`Есть рыбка длиной ${minLen - 2}см.`
		];

		NAtask.setTask({
			text: `В зоомагазине в один из аквариумов запустили ${fishCount} рыбок. Длина каждой рыбки больше ${minLen} см, ` +
				`но не превышает ${maxLen}см.. Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.` +
				` Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514751
