(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510904';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let items = sklonlxkand([
			['стол', 'доска', 'магнитофон', 'принтер'],
			['шкаф', 'зеркало', 'ноутбук', 'проектор'],
			['кресло', 'картина', 'колонки', 'сканер']
		].iz());
		let [A, B, C, D] = items;

		let correct = [
			`${D.ie.toZagl()} дороже ${B.re}.`,
			`${B.ie} ― самая дешёвая из покупок.`,
			`${D.ie} дороже ${C.re}, а ${C.ie} дороже ${B.re}.`,
			`${A.ie} дороже ${B.re}.`
		];
		let wrong = [
			`${C.ie} дешевле ${B.re}.`,
			`${D.ie} и ${B.ie} стоят одинаково.`,
			`${A.ie} дешевле ${B.re}.`,
			`${C.ie} самая дорогая покупка.`
		];

		NAtask.setTask({
			text: `Школа приобрела ${A.ie}, ${B.ie}, ${C.ie} и ${D.ie}. Известно, что ${D.ie} дороже ${C.re}, а ${B.ie} дешевле ${C.re} и дешевле ${A.re}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510904
