(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '338296';
		let preference = ['findT', 'findNu', 'findP', 'findV'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let R = 8.31;
		let nu = sl(10, 100, 0.2);
		let T = sl(100, 1500, 50);
		let V = sl(1, 20, 0.1);
		let P = (nu * R * T) / V;

		genAssertAlmostInteger(1000 * P, 'не более 3 знака после запятой');
		genAssert(P<100000, 'P не более 100 000');

		let givenParts = [
			'$T = ' + T + '$ К',
			'$\\nu = ' + nu + '$ моль',
			'$P = ' + P + '$ Па',
			'$V = ' + V + '$ м$^3$'
		];
		givenParts.splice(rand, 1)
		givenParts = givenParts.shuffleJoin(', ');

		let descriptions = [
			'$P$ — давление (в паскалях)',
			'$V$ — объём (в м$^3$)',
			'$\\nu$ — количество вещества (в молях)',
			'$T$ — температура (в кельвинах)'
		];

		NAtask.setTask({

			text: 'Закон Менделеева-Клапейрона можно записать в виде $PV = \\nu RT$, где ' + descriptions.shuffleJoin(', ') +
				', а $R$ — универсальная газовая постоянная, равная $8{,}31$ Дж/(К⋅моль). ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['температуру $T$', 'количество вещества $\\nu$', 'давление $P$', 'объём $V$'][rand] +
				', если ' + givenParts + '.',
			answers: [T, nu, P, V][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=338296
