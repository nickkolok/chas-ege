(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let targetDiff = null;

		let validNumbers = [];
		let diff = targetDiff;

		let baseN = null;
		let attempts = 0;
		while (attempts < 2000 && baseN === null) {
			attempts++;
			let first = sl(1, 9);
			let second = sl(0, 9);
			let third = sl(0, 9);
			let n = first * 1000 + second * 100 + third * 10 + 5;
			let s = String(n);
			let revStr = s.split('').reverse().join('');
			let rev = parseInt(revStr, 10);
			let d = n - rev;
			if (d > 1000 && d < 9000) {
				baseN = n;
				diff = d;
			}
		}
		genAssert(baseN !== null, 'Не удалось сгенерировать базовое число');

		for (let n = 1005; n <= 9995; n += 5) {
			if (n % 10 !== 5) {
				continue
			}
			let s = String(n);
			let revStr = s.split('').reverse().join('');
			if (revStr[0] === '0') {
				continue
			}
			let rev = parseInt(revStr, 10);
			if (n - rev === diff) {
				validNumbers.push(n);
			}
		}
		genAssert(validNumbers.length > 0, 'Нет решений для сгенерированной разности');


		NAtask.setTask({
			text: 'Цифры четырёхзначного числа, кратного $5$, записали в обратном порядке и получили второе четырёхзначное число. ' +
				'Затем из исходного числа вычли второе и получили $' + diff + '$. В ответе укажите какое-нибудь одно такое исходное число.',
			answers: validNumbers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506834
//zer00player

