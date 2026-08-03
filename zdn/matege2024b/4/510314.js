(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510314';
		let preference1 = ['ampereP', 'ampereR', 'volt'];
		let preference2 = ['lessWords', 'moreWords'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

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
				' Пользуясь этой формулой, ' + the_orderToFind + ' ' +
				[['$P$ (в ваттах)', '$R$ (в омах)', '$P$ (в ваттах)'][rand], ['мощность постоянного тока $P$', 'сопротивление $R$', 'мощность постоянного тока $P$'][rand]][rand2] +
				', если ' + [['$R = ' + R + '$ Ом' + ' и $I = ' + I + '$ А', '$P = ' + answerP1 + '$ Вт' + ' и $I = ' + I + '$ А', '$R = ' + R + '$ Ом и $U = ' + U + '$ В'][rand],
				['сопротивление', 'мощность постоянного тока', 'сопротивление'][rand] + ' составляет ' +
				['$' + R + '$ Ом', '$' + answerP1 + '$ Вт', '$' + R + '$ Ом'][rand] + ', а ' + ['сила тока', 'сила тока', 'напряжение'][rand] + ' равн' + ['а', 'а', 'о'][rand] + ' ' +
				['$' + I + '$ А', '$' + I + '$ А', '$' + U + '$ В'][rand] + '. Ответ дайте в ' + ['ваттах', 'омах', 'ваттах'][rand]][rand2] + '.',
			answers: [answerP1, R, answerP2][rand],
			preference: [preference1, preference2],



		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510314

