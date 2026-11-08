(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '338089';
		let preference = ['findQ', 'findI', 'findR', 'findT'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let I = sl(2, 10);
		let R = sl(1, 20);
		let t = sl(5, 60);
		let Q = I ** 2 * R * t;

		let descriptions = [
			'$Q$ — количество теплоты (в джоулях)',
			'$I$ — сила тока (в амперах)',
			'$R$ — сопротивление цепи (в омах)',
			'$t$ — время (в секундах)'
		];

		let givenParts = [
			'$Q = ' + Q + '$ Дж',
			'$I = ' + I + '$ А',
			'$R = ' + R + '$ Ом',
			'$t = ' + t + '$ с'
		];
		givenParts.splice(rand, 1);
		givenParts = givenParts.shuffleJoin(', ');

		NAtask.setTask({
			text: 'Закон Джоуля–Ленца можно записать в виде $Q = I^2Rt$, где ' +
				descriptions.shuffleJoin(', ') + '. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['количество теплоты $Q$', 'силу тока $I$', 'сопротивление цепи $R$', 'время $t$'][rand] +
				', если ' + givenParts + '.',
			answers: [Q, I, R, t][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=338089
