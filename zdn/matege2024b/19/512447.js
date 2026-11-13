(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '512447';
		let preference = ['withRange', 'withoutRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let X, Y;
		if (rand === 0) {
			X = sl(20, 180) * 50;
			Y = X + sl(4, 30) * 50;
			if (Y > 9999) Y = 9999;
		} else {
			X = 1000;
			Y = 9999;
		}

		let min = X + (rand === 0 ? 1 : 0);
		let max = Y - (rand === 0 ? 1 : 0);
		let Z, S;
		let found = false;
		for (let attempt = 0; attempt < 100; attempt++) {
			let N = sl(min, max);
			let divs = [];
			for (let z = 11; z <= 60; z++) {
				if (N % z === 0) divs.push(z);
			}
			if (divs.length > 0) {
				Z = divs.iz();
				S = sumDigits(N);
				found = true;
				break;
			}
		}

		genAssert(found, 'Не удалось подобрать N с делителем в диапазоне [11, 60]');

		function sumDigits(n) {
			let s = 0;
			for (let c of String(n)) s += parseInt(c);
			return s;
		}

		let validNumbers = [];
		for (let A = min; A <= max; A++) {
			if (A % Z === 0 && sumDigits(A) === S) {
				validNumbers.push(A);
			}
		}

		genAssert(validNumbers.length > 0,
			`Не найдено чисел для Z=${Z}, S=${S}, диапазон [${min}; ${max}]`);

		let textBody;
		if (rand === 0) {
			textBody = 'Найдите ' + ['натуральное', 'четырёхзначное', 'четырёхзначное натуральное'].iz() + ' число, большее $' + X + '$, но меньшее $' + Y + '$, которое делится на $' + Z + '$ и сумма цифр которого равна $' + S + '$';
		} else {
			textBody = 'Найдите четырёхзначное число, кратное $' + Z + '$, сумма цифр которого равна $' + S + '$';
		}

		NAtask.setTask({
			text: textBody + '. В ответе ' + ['укажите', 'запишите'].iz() + ' какое-нибудь одно такое число.',
			answers: validNumbers,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512447
//Selena
// 21D3F4, FB4DA9, 69BEE9, A29BB4, 90224A, D15F13, D03FA5, CB1AAA, F5AD3A, EFEECE, 7C4FFB
