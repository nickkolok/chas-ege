(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509744';
		let preference = ['withRange', 'withoutRange', 'edgeDigitSum', 'fourDigitRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let dividedBy, aPlusKDividedBy, moreThan, lessThan;

		if (rand === 0 || rand === 3) {
			//с диапазоном
			dividedBy = sl(3, 15);
			aPlusKDividedBy = sl(1, 5);
			moreThan = rand === 3 ? sl(10, 97) * 100 : sl(100, 800);
			lessThan = rand === 3 ? moreThan + sl(1, 3) * 100 : Math.min(moreThan + sl(30, 100), 999);
		} else {
			//без
			dividedBy = sl(7, 15);
			aPlusKDividedBy = slKrome([dividedBy], rand === 2 ? 1 : 4, 9);
			moreThan = 99;
			lessThan = 1000;
		}

		function edgeSumMultipleOfMiddle(n) {
			let [first, middle, last] = String(n).split('').map(Number);
			return middle > 0 && (first + last) % middle === 0;
		}

		function sumDigits(n) {
			let s = 0;
			for (let c of String(n)) s += parseInt(c);
			return s;
		}

		let validNumbers = [];
		for (let A = moreThan + 1; A < lessThan; A++) {
			if (sumDigits(A) % dividedBy === 0 && sumDigits(A + aPlusKDividedBy) % dividedBy === 0 &&
				(rand !== 2 || edgeSumMultipleOfMiddle(A))) {
				validNumbers.push(A);
			}
		}

		genAssert(validNumbers.length > 0,
			`Не найдено чисел для dividedBy=${dividedBy}, aPlusKDividedBy=${aPlusKDividedBy}, диапазон (${moreThan}; ${lessThan})`);

		NAtask.setTask({
			text: 'Найдите ' + (rand === 3 ? 'четырёхзначное' : 'трёхзначное') + ' число $A$, обладающее всеми следующими свойствами: ' +
				'сумма цифр числа $A$ делится на $' + dividedBy + '$; ' +
				'сумма цифр числа $A+' + aPlusKDividedBy + '$ делится на $' + dividedBy + '$' +
				(rand === 0 || rand === 3 ? '; число $A$ больше $' + moreThan + '$ и меньше $' + lessThan + '$' : '') +
				(rand === 2 ? '; в числе $A$ сумма крайних цифр кратна средней цифре' : '') +
				'. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
			preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509744
//zer00player
// DA4AC4, 11F98F
