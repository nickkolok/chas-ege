(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3918958';
		let preference1 = ['5digit', '4digit'];
		let preference2 = ['theLargest', 'theLeast'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let digitWord = ['пятизначное', 'четырёхзначное'][rand1];
		let direction = ['наибольшее', 'наименьшее'][rand2];

		let divisor = sl(12, 60);
		let minVal = [10000, 1000][rand1];
		let maxVal = [99999, 9999][rand1];

		let current, step;
		if (rand2 === 0) {
			// наибольшее
			current = maxVal - (maxVal % divisor);
			step = -divisor;
		} else {
			// наименьшее
			current = minVal + ((divisor - (minVal % divisor)) % divisor);
			step = divisor;
		}

		function digitProduct(number) {
			return Array.from(String(number), Number).reduce((product, digit) => product * digit, 1);
		}

		let first = current;
		while (current >= minVal && current <= maxVal) {
			let product = digitProduct(current);
			if (product >= 10 && product <= 100) {
				break;
			}
			current += step;
		}
		genAssert(current >= minVal && current <= maxVal, 'Не найдено подходящее число');
		let prodForBounds = digitProduct(current);
		let range = Math.max(5, Math.floor(prodForBounds / 5));
		let minProd = Math.max(1, prodForBounds - range);
		let maxProd = Math.min(300, prodForBounds + range);

		// Проверяем и числа перед первоначальным кандидатом: их произведения
		// могут попадать в выбранный промежуток, даже если выходят за [10; 100].
		let answer = first;
		while (true) {
			let product = digitProduct(answer);
			if (product > minProd && product < maxProd) {
				break;
			}
			answer += step;
		}
		NAtask.setTask({
			text: 'Найдите ' + direction + ' ' + digitWord + ' число, кратное $' + divisor + '$, произведение цифр которого больше $' + minProd +
				'$, но меньше $' + maxProd + '$.',
			answers: answer,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//3918958
// 3BCC6E, 6DC37A
