(function () {
	'use strict';
	let preference = ['product', 'quotient', 'commonFactorSum'];
	let variant = getSelectedPreferenceFromList('8864498', preference);
	let base = [2, 3, 4, 5, 6, 7, 11, 13].iz();
	let x, left, right;
	if (variant === 2) {
		x = sl(0, 3);
		let multiplier = sl(2, 9);
		let power = base + '^x';
		left = power + '+' + multiplier + '\\cdot ' + power;
		right = (1 + multiplier) * Math.pow(base, x);
	} else {
		let reciprocal = sl1();
		let notation = reciprocal ? '\\left(' + (1).texfrac(base) + '\\right)' : base;
		let sign = variant === 0 ? 1 : -1;
		x = sl(-12, 12) / 2;
		let step = x.isZ() ? 1 : 2;
		let slope = sl(1, 4).pm();
		let other = slKrome([0, -sign * slope], -4, 4);
		let exponent = sl(-3, 3);
		let constant = sl(-8, 8);
		let first = notation + '^{' + [step * slope + 'x', constant].slag0() + '}';
		let second = notation + '^{' + [step * other + 'x',
			sign * (exponent - step * (slope + sign * other) * x - constant)].slag0() + '}';
		left = first + (variant === 0 ? '\\cdot ' : ':') + second;
		let power = reciprocal ? -exponent : exponent;
		right = power < 0 ? (1).texfrac(Math.pow(base, -power)) : Math.pow(base, power);
	}
	chas2.task.setEquationTask({
		parts: [left, right],
		roots: x,
		enablePartsExchange: 0,
		enablePartsDivision: 0,
		preference: preference,
	}, { tags: { pokaz: 1 } });
})();

// 8742F2, 0457CC, BD64B5, 9EF272, 11E78B, 33ED55, FE613F, 932B38, 12A885, CABB89, C04344, 93A681, ED3E55, E81FAF, 8485BB, 730173, 4EAC0E, 750D25, 52DBED, 4C8528, E39A4C, 45E333, B82B48, 0CE753, 427BC4, A4FC2B, 672DB1, 05FA68, 792419, B86EBF, AB5E56, F4928F, BB944A, E6A20D, C31E32, 2F867E, 2F6AF2, 9818FD, ECF71B, 7038B4, D92B9E
