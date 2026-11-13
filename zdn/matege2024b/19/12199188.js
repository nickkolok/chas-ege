(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		const preference = ['equal', 'less', 'greater'];
		const mode = getSelectedPreferenceFromList('12199188', preference);
		const [length, divisor, difference] = [
			[[3, 4, 0], [4, 2, 0], [4, 4, 0], [5, 2, 0], [5, 5, 0]],
			[[3, 2, -1], [4, 2, -1]],
			[[4, 4, 1], [4, 11, 1], [4, 7, 1]],
		][mode].iz();
		const min = 10 ** (length - 1);
		const max = 10 * min;
		const answers = [];
		for (let n = Math.ceil(min / divisor) * divisor; n < max; n += divisor) {
			const digits = String(n).split('').map(Number);
			if (digits.sum() - digits.production() === difference && (mode !== 2 || !digits.includes(0))) {
				answers.push(n);
			}
		}
		genAssertNonempty(answers);

		const size = ['трёхзначное', 'четырёхзначное', 'пятизначное'][length - 3];
		const multiple = divisor === 2 ? 'чётное ' + size + ' натуральное число' :
			size + ' натуральное число, кратное $' + divisor + '$';
		const relation = ['равна их произведению', 'на $1$ меньше их произведения',
			'на $1$ больше их произведения и в записи которого отсутствуют нули'][mode];
		NAtask.setTask({
			text: 'Найдите ' + multiple + ', сумма цифр которого ' + relation +
				'. В ответе запишите какое-нибудь одно такое число.',
			answers,
			preference,
		});
	}, 2000);
})();
// DE9DFB, 162EEB, BA2514, 32F0D9, 603305, B68642, DBE441, BA19B4, 7BB3EA
