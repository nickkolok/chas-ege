(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(1, 50);
		let b = slKrome([a], 1, 50);
		let c = slKrome([a, b], 1, 50);

		let answer = (a * b * c).cbrt();

		genAssertZ1000(answer, 'должно быть не более 3 - х знаков после запятой');

		NAtask.setTask({

			text: 'Среднее геометрическое трёх чисел $a$, $b$ и $c$ вычисляется по формуле $ g = \\sqrt[3]{abc}$. ' +
				the_orderToFind.toZagl() + ' среднее геометрическое чисел $' + a + '$, $' + b + '$, $' + c + '$.',
			answers: answer,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506276
