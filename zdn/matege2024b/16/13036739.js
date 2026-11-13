(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '13036739';
	let preference = ['cosFromSin', 'sinFromCos', 'tangentFromCos', 'tangentFromSin'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let quadrant = sl(0, 3);
	let sinSign = [1, 1, -1, -1][quadrant];
	let cosSign = [1, -1, -1, 1][quadrant];
	let lower = 90 * quadrant;
	let upper = lower + 90;
	let givenIsSin = variant === 0 || variant === 3;
	let given = givenIsSin ? 'sin' : 'cos';
	let wanted = ['cos', 'sin', 'tg', 'tg'][variant];
	let sign = givenIsSin ? sinSign : cosSign;
	let numerator, denominator, answer;
	if (variant < 2) {
		let radius = [4, 5, 8, 10, 20].iz();
		let leg = sl(1, radius - 1);
		numerator = (radius * radius - leg * leg).texsqrt(true);
		denominator = radius;
		answer = (givenIsSin ? cosSign : sinSign) * leg / radius;
	} else {
		let divisor = [1, 2, 4, 5, 8, 10].iz();
		let other = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(n => n !== divisor && n.nod(divisor) === 1).iz();
		numerator = givenIsSin ? other : divisor;
		denominator = (divisor * divisor + other * other).texsqrt(true);
		answer = sinSign * cosSign * other / divisor;
	}
	NAtask.setTask({
		text: 'Найдите $\\operatorname{' + wanted + '}\\alpha$, если $\\operatorname{' + given +
			'}\\alpha=' + (sign < 0 ? '-' : '') + '\\frac{' + numerator + '}{' + denominator +
			'}$ и $' + lower + '^\\circ<\\alpha<' + upper + '^\\circ$.',
		answers: answer,
		preference,
	});
})();
// C6ECC3, E5C35F, 3F2A9B, 116188, EEDC72, DA58EE, B787FB, CF14AA, 12B2C8, 59B152, 2141D5, 2D55C7, 80DB83, EE6CDB, BA9184, 129451, B84143, 63874F, 72ACA3, EC2988
