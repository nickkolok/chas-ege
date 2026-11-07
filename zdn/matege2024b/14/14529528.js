(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '14529528';
	let preference = ['sumTwo', 'sumThree', 'product', 'fraction', 'division'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let exp1 = sl(-3, 4);
	let exp2 = slKrome(exp1, -3, 4);
	let a = sl(11, 99) / 10;
	let b = sl(11, 99) / 10;
	let term = (coefficient, exponent) => coefficient.ts().replace(',', '{,}') + '\\cdot 10^{' + exponent + '}';
	let value = (coefficient, exponent) => coefficient * Math.pow(10, exponent);
	let expression, answer;
	if (variant < 2) {
		let exponents = variant === 0 ? [exp1, exp2] : [exp1, exp2, slKrome([exp1, exp2], -3, 4)].shuffle();
		let coefficients = variant === 0 ? [a, b] : exponents.map(() => sl(1, 9));
		expression = coefficients.map((coefficient, i) => term(coefficient, exponents[i])).join('+');
		answer = coefficients.map((coefficient, i) => value(coefficient, exponents[i])).sum();
	} else if (variant === 2) {
		exp1 = sl(-3, 5);
		exp2 = sl(-3, 4) - exp1;
		expression = '\\left(' + term(a, exp1) + '\\right)\\cdot\\left(' + term(b, exp2) + '\\right)';
		answer = value(a * b, exp1 + exp2);
	} else {
		b = sl(2, 5);
		let ratio = [0.2, 0.5, 1.5, 2, 3].iz();
		a = b * ratio;
		exp2 = sl(-3, 3);
		exp1 = exp2 + sl(-4, 6);
		let numerator = term(a, exp1);
		let denominator = term(b, exp2);
		expression = variant === 3 ? '\\frac{' + numerator + '}{' + denominator + '}' :
			'\\left(' + numerator + '\\right):\\left(' + denominator + '\\right)';
		answer = value(ratio, exp1 - exp2);
	}
	NAtask.setTask({
		text: 'Найдите значение выражения: $$' + expression + '$$',
		answers: Number(answer.toFixed(8)),
		preference,
	});
})();
// DDB3F8, 16230C, A70475, F104DF, 60515F, 1D1BC3, 86C8CA, CAC962, 2D4D4C, 607623, A0BDA1, 643331, 4253D8, A6B965, 1A7F76, B7A42C, 5C3BD8, 6339D3, 6C1052, C4D6EB, 8AA9EF, B6E36D, 317E63, 0FD38A, A1BC38, C4CB15, 188CF8, 98C416, 356588, 442D2B, 0B312C, D1A65F, B78FC7, 76BE3B, 902839, 2552BE, 05C350, E7FD43, 75CEA4, 0F8386, 7C476B, 194682, D2F708, 0AB31C, 2827EF, 5E0835, D4A743, 33D79B, B0EC3A
