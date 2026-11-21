(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509744';
		let preference = ['withRange', 'withoutRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let dividedBy, aPlusKDividedBy, moreThan, lessThan;

		if (rand === 0) {
			//с диапазоном
			dividedBy = sl(3, 15);
			aPlusKDividedBy = sl(1, 5);
			moreThan = sl(100, 800);
			lessThan = Math.min(moreThan + sl(30, 100), 999);
		} else {
			//без
			dividedBy = sl(7, 15);
			aPlusKDividedBy = slKrome([dividedBy], 4, 9);
			moreThan = 99;
			lessThan = 1000;
		}

		function sumDigits(n) {
			let s = 0;
			for (let c of String(n)) s += parseInt(c);
			return s;
		}

		let validNumbers = [];
		for (let A = moreThan + 1; A < lessThan; A++) {
			if (sumDigits(A) % dividedBy === 0 && sumDigits(A + aPlusKDividedBy) % dividedBy === 0) {
				validNumbers.push(A);
			}
		}

		genAssert(validNumbers.length > 0,
			`Не найдено чисел для dividedBy=${dividedBy}, aPlusKDividedBy=${aPlusKDividedBy}, диапазон (${moreThan}; ${lessThan})`);

		NAtask.setTask({
			text: 'Найдите трёхзначное число $A$, обладающее всеми следующими свойствами: ' +
				'сумма цифр числа $A$ делится на $' + dividedBy + '$; ' +
				'сумма цифр числа $A+' + aPlusKDividedBy + '$ делится на $' + dividedBy + '$' +
				['; число $A$ больше $' + moreThan + '$ и меньше $' + lessThan + '$', ''][rand] +
				'. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509744
//zer00player

