(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510303';
		let preference = ['findS', 'findSinA'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let b = sl(10, 25);
		let c = sl(3, b - 2);
		let deNum = sl(3, 15);
		let num = (1, deNum - 1);
		let sinA = num / deNum;

		if (rand === 1) {
			genAssertZ1000(sinA, 'не более 3-х знаков после запятой');
		}

		let S = 0.5 * b * c * sinA;

		genAssertZ1000(S, 'не более 3-х знаков после запятой');


		NAtask.setTask({

			text: 'Площадь треугольника можно вычислить по формуле $S = \\frac{1}{2}bc \\sin{\\alpha}$, где $b$ и $c$ – две стороны треугольника, ' +
				'$\\alpha$ – угол между ними. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['площадь $S$', 'величину  $\\sin{\\alpha}$'][rand] + ', если $b = ' + b + '$, $c =' + c + '$' +
				' и ' + ['$\\sin{\\alpha}= \\frac{' + num + '}{' + deNum + '}$', '$S =' + S + '$'][rand] + '.',
			answers: [S, sinA][rand],
			preference: preference,



		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510303
//https://mathb-ege.sdamgia.ru/problem?id=520532
