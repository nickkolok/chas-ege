(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let cases = [
			{a: 2, b: 0, d: 24},
			{a: 1, b: 0, d: 24},
			{a: 0, b: 3, d: 90},
			{a: 1, b: 2, d: 24},
			{a: 0, b: 6, d: 90},
			{a: 1, b: 5, d: 45},
			{a: 1, b: 6, d: 24},
			{a: 2, b: 0, d: 30},
		];

		let length = [6, 7].iz();
		let c = length === 6 ? cases.concat([{a: 2, b: 0, d: 120}]).iz() :
			{a: 1, b: [2, 4, 6, 8].iz(), d: [24, 36, 72].iz()};
		let a = c.a;
		let b = c.b;
		let d = c.d;

		let validAnswers = [];
		function build(number, count) {
			if (count === length) {
				if (number % d === 0) {
					validAnswers.push(number);
				}
				return;
			}
			for (let digit of [a, b]) {
				if (count > 0 || digit !== 0) {
					build(10 * number + digit, count + 1);
				}
			}
		}
		build(0, 0);

		genAssert(validAnswers.length > 0, 'Нет решений');

		NAtask.setTask({
			text: 'Найдите ' + (length === 6 ? 'шестизначное' : 'семизначное') + ' натуральное число, которое записывается только цифрами ' + a + ' и ' + b +
				' и делится на ' + d + '. В ответе укажите какое-нибудь одно такое число.',
			answers: validAnswers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
// 36900B, A24AE1
