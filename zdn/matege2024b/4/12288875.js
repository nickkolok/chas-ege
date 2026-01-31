(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let U = sl(10, 20);
		let C_exp = -4;
		let C = Math.pow(10, C_exp);

		let W = (C * U * U) / 2;

		genAssertZ1000(W * 100, 'должно быть не более пяти знаков после запятой в W');

		NAtask.setTask({
			text: 'Энергия заряженного конденсатора $W$ (в Дж) вычисляется по формуле ' +
				'$W = \\frac{CU^2}{2}$, где $C$ — ёмкость конденсатора (в Ф), ' +
				'а $U$ — разность потенциалов на обкладках конденсатора (в В). ' +
				'Найдите $W$ (в Дж), если $C = 10^{' + C_exp + '}$ Ф и $U = ' + U + '$ В.',
			answers: W,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//12288875
//Открытый банк заданий BB836B
//zer00player
