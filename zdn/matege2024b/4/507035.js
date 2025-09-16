(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '507035';
		let preference = ['onlyNumber', 'numberWithFractorization'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let p_1 = sl(1, 30);
		let p_2 = slKrome([p_1], 1, 30);
		let p_3 = slKrome([p_1, p_2], 1, 30);

		let number = p_1 * p_2 * p_3;
		let answer = (p_1 + 1) * (p_2 + 1) * (p_3 + 1);

		NAtask.setTask({

			text: 'Если $p_1$, $p_2$ и $p_3$ – различные простые числа, ' +
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
