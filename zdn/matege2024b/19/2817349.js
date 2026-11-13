(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		const preference = ['even', 'odd'];
		const parity = getSelectedPreferenceFromList('2817349', preference);
		const divisor = (parity ? [11, 15, 25, 33, 37, 55, 125] : [11, 12, 24, 44, 66, 88]).iz();
		const answers = [];
		for (let n = Math.ceil(1000 / divisor) * divisor; n <= 9999; n += divisor) {
			const digits = String(n).split('').map(Number);
			if (new Set(digits).size === 4 && digits.every(digit => digit % 2 === parity)) {
				answers.push(n);
			}
		}
		genAssertNonempty(answers);
		NAtask.setTask({
			text: 'Найдите четырёхзначное натуральное число, кратное $' + divisor +
				'$, все цифры которого различны и ' + (parity ? 'нечётны' : 'чётны') +
				'. В ответе запишите какое-нибудь одно такое число.',
			answers,
			preference,
		});
	}, 2000);
})();
// 2AFD45, 7B5DFB, AAEA64, ECBA66, AF38BA, 66EFA1, 4E9284, 4EB6EE, 164B62, 973E32, 59CBB3, 92AE00
