(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(1, 12);
		let b = slKrome([a], 1, 12);
		let c = slKrome([a, b], 1, 12);

		genAssert(isValidTriangle(a, b, c) === true, 'Должно выполняться правило треугольника');

		let answer = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);

		genAssert(answer != 0, 'Ответ не ноль');
		genAssertZ1000(answer, 'Должно быть не более 3 знаков после запятой');

		NAtask.setTask({

			text: 'Теорему косинусов можно записать в виде  $\\cos{\\gamma} = \\frac{a^2 + b^2 - c^2}{2ab}$' +
				', где $a$, $b$ и $c$ - стороны треугольника, а $\\gamma$ - угол между $a$ и $b$.' +
				' Пользуясь этой формулой, ' + the_orderToFind + ' $\\cos{\\gamma}$' +
				', если ' + '$a =' + a + '$' + ', $b =' + b + '$, $c=' + c + '$.',
			answers: answer,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=509669
