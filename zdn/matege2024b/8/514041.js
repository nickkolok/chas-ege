(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514041';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let colors = ['красн', 'зелен', 'фиолетов', 'черн', 'бел', 'жёлт'].iz(3);
		let name = sklonlxkand(om.femaleNames.iz());
		let count1 = sl(5, 15);
		let count2 = sl(6, 15);
		let total = count1 + count2;
		let drawn = sl(2, Math.min(6, total));

		let correct = [
			'Найдётся $' + Math.max(1, count2 - drawn) + '$ ' + colors[1] + 'ых шарика без рисунков.',
			'Не найдётся $' + (drawn + sl(1, 5)) + '$ ' + colors[1] + 'ых шариков с рисунками.',
			'Среди нарисованных шариков может не быть ни одного ' + colors[2] + 'ого.',
			'Максимум ' + count2 + ' ' + colors[1] + 'ых шариков без рисунков.'
		];

		let wrong = [
			'Если шарик ' + colors[0] + 'ый, то на нём есть рисунок.',
			'Найдётся ' + drawn + ' ' + colors[0] + 'ых шарика с рисунками.',
			'Все нарисованные шарики — ' + colors[0] + 'ые.',
			'Нет ни одного ' + colors[1] + 'ого шарика с рисунком.'
		];

		NAtask.setTask({
			text: name.de + ' на день рождения подарили $' + total + '$ шариков, из них $' + count1 + '$ ' + colors[0] + 'ые, а остальные — ' + colors[1] + 'ые. ' + name.ie +
				' на $' + drawn + '$ случайных шариках нарисовала рисунки маркером, чтобы подарить маме, папе, брату и сестре. Выберите все утверждения, которые будут ' + (rand ? 'неверны' : 'верны') +
				' при указанных условиях независимо от того, на каких шариках ' + name.ie + ' нарисовала рисунки. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.' +
				' Если ответов несколько, записывайте их номера в порядке возрастания.',
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514041
