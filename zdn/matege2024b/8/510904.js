(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510904';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let items = sklonlxkand(['стол', 'доска', 'магнитофон', 'принтер','шкаф', 'зеркало',
								 'ноутбук', 'проектор','кресло', 'картина', 'колонки', 'сканер',].iz(4));

		let correct = [
			`${items[3].ie.toZagl()} дороже ${items[1].re}.`,
			`${items[1].ie.toZagl()} ― самая дешёвая из покупок.`,
			`${items[3].ie.toZagl()} дороже ${items[2].re}, а ${items[2].ie} дороже ${items[1].re}.`,
			`${items[0].ie.toZagl()} дороже ${items[1].re}.`
		];
		let wrong = [
			`${items[2].ie.toZagl()} дешевле ${items[1].re}.`,
			`${items[3].ie.toZagl()} и ${items[1].ie} стоят одинаково.`,
			`${items[0].ie.toZagl()} дешевле ${items[1].re}.`,
			`${items[2].ie.toZagl()} ― самая дорогая покупка.`
		];

		NAtask.setTask({
			text: `Школа приобрела ${items[0].ve}, ${items[1].ve}, ${items[2].ve} и ${items[3].ve}. Известно, что ${items[3].ie} дороже ${items[2].re}, а ${items[1].ie} дешевле ${items[2].re} и дешевле ${items[0].re}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510904
