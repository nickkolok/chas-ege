(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3918958';
		let preference1 = ['5digit', '4digit'];
		let preference2 = ['more', 'less'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let digits = [5, 4][rand1];
		let digitWord = ['пятизначное', 'четырёхзначное'][rand1];
		let direction = ['наибольшее', 'наименьшее'][rand2];

		let divisor = sl(12, 60);

		let minVal = Math.pow(10, digits - 1);
		let maxVal = Math.pow(10, digits) - 1;

		let n = maxVal - (maxVal % divisor);
		let found = null;
		let prod = null;

		if (rand2 === 0) {
			//наибольшее
			let n = maxVal - (maxVal % divisor);
			while (n >= minVal) {
				let s = String(n);
				if (!s.includes('0')) {
					prod = 1;
					for (let c of s) prod *= parseInt(c);
					if (prod >= 10 && prod <= 500) {
						found = n;
						break;
					}
				}
				n -= divisor;
			}
		} else {
			//наименьшее
			let start = minVal;
			if (start % divisor !== 0) {
				start += divisor - (start % divisor);
			}
			let n = start;
			while (n <= maxVal) {
				let s = String(n);
				if (!s.includes('0')) {
					prod = 1;
					for (let c of s) prod *= parseInt(c);
					if (prod >= 10 && prod <= 500) {
						found = n;
						break;
					}
				}
				n += divisor;
			}
		}

		genAssert(found !== null, 'Не найдено подходящее число, кратное divisor');

		let range = Math.max(5, Math.floor(prod / 5));
		let minProd = prod - range;
		let maxProd = prod + range;

		minProd = Math.max(1, minProd);
		maxProd = Math.min(300, maxProd);

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
