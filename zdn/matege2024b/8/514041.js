(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514041';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let bread = sklonlxkand(['рогалик','бублик','булочка','пирожок','ватрушка','плюшка','крендель'].iz());
		let total = sl(40, 60);
		let cinnamon = sl(10, Math.floor(total * 0.4));
		let sugar = sl(15, Math.floor(total * 0.5));
		let maxBoth = Math.min(cinnamon, sugar);
		let minNone = total - (cinnamon + sugar);

		let correct = [
			`Найдётся ${chislitlx(minNone, bread, 'r')}, которые ничем не посыпаны.`,
			`Не может оказаться больше  ${chislitlx(minNone, bread, 'r')}, посыпанных и сахаром, и корицей.`,
			`Минимальное число ${bread.rm} без посыпки — ${minNone}.`,
			`Максимальное число ${bread.rm} с обеими посыпками — ${maxBoth}.`,
		];
		let wrong = [
			`Если ${bread.ie} посыпан${['','а'][bread.rod]} сахаром, то он${['','а'][bread.rod]} посыпан${['','а'][bread.rod]} и корицей.`,
			`Найдётся ${chislitlx(sugar, bread)}, посыпанных и сахаром, и корицей.`,
			`Все ${bread.im} посыпаны хотя бы чем-то.`,
			`Нет ни ${['одного','одной'][bread.rod]} ${bread.re} без посыпки.`,
		];

		NAtask.setTask({
			text: `Повар испёк ${chislitlx(total, bread)}, из них ${chislitlx(cinnamon, bread)} он посыпал корицей, а ${chislitlx(sugar, 'рогалик')} посыпал сахаром. Выберите одно или несколько утверждений, которые ` +
				(rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514041
