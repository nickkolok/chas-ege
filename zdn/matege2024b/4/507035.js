(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '507035';
		let preference = ['onlyNumber', 'numberWithFractorization'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();
		
		let primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

		let p_1 = primeNumbers.iz();
		let p_2 = primeNumbers.iz();
		let p_3 = primeNumbers.iz();

		genAssert(p_1 != p_2 && p_1 != p_3, 'Более одного совпадения');

		let number = p_1 * p_2 * p_3;
		let answer = (p_1 + 1) * (p_2 + 1) * (p_3 + 1);

		NAtask.setTask({

			text: 'Если $p_1$, $p_2$ и $p_3$ – простые числа, ' +
				'то сумма всех делителей числа $p_1 \\cdot p_2 \\cdot p_3$ равна $(p_1 +1)(p_2 +1)(p_3 +1)$. ' +
				the_orderToFind.toZagl() + ' сумму всех делителей числа $' + number + ['', ' = ' + p_1 + '\\cdot' + p_2 + '\\cdot' + p_3][rand] + '$.',
			answers: answer,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=507035
