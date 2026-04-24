(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511971';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let expensive = sklonlxkand(['рыба', 'слон', 'крабовые палочки', 'сыр'].iz());
		let medium = sklonlxkand(['чай', 'печенье', 'колбаса', 'мороженое',].iz());
		let cheap = sklonlxkand(['йогурт', 'сок', 'морс', 'сухари'].iz(2));

		let correct = [
			`${cheap[0].ie.toZagl()} стоил дешевле ${expensive.re}.`,
			`${expensive.ie.toZagl()} — самая дорогая из покупок.`,
			`${medium.ie.toZagl()} дороже ${cheap[1].re}, но дешевле ${expensive.re}.`,
			`${cheap[0].ie.toZagl()} дешевле ${medium.re}.`
		];
		let wrong = [
			`За ${cheap[0].ie} заплатили больше, чем за ${medium.ve}.`,
			`Среди указанных четырёх покупок есть три, стоимость которых одинакова.`,
			`${cheap[1].ie.toZagl()} дороже ${expensive.re}.`,
			`${cheap[0].ie.toZagl()} — самая дорогая покупка.`
		];

		NAtask.setTask({
			text: `Хозяйка к празднику купила ${cheap[0].ve}, ${medium.ve}, ${cheap[1].ve} и ${expensive.ve}. ${medium.ie.toZagl()} стоило дороже ${cheap[1].re}, но дешевле ${expensive.re}, ${cheap[0].ie} стоил дешевле ${medium.re}. Выберите утверждения, которые ` +
				(rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511971
