(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '15959026';
	let preference = ['decimalInDenominator', 'decimalInNumerator', 'fractionInDenominator'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let answer = sl(2, 24) / 10;
	let denominator = sl(2, 9);
	let first = sl(11, 89) / 10;
	let decimal = value => String(Number(value.toFixed(5)));
	let expr;
	if (variant === 0) {
		let sign = [-1, 1].iz();
		let sum = sign === -1 ? first + '-' + decimal(first + denominator) :
			(first < denominator ? first + '+' + decimal(denominator - first) : decimal(first + denominator) + '-' + first);
		expr = decimal(denominator * answer) + '/(' + sum + ')';
	} else if (variant === 1) {
		let difference = sl1();
		let numerator = denominator * answer;
		let second = sl(11, 69) / 10;
		let left = difference ? numerator + second : sl(1, 9) * numerator / 10;
		let right = difference ? second : numerator - left;
		expr = '(' + decimal(left) + (difference ? '-' : '+') + decimal(right) + ')/' + denominator;
	} else {
		let divisor = [2, 4, 5, 8, 9, 10].iz();
		if (divisor === 9) {
			answer = 9 * sl(2, 24) / 100;
		}
		expr = decimal(answer * (1 + 1 / divisor)) + '/(1+1/' + divisor + ')';
	}
	NAtask.setEvaluationTask({expr, preference});
})();
// F383F2, 9EB20C, E94609, 637BBC, 57402E, 7676D3, C44ADA, C656CA, 98EC6B, 4A39D1, 4D4954, B5EDA5, E3ADA3, F74DCF, 12BEC3, 04609B, 45CEEC, 28E160, 834330, C10C86, F5CDF1, 5BF6F2, 225802, E5BF73, BD12B5, A339B2, 3738BA, 6D9814, 793A2E, 810250, 0FB1AE, 7DACA4, EEE6C2, 6B2D93, C2256C, E8070C, 85F707, 363D72, AC0825, 330BCB, F909B9, 212EBE, 5587BE, 643FB6, F631D3, EF32D1, 8B35D0, 251FAD, 1F9FC8, 4B14E9, 0ED461, 555C6A, 5FB639, FF0042, E7104E, E7D12E, 47338E, 608A1A, F2CBD3, D3F95A, 4F02AD, CA16AE, 8F8C96, 8B2FE9, 50FD69, 149B46, 210647, 51AA05, 5003B6, 8BFC55, 7BEAA4, 6C60E0, C5F16E, 62FB8D
