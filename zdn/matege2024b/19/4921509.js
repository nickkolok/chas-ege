(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '4921509';
		let preference = ['biggestNumber', 'smallestNumber'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let word =['большее','меньшее'][rand];
		
		let divisor = [3, 5, 7, 9, 11, 13, 17, 19, 23, 29].iz();
		let include = ['3','4','5','6','7','8','9'].iz();

		let found = null;

		if (rand === 0) {
			//Ищем НАИБОЛЬШЕЕ
			for (let n = 999; n >= 100; n--) {
				if (String(n).includes(include)) continue;
				if (n % divisor === 0) {
					found = n;
					break;
				}
			}
		} else {
			//Ищем НАИМЕНЬШЕЕ
			for (let n = 100; n <= 999; n++) {
				if (String(n).includes(include)) continue;
				if (n % divisor === 0) {
					found = n;
					break;
				}
			}
		}

		genAssert(found !== null, `Не найдено трёхзначное число без цифры ${include}, делящееся на ${divisor}`);

		NAtask.setTask({
			text: 	'Найдите наи'+word+' трёхзначное число, в записи которого не используется цифра $'+include+'$ и которое нацело делится на $' +divisor+'$.',
			answers: found,
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//4921509
//Открытый банк заданий 4B18A5
