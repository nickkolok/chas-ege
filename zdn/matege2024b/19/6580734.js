(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		const divisor = [11, 12, 15, 24, 30, 36, 40, 45, 60, 70, 75].iz();
		const base = [4, 5].iz();
		const excluded = base * sl(2, 5);
		const answers = [];
		for (let n = Math.ceil(100 / divisor) * divisor; n <= 999; n += divisor) {
			const digits = String(n).split('').map(Number);
			const sum = digits.map(digit => digit * digit).sum();
			if (new Set(digits).size === 3 && sum % base === 0 && sum % excluded !== 0) {
				answers.push(n);
			}
		}
		genAssertNonempty(answers);
		NAtask.setTask({
			text: 'Найдите трёхзначное натуральное число, кратное $' + divisor +
				'$, все цифры которого различны, а сумма квадратов цифр делится на $' + base +
				'$, но не делится на $' + excluded + '$. В ответе запишите какое-нибудь одно такое число.',
			answers,
		});
	}, 2000);
})();
// 6469FE, 81C7FB, DA04D9, F3AB5C, BBFCAE, B07783, 8C514F, 170993, 58FA38, 1CE1CF
