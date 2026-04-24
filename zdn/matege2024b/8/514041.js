(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514041';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let total = sl(40, 60);
		let cinnamon = sl(10, Math.floor(total * 0.4));
		let sugar = sl(15, Math.floor(total * 0.5));
		let maxBoth = Math.min(cinnamon, sugar);
		let minNone = total - (cinnamon + sugar);

		let correct = [
			`Найдётся ${minNone} рогаликов, которые ничем не посыпаны.`,
			`Не может оказаться больше ${maxBoth} рогаликов, посыпанных и сахаром, и корицей.`,
			`Минимальное число рогаликов без посыпки — ${minNone}.`,
			`Максимальное число рогаликов с обеими посыпками — ${maxBoth}.`,
		];
		let wrong = [
			`Если рогалик посыпан сахаром, то он посыпан и корицей.`,
			`Найдётся ${chislitlx(sugar, 'рогалик')} рогаликов, посыпанных и сахаром, и корицей.`,
			`Все рогалики посыпаны хотя бы чем-то.`,
			`Нет ни одного рогалика без посыпки.`,
		];

		NAtask.setTask({
			text: `Повар испёк ${chislitlx(total, 'рогалик')} рогаликов, из них ${chislitlx(cinnamon, 'рогалик')} он посыпал корицей, а ${chislitlx(sugar, 'рогалик')} посыпал сахаром. Выберите одно или несколько утверждений, которые ` +
				(rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514041
