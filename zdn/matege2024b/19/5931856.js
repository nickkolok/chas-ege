(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		const preference = ['twoDistinctDigits', 'descendingDigits', 'evenDigits', 'oddDigits', 'largeDigits'];
		const mode = getSelectedPreferenceFromList('5931856', preference);
		const limit = [3, 4, 5, 6].iz();
		const checkDigits = [
			digits => new Set(digits).size === 2,
			digits => digits[0] > digits[1] && digits[1] > digits[2],
			digits => digits.every(digit => digit % 2 === 0),
			digits => digits.every(digit => digit % 2 === 1),
			digits => digits.every(digit => digit > limit),
		][mode];
		const divisors = [[3, 4], [3, 5], [4, 9], [5, 9], [3, 4, 5], [4, 5, 6], [3, 5, 7]].iz();
		const remainder = sl(1, divisors[0] - 1);
		const lower = [99, 300, 400, 500, 600].iz();
		const answers = [];
		for (let n = lower + 1; n <= 999; n++) {
			if (divisors.every(divisor => n % divisor === remainder) && checkDigits(String(n).split('').map(Number))) {
				answers.push(n);
			}
		}
		genAssertNonempty(answers);
		const digitCondition = [
			'в записи которого использованы только две различные цифры',
			'цифры в записи которого расположены в порядке убывания слева направо',
			'все цифры в записи которого чётные',
			'все цифры в записи которого нечётные',
			'все цифры в записи которого больше $' + limit + '$',
		][mode];
		const divisorsText = divisors.map(divisor => 'на $' + divisor + '$').join(', ').replace(/, ([^,]+)$/, ' и $1');
		NAtask.setTask({
			text: 'Найдите трёхзначное натуральное число' + (lower === 99 ? '' : ', большее $' + lower + '$') +
				', которое при делении ' + divisorsText + ' даёт в остатке $' + remainder + '$ и ' + digitCondition +
				'. В ответе запишите какое-нибудь одно такое число.',
			answers,
			preference,
		});
	}, 2000);
})();
// 5A8350, D6BE05, BD33BF, 863241, 5BA905, F1EFD6, FC585B, 23E080, F65CB9, 67EFA4, C05023, 0D9989
