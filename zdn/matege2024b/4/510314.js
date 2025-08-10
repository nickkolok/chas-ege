(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();

		let the_orderToFind = decor.orderToFind.iz();

		let R = sl(2, 15);
		let I = slKrome([R], 2, 10, 0.5);
		let U = slKrome([R], 2, 15);

		let answerP1 = I ** 2 * R;
		let answerP2 = U ** 2 / R;
		genAssertZ1000(answerP2, 'не более 3-х знаков после запятой');


		NAtask.setTask({

			text: '',
			questions: [
				{
					text: 'Мощность постоянного тока(в ваттах) вычисляется по формуле $P = I^2R$, где $I$ – сила тока(в амперах), $R$ – сопротивление (в омах).' +
						' Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['$P$ (в ваттах)', '$R$ (в омах)'][rand] +
						', если ' + ['$R = ' + R + '$ Ом', '$P = ' + answerP1 + '$ Вт'][rand] + ' и $I = ' + I + '$ А.',
					answers: [answerP1, R][rand],
				},
				{
					text: 'Мощность постоянного тока (в ваттах) вычисляется по формуле $P =\\frac{U^2}{R} $,где $U$ – напряжение(в вольтах), $R$ – сопротивление(в омах).' +
						' Пользуясь этой формулой, ' + the_orderToFind + ' $P$ (в ваттах), если $R = ' + R + '$ Ом и $U = ' + U + '$ В.',
					answers: answerP2,
				},
			],
			postquestion: '',

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510314

