(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510314';
		let preference = ['ampereP', 'ampereR', 'volt'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let R = sl(2, 15);
		let I = slKrome([R], 2, 10, 0.5);
		let U = slKrome([R], 2, 15);

		let answerP1 = I ** 2 * R;
		let answerP2 = U ** 2 / R;

		let formula = '';

		if (rand < 2) {
			formula = '$P = I^2R$, где $I$ – сила тока (в амперах)';
		} else {
			formula = '$P =\\frac{U^2}{R} $, где $U$ – напряжение (в вольтах)';
			genAssertZ1000(answerP2, 'не более 3-х знаков после запятой');
		}

		NAtask.setTask({

			text: 'Мощность постоянного тока (в ваттах) вычисляется по формуле ' + formula + ', $R$ – сопротивление (в омах).' +
				' Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['$P$ (в ваттах)', '$R$ (в омах)', '$P$ (в ваттах)'][rand] +
				', если ' + ['$R = ' + R + '$ Ом' + ' и $I = ' + I + '$ А', '$P = ' + answerP1 + '$ Вт' + ' и $I = ' + I + '$ А', '$R = ' + R + '$ Ом и $U = ' + U + '$ В'][rand] + '.',
			answers: [answerP1, R, answerP2][rand],
			preference: preference,



		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510314

