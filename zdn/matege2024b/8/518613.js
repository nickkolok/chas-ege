(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '518613';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let colors = om.trickyColors.iz(3);
		let colorsRM = colors.slice(0,3).map(c => c.replace('ий', 'их').replace('ый', 'ых').replace('ой', 'ых'));
		let colorsRE = colors.slice(0,3).map(c => c.replace('ий', 'его').replace('ый', 'ого').replace('ой', 'ого'));
		let colorsVM = colors.slice(0,3).map(c => c.replace('ий', 'ие').replace('ый', 'ые').replace('ой', 'ые'));
		let name = sklonlxkand(om.femaleNames.iz());
		let count1 = sl(5, 15);
		let count2 = sl(6, 15);
		let total = count1 + count2;
		let drawn = sl(2, Math.min(6, total));

		let correct = [
			'Найдётся ' + chislitlx(Math.max(1, count2 - drawn), 'шарик', '$', (' '+colorsRM[1]+' ')) + ' без рисунков.',
			'Не найдётся ' + chislitlx(drawn + sl(1, 5), 'шарик', '$', (' '+colorsRM[1]+' ')) + ' с рисунками.',
			'Среди нарисованных шариков может не быть ни одного ' + colorsRE[2] + '.',
			'Максимум ' + chislitlx(count2, 'шарик', '$', (' '+colorsRM[1]+' ')) + ' без рисунков.'
		];

		let wrong = [
			'Если шарик ' + colors[0] + ', то на нём есть рисунок.',
			'Найдётся ' + chislitlx(drawn, 'шарик', '$', (' '+colorsRM[1]+' ')) + ' шарика с рисунками.',
			'Все нарисованные шарики — ' + colorsVM[0] + '.',
			'Нет ни одного ' + colorsRE[1] + ' шарика с рисунком.'
		];

		NAtask.setTask({
			text: name.de + ' на день рождения подарили ' + chislitlx(total, 'шарик', '$v') + ', из них $' + count1 + '$ ' + colorsRM[0] + ', а остальные — ' + colorsVM[1] + '. ' + name.ie +
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
// https://mathb-ege.sdamgia.ru/problem?id=518613
