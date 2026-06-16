(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '525447';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let total = sl(15, 30);
		let sugar = sl(3, (total * 0.5).floor());
		let lemon = sl(2, (total * 0.4).floor());
		let minNone = total - (sugar + lemon);

		let correct = [
			`Найдётся ${chislitlx(minNone,'кружка','r')} с чаем без сахара и лимона.`,
			`Не найдётся ${chislitlx(lemon + 1,'кружка','r')} с чаем без сахара, но с лимоном.`,
			`Максимум ${chislitlx(lemon,'кружка','r')} с лимоном могут быть без сахара.`,
			`Минимум${chislitlx(minNone,'кружка','r')} ничем не дополнены.`
		];
		let wrong = [
			`Найдётся ${chislitlx(lemon,'кружка','r')} с чаем с лимоном, но без сахара.`,
			`Если в кружке чай без сахара, то он с лимоном.`,
			`Все кружки с лимоном — без сахара.`,
			`Лимон кладут только в чай с сахаром.`
		];

		NAtask.setTask({
			text: `На столе стоят ${chislitlx(total,'кружка','r')} с чаем. В ${sugar} из них чай с сахаром, а в остальных — без сахара. В ${lemon} из этих ${chislitlx(total,'кружка','r')} официант собирается положить по дольке лимона.` +
				` Выберите утверждения, которые будут ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях независимо от того, в какие кружки официант положит дольки лимона. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ` +
				`Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=525447
