(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rules = [
			{
				text: 'делится на 20',
				check: (s) => s % 20 === 0
			},
			{
				text: 'делится на 10, но не делится на 20',
				check: (s) => s % 10 === 0 && s % 20 !== 0
			},
			{
				text: 'делится на 10',
				check: (s) => s % 10 === 0
			}
		];
		let rule = rules[sl(0, rules.length - 1)];

		let digits = [];
		for (let i = 0; i < 6; i++) {
			digits.push(sl(1, 9));
		}

		let validSums = new Set();
		function permute(arr, m = []) {
			if (arr.length === 0) {
				let p = m;
				let A = p[0];
				let B = p[1] * 10 + p[2];
				let C = p[3] * 100 + p[4] * 10 + p[5];
				let S = A + B + C;
				if (rule.check(S)) {
					validSums.add(S);
				}
			} else {
				for (let i = 0; i < arr.length; i++) {
					let curr = arr.slice();
					let next = curr.splice(i, 1);
					permute(curr, m.concat(next));
				}
			}
		}
		permute(digits);

		genAssert(validSums.size > 0, 'Не найдено ни одной подходящей суммы для данных цифр.');

		let sortedDigits = digits.slice().sort((a, b) => a - b);

		NAtask.setTask({
			text: 'На шести карточках написаны цифры ' + sortedDigits.join('; ') +
				' (по одной цифре на каждой карточке). В выражении $\\square + \\square\\square + \\square\\square\\square$ ' +
				'вместо каждого квадратика положили карточку из данного набора. Оказалось, что полученная сумма ' +
				rule.text + '. В ответе укажите какую-нибудь одну такую сумму.',
			answers: Array.from(validSums),
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://github.com/nickkolok/chas-ege/issues/2843
//https://mathb-ege.sdamgia.ru/test?likes=512681
//zer00player
