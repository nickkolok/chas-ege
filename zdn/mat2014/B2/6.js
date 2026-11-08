(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let item = sklonlxkand((om.meltov.ie).iz());
		let prise = sl(20, 200, 10);
		let payment = sl(10, 2000, 5) + prise * 2;
		let margin = sl(3, 80);
		let count = sl(2, 20);

		let result = prise * (1 + 0.01 * margin);

		NAtask.setTask({
			text: 'Магазин закупает ' + item.im + ' по оптовой цене ' + '$' + prise + '$' +
				' рублей и продаёт с наценкой ' + '$' + margin + '$' + '%. ',
			questions: [
				{
					text:
						'Какое наибольшее число ' + item.rm + ' можно купить за ' + '$' + payment + '$' + ' рублей',
					answers: (payment / result).floor(),
				},
				{
					text:
						'Сколько рублей будут стоить ' + chislitlx(count, item, '$') + ', купленных в этом магазине',
					answers: result * count,
				}
			],
			postquestion: '?',
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 100);
})();
//Обзад 26621
//zer00player
//https://ege.sdamgia.ru/test?likes=26621
