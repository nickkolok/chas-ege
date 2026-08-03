(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k = 9 * Math.pow(10, 9);
		let rand = sl1();

		let q1 = sl(2, 50) * 0.0001;
		let q2 = slKrome([q1], 2, 50) * 0.0001;
		let r = sl(100, 900, 10);

		let F = k * (q1 * q2) / r ** 2;

		genAssertAlmostInteger(10000 * F, 'не более 4 знака после запятой');

		NAtask.setTask({
			text: 'Сила взаимодействия точечных зарядов вычисляется по формуле $F = k\\frac{q_1q_2}{r^2}$, ' +
				'где $F$ – сила взаимодействия (в ньютонах), $q_1$ и $q_2$ – величины зарядов (в кулонах), ' +
				'$k = 9 \\cdot 10^9~$ (в Н$\\cdot$м$^2$/Кл$^2$) – коэффициент пропорциональности, ' +
				'$r$ – расстояние между зарядами (в метрах). ' +
				'Пользуясь формулой, найдите величину заряда $q_' + ['1', '2'][rand] + '$ (в кулонах), если ' +
				'$q_' + ['1', '2'][1 - rand] + ' = ' + q2 + '$ Кл, $r = ' + r + '$ м, а $F = ' + F + '$ Н.',
			answers: q1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=318530
