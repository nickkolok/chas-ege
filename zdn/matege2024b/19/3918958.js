(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function () {
		let key = '3918958';
		let preference1 = ['5digit', '4digit'];
		let preference2 = ['theLargest', 'theLeast'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let divisor = sl(12, 90);
		let minProd = sl(5, 100);
		let maxProd = minProd + sl(5, 35);
		let minVal = [10000, 1000][rand1];
		let maxVal = [99999, 9999][rand1];
		let step = rand2 ? divisor : -divisor;
		let answer = rand2 ? Math.ceil(minVal / divisor) * divisor : Math.floor(maxVal / divisor) * divisor;
		while (answer >= minVal && answer <= maxVal) {
			let product = Array.from(String(answer), Number).reduce((result, digit) => result * digit, 1);
			if (product > minProd && product < maxProd) {
				break;
			}
			answer += step;
		}
		genAssert(answer >= minVal && answer <= maxVal, 'Не найдено подходящее число');
		NAtask.setTask({
			text: 'Найдите ' + ['наибольшее', 'наименьшее'][rand2] + ' ' + ['пятизначное', 'четырёхзначное'][rand1] +
				' число, кратное $' + divisor + '$, произведение цифр которого больше $' + minProd + '$, но меньше $' + maxProd + '$.',
			answers: answer,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//3918958
// 3BCC6E, 6DC37A
