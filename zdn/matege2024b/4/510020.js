(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let x = sl(1, 50, 0.5);
		let k = sl(2, 15);
		let F = k * x;

		NAtask.setTask({

			text: 'Закон Гука можно записать в виде $F = kx$, где $F$ - сила (в ньютонах), с которой растягивают пружину,' +
				' $x$ — абсолютное удлинение пружины (в метрах), а $k$ — коэффициент упругости. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $x$ (в метрах), если $F =' + F + ' $ Н и $k =' + k + ' $ Н/м.',
			answers: x,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=510020
