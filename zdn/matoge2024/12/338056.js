(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();
		let the_orderToFind = decor.orderToFind.iz();

		let m1 = sl(2, 10, 0.5);
		let m2 = slKrome([m1], 2, 10, 0.5);
		let gamma = 6.67 * Math.pow(10, -11);
		let r = sl(1, 9, 0.5);
		let F = gamma * (m1 * m2.pow(9)) / r ** 2;

		genAssert((100000 * F).isAlmostInteger(), 'не более 6 знаков после запятой');

		NAtask.setTask({
			text: 'Закон всемирного тяготения можно записать в виде $F = \\gamma\\frac{m_1m_2}{r^2}$, ' +
				'где $F$ - сила притяжения между телами (в ньютонах), $m_1$ и $m_2$ – массы тел (в килограммах), ' +
				'$r$ – расстояние между центрами масс (в метрах), а $\\gamma$ – гравитационная постоянная, ' +
				'равная $6{,}67 \\cdot 10^{-11}$ Н·м$^2$/кг$^2$. ' +
				'Пользуясь формулой, ' + the_orderToFind + ' массу тела $m_' + ['1', '2'][rand] + '$ (в килограммах), если ' +
				'$F = ' + F + '$ Н, $m_' + ['1', '2'][1 - rand] + ' = ' + m2 + '\\cdot 10^9$ кг, $r = ' + r + '$ м.',
			answers: m1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=338056
