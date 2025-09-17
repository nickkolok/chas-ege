(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514383';
		let preference = ['findS', 'findB'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(3, 30);
		let b = slKrome([a], 3, 30);
		let c = slKrome([a, b], 3, 30);
		let deNum = sl(3, 99);
		let num = (1, deNum - 1);
		let S = a * b * c / (4 * deNum / num);

		genAssertZ1000(S, 'Не более 3 знаков после запятой');


		NAtask.setTask({
			text: 'Площадь треугольника можно вычислить по формуле $S = \\frac{abc}{4R}$, где $a$, $b$ и $c$ – стороны треугольника,' +
				' а $R$ – радиус окружности, описанной около этого треугольника. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['площадь $S$', '$b$'][rand] + ', если $a = ' + a + '$, ' +
				'$c =' + c + '$, ' + ['$b =' + b + '$', '$S =' + S + '$'][rand] +
				' и $R= \\frac{' + deNum + '}{' + num + '}$. ',
			answers: [S, b][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=514383

