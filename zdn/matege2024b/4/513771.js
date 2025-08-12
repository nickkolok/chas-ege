(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();

		let the_orderToFind = decor.orderToFind.iz();

		let C = sl(1, 10);
		let q = slKrome([C], 2, 15);
		let U = slKrome([C], 2, 15);

		let answer1 = q ** 2 / (2 * 0.0001 * C);
		let answer2 = C * U ** 2 / 2;
		
		if (rand === 0) {
			genAssertZ1000(answer1, 'должно быть не более 3-х знаков после запятой');
		} else {
			genAssertZ1000(answer2, 'должно быть не более 3-х знаков после запятой');
		}

		NAtask.setTask({

			text: 'Энергия заряженного конденсатора $W$ (в Дж) вычисляется по формуле $' + ['W = \\frac{q^2}{2C}', 'W = \\frac{CU^2}{2}'][rand] +
				'$, где $C$ – ёмкость конденсатора(в Ф), а ' +
				['$q$ – заряд на одной обкладке конденсатора (в Кл)', '$U$ – разность потенциалов на обкладах конденсатора (в В)'][rand] + '. ' +
				the_orderToFind.toZagl() + ' $W$ (в Дж), если $C$ = $' + C + '\\cdot 10^{-4}$ Ф и ' + ['$q = ' + q + '$ Кл', '$U = ' + U + '$ B'][rand] +
				'.',
			answers: [answer1, answer2][rand],

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=513771
//https://mathb-ege.sdamgia.ru/problem?id=513811
