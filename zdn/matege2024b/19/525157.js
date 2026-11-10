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

		let c = cases.iz();
		let a = c.a;
		let b = c.b;
		let d = c.d;

		let validAnswers = [];
		for (let i = 100000; i <= 999999; i++) {
			let s = String(i);
			if (s.split('').every(ch => ch == String(a) || ch == String(b))) {
				if (i % d === 0) {
					validAnswers.push(s);
				}
			}
		}

		genAssert(validAnswers.length > 0, 'Нет решений');

		NAtask.setTask({
			text: 'Найдите шестизначное натуральное число, которое записывается только цифрами ' + a + ' и ' + b +
				' и делится на ' + d + '. В ответе укажите какое-нибудь одно такое число.',
			answers: validAnswers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
