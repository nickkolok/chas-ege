(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509744';
		let preference = ['withRange', 'withoutRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let d, k, L, R;

		if (rand === 0) {
			//с диапазоном
			d = sl(3, 15);
			k = sl(1, 5);
			L = sl(100, 800);
			R = Math.min(L + sl(30, 100), 999);
		} else {
			//без
			d = sl(7, 15);
			k = slKrome([d],4, 9);
			L = 99;
			R = 1000;
		}

		function sumDigits(n) {
			let s = 0;
			for (let c of String(n)) s += parseInt(c);
			return s;
		}

		let validNumbers = [];
		for (let A = L + 1; A < R; A++) {
			if (sumDigits(A) % d === 0 && sumDigits(A + k) % d === 0) {
				validNumbers.push(A);
			}
		}

		genAssert(validNumbers.length > 0,
			`Не найдено чисел для d=${d}, k=${k}, диапазон (${L}; ${R})`);

		NAtask.setTask({
			text: 'Найдите трёхзначное число $A$, обладающее всеми следующими свойствами: ' +
			'сумма цифр числа $A$ делится на $' + d + '$; ' +
			'сумма цифр числа $A+' + k + '$ делится на $' + d + '$' +
			['; число $A$ больше $' + L + '$ и меньше $' + R + '$',''][rand] +
			'. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509744
//zer00player

