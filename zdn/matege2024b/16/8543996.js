(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '8543996';
	let preference = ['scaledLogs', 'sum', 'difference', 'nested'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let base = sl(2, 8);
	let otherBase = slKrome(base, 2, 8);
	let exponent = sl(1, 4);
	let power = base ** exponent;
	let log = (b, x) => 'varlog(' + b + ',' + x + ')';
	let expr;
	if (variant === 0) {
		let exponents = [[-1, 1], [1, -1]].iz();
		let argument = (b, e) => e === 1 ? b : '1/' + b;
		let coefficient = sl(2, 8);
		expr = coefficient + '*' + log(base, argument(base, exponents[0])) +
			'+' + slKrome(coefficient, 2, 8) + '*' + log(otherBase, argument(otherBase, exponents[1]));
	} else if (variant === 1) {
		let divisor = [2, 4, 5, 10].iz();
		expr = log(base, 1 / divisor) + '+' + log(base, divisor * power);
	} else if (variant === 2) {
		let divisor = sl(2, 15);
		expr = log(base, divisor * power) + '-' + log(base, divisor);
	} else {
		let innerValue = sl(1, 5);
		let inner = log(otherBase, otherBase ** innerValue);
		let offset = power - innerValue;
		expr = log(base, inner + (offset > 0 ? '+' + offset : offset < 0 ? String(offset) : ''));
	}
	NAtask.setEvaluationTask({expr, preference});
})();
// 825EFC, F4ACA9, 75B2FE, B38FFD, D6AC77, A08871, AD35DC, 8B445D, DC10CF, FD706E, AB626E, 694731, 13494A, 14F2D9, 0E8BA9, E08AA3, 68A03B, 3C2B34, 797D8A, 86FA83, 4C7E0E, F43F05, CB127A, 03602D, 1D63D7, 2BC6DD, 3CD8D7, 89A959, 8982AA, 51CA32, 21CC92, 96AF8D, 2133F2, FE737C, C7427B, A4D6A1, CFD163, 63CC8B, 0FABAB, 2D268A, 121F0E, 1C2CB9, 47DD86, F8D3F7, B0AC09, D1D604, 9D2209, 5600B0, 264E17, 685D1D, 8B8A15, 1E7825, 4A04DE, 1F905D, 465DA6, B903AA, 174EAE, 1883CE, C0DDC4, A51431, 355137, 553181, 513383, 36F589, CD3171, 094B43, D26279, 772514, 806AA5, BE89C0, 867C66
