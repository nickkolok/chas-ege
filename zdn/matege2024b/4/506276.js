(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506276';
		let preference = ['geometric', 'quadratic', 'harmonic'];
		let rand = getSelectedPreferenceFromList(key, preference);

		genAssert(!sl(0, 25) || rand !== 2, 'Среднее гармоническое появляется слишком часто');

		let the_orderToFind = decor.orderToFind.iz();
		let word = ['геометрическое', 'квадратичное', 'гармоническое'][rand];

		let a = sl(1, 50);
		let b = slKrome([a], 1, 50);
		let c = slKrome([a, b], 1, 50);

		let answer = [(a * b * c).cbrt(), ((a ** 2 + b ** 2 + c ** 2) / 3).sqrt(), 3 / (a + b + c)][rand];

		genAssertZ1000(answer, 'Должно быть не более 3 знаков после запятой');

		NAtask.setTask({

			text: 'Среднее ' + word + ' трёх чисел $a$, $b$ и $c$ вычисляется по формуле $ ' +
				['g = \\sqrt[3]{abc}', 'q = \\sqrt{\\frac{a^2+b^2+c^2}{3}}', 'h =  \\left(\\frac{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}}{3} \\right)^{-1}'][rand] + '$. ' +
				the_orderToFind.toZagl() + ' среднее ' + word +
				' чисел $' + [a, a, '\\frac{1}{' + a + '}'][rand] + '$, $' + [b, b, '\\frac{1}{' + b + '}'][rand] + '$, $' + [c, c, '\\frac{1}{' + c + '}'][rand] + '$.',
			answers: answer,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506276
//https://mathb-ege.sdamgia.ru/test?likes=506737
//https://mathb-ege.sdamgia.ru/test?likes=506507
