(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '523098';
		let preference = ['amperageTask', 'voltageTask'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let second = sl(5, 30);
		let amperage = sl(5, 30);
		let voltage = sl(5, 30);
		let resistance = slKrome([amperage, voltage, second], 5, 30);

		let answer1 = amperage ** 2 * resistance * second;
		let answer2 = voltage ** 2 * second / resistance;

		if (rand === 0) {
			genAssert(answer1.isZ(), 'должно быть целым');
		} else {
			genAssert(answer2.isZ(), 'должно быть целым');
		}

		NAtask.setTask({

			text: 'Работа постоянного тока (в джоулях) вычисляется по формуле $' + ['A = I^2 Rt', 'A= \\frac{U^2 t}{R}'][rand] +
				'$, где ' + ['$I$ – сила тока (в амперах)', '$U$ – напряжение (в вольтах)'][rand] + ', ' +
				'$R$ – сопротивление (в омах), $t$ – время (в секундах). Пользуясь этой формулой, ' +
				the_orderToFind + ' $A$ (в джоулях), если $t = ' + second + '$ c, ' + ['$I = ' + amperage +'$ А', '$U = ' + voltage+'$'][rand] +
				' и $R = ' + resistance + '$ Ом.',
			answers: [answer1, answer2][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=523098
//https://mathb-ege.sdamgia.ru/problem?id=510314
