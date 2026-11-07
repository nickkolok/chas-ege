(function () {
	'use strict';
	let preference = ['constant', 'sum', 'difference', 'reversedDifference'];
	let variant = getSelectedPreferenceFromList('5710382', preference);
	let base = sl(2, 13);
	let exponent = sl(1, 2);
	let [numerator, denominator] = [[base, 1], [1, base], [3, 4], [2, 3]].iz();
	let notation = '\\log_{' + numerator.texfrac(denominator) + '}';
	let argNumerator, argDenominator, otherNumerator, otherDenominator, right;
	let log = arg => notation + '{' + arg + '}';
	if (variant === 0) {
		if (numerator === 2 && denominator === 3 || numerator === 1 || sl1()) {
			exponent = -exponent;
		}
		if (sl(0, 4) === 0) {
			notation = '\\lg';
			numerator = 10;
			denominator = 1;
		}
		argNumerator = Math.pow(exponent > 0 ? numerator : denominator, Math.abs(exponent));
		argDenominator = Math.pow(exponent > 0 ? denominator : numerator, Math.abs(exponent));
		right = exponent;
	} else {
		notation = [notation, '\\lg', '\\ln', '\\log_{\\pi}', '\\log_{' + [0.2, 0.4, 1.2, 1.5].iz().ts() + '}'].iz();
		argNumerator = sl(2, 30);
		argDenominator = [1, 1, 2, 4, 5, 10].iz();
		[otherNumerator, otherDenominator] = [[sl(2, 9), 1], [1, sl(2, 9)]].iz();
		let n = variant === 1 ? argNumerator * otherNumerator : argNumerator * otherDenominator;
		let d = variant === 1 ? argDenominator * otherDenominator : argDenominator * otherNumerator;
		right = log(variant === 3 ? d.texfrac(n) : n.texfrac(d));
	}
	let x = sl(-16, 16) / 2;
	let slope = sl(1, 8).pm() * 2;
	let constant = (argNumerator - argDenominator * slope * x).texfrac(argDenominator);
	let left = log('(' + [slope + 'x', constant].slag0() + ')');
	if (variant !== 0) {
		let other = log(otherNumerator.texfrac(otherDenominator));
		left = variant === 3 ? other + '-' + left : left + (variant === 1 ? '+' : '-') + other;
	}
	chas2.task.setEquationTask({
		parts: [left, right],
		roots: x,
		enablePartsExchange: 0,
		enablePartsDivision: 0,
		preference: preference,
	}, { tags: { log: 1 } });
})();

// 000B44, 9E46FC, 12BCD9, BFC8A4, 303CC4, 57222E, EF75DE, 8BB157, BF2C8A, 29E840, 5B7246, B90136, 68AD0A, 89DDD4, AFC5C7, 0F6449, CEF34A, C906D1, CC93B2, A7732D, 72634A, BF4D26, 6417F3, BCA07A, 96179F, AB2703, 9B1803, 899A3B, C434F7, C7151D, E146D7, 87AC17, AE2830, 620044, 31A1D8, EC4C59, 5877E8, DA3AF1, F35D07, 2F3605, 039652, BFEC26, C022BC, BF4526, D70093, 448D7B, C5D2C9, C4335A, A74D7D, 72429C, E90A28, 921C50, 51DE10, 9C5949, 434D2D, 0C5620
