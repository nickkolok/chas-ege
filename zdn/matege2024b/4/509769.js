(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let v = sl(2, 15);
		let m = sl(2, 15);

		let E = (m * v ** 2) / 2;

		NAtask.setTask({

			text: 'Кинетическая энергия тела (в джоулях) вычисляется по формуле $E =\\frac{mv^2}{2}$, где ' +
				'$m$ – масса тела (в килограммах), а $v$ – его скорость (в м/с). Пользуясь этой формулой, ' +
				the_orderToFind + ' $E$ (в джоулях), если $v = ' + v + '$ м/с и $m = ' + m + '$ кг.',
			answers: E,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509769
