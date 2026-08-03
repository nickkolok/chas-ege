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

		let found = [];
		let prodForBounds = null;

		while (
			(rand2 === 0 && current >= minVal) ||
			(rand2 === 1 && current <= maxVal)
		) {
			let s = String(current);
			if (!s.includes('0')) {
				let prod = 1;
				for (let c of s) {
					prod *= parseInt(c);
				}
				if (prod >= 10 && prod <= 100) {
					found.push(current);
					if (prodForBounds === null) {
						prodForBounds = prod;
					}
					if (found.length >= 5) {
						break;
					}
				}
			}
			current += step;
		}

		genAssert(found.length > 0, 'Не найдено подходящее число, кратное divisor');

		let range = Math.max(5, Math.floor(prodForBounds / 5));
		let minProd = Math.max(1, prodForBounds - range);
		let maxProd = Math.min(300, prodForBounds + range);

		NAtask.setTask({
			text: 'Найдите ' + direction + ' ' + digitWord + ' число, кратное $' + divisor + '$, произведение цифр которого больше $' + minProd +
				'$, но меньше $' + maxProd + '$. В ответе укажите какое-нибудь одно такое число.',
			answers: found,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//3918958
//Открытый банк заданий 3BCC6E
