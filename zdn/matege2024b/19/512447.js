(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '512447';
		let preference = ['withRange', 'withoutRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let X, Y;
		if (rand === 0) {
			X = sl(10, 90) * 100;
			Y = X + sl(2, 15) * 100;
			if (Y > 9999) Y = 9999;
		} else {
			X = 1000;
			Y = 9999;
		}

		let Z, S;
		let found = false;
		for (let attempt = 0; attempt < 100; attempt++) {
			let N = sl(X, Y);
			let divs = [];
			for (let z = 11; z <= 40; z++) {
				if (N % z === 0) divs.push(z);
			}
			if (divs.length > 0) {
				Z = divs.iz();
				S = sumDigits(N);
				found = true;
				break;
			}
		}

		genAssert(found, 'Не удалось подобрать N с делителем в диапазоне [11, 40]');

		function sumDigits(n) {
			let s = 0;
			for (let c of String(n)) s += parseInt(c);
			return s;
		}

		let validNumbers = [];
		for (let A = X; A <= Y; A++) {
			if (A % Z === 0 && sumDigits(A) === S) {
				validNumbers.push(A);
			}
		}

		genAssert(validNumbers.length > 0,
			`Не найдено чисел для Z=${Z}, S=${S}, диапазон [${X}; ${Y}]`);

		if (validNumbers.length > 100) {
			validNumbers = validNumbers.slice(0, 100);
		}

		let textBody;
		if (rand === 0) {
			textBody = 'Найдите четырёхзначное число, большее $' + X + '$, но меньшее $' + Y + '$, которое делится на $' + Z + '$ и сумма цифр которого равна $' + S + '$';
		} else {
			textBody = 'Найдите четырёхзначное число, кратное $' + Z + '$, сумма цифр которого равна $' + S + '$';
		}

		NAtask.setTask({
			text: textBody + '. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512447
//Selena
