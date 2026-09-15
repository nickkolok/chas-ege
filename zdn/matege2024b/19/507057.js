(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '507057';
		let preference = ['min', 'any', 'gt500', 'lt500'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let pairs = [[6, 11], [4, 15], [6, 5], [8, 5]];
		let pair = pairs[sl(0, pairs.length - 1)];
		let A = pair[0];
		let B = pair[1];
		let LCM = A * B;
		let minR = 1;
		let maxR = Math.min(A, B) - 1;

		genAssert(minR <= maxR, 'Invalid pair');

		let r = sl(minR, maxR);

		let conditionType = ['middle', 'last', 'first'][sl(0, 2)];

		let validDigits = [];
		for (let x = 100; x < 1000; x++) {
			let a = Math.floor(x / 100);
			let b = Math.floor((x % 100) / 10);
			let c = x % 10;

			if (conditionType === 'middle') {
				if (b * 2 === a + c) {
					validDigits.push(x);
				}
			} else if (conditionType === 'last') {
				if (c * 2 === a + b) {
					validDigits.push(x);
				}
			} else {
				if (a * 2 === b + c) {
					validDigits.push(x);
				}
			}
		}

		let validNumbers = validDigits.filter(x => x % LCM === r);

		genAssert(validNumbers.length > 0, 'Не найдено чисел для LCM=' + LCM + ', r=' + r);

		let answers = [];
		let textPrefix = '';
		let textSuffix = '';

		if (rand === 0) { // min
			validNumbers.sort((x, y) => x - y);
			answers = [validNumbers[0]];
			textPrefix = 'Найдите наименьшее трёхзначное натуральное число';
			textSuffix = '';
		} else if (rand === 2) { // gt500
			validNumbers = validNumbers.filter(x => x > 500);
			genAssert(validNumbers.length > 0, 'Нет чисел > 500');
			answers = validNumbers;
			textPrefix = 'Приведите пример трёхзначного натурального числа большего 500';
			textSuffix = '. В ответе укажите какое-нибудь одно такое число';
		} else if (rand === 3) { // lt500
			validNumbers = validNumbers.filter(x => x < 500);
			genAssert(validNumbers.length > 0, 'Нет чисел < 500');
			answers = validNumbers;
			textPrefix = 'Найдите трёхзначное натуральное число, меньшее 500';
			textSuffix = '. В ответе укажите какое-нибудь одно такое число';
		} else { // any
			answers = validNumbers;
			textPrefix = 'Найдите трёхзначное натуральное число';
			textSuffix = '. В ответе укажите какое-нибудь одно такое число';
		}

		let digitCondText = '';
		if (conditionType === 'middle') {
			digitCondText = 'у которого средняя цифра является средним арифметическим двух крайних цифр';
		} else if (conditionType === 'last') {
			digitCondText = 'у которого последняя цифра является средним арифметическим двух других цифр';
		} else {
			digitCondText = 'у которого первая цифра является средним арифметическим двух других цифр';
		}

		let taskText = textPrefix + ', которое при делении на $' + A + '$ и на $' + B + '$ даёт равные ненулевые остатки и ' + digitCondText + textSuffix + '.';

		NAtask.setTask({
			text: taskText,
			answers: answers,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=507057
//zer00player
