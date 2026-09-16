(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '4921509';
		let preference1 = ['biggestNumber', 'smallestNumber'];
		let preference2 = ['exceptNumber', 'simpleNumber', 'sameNumber'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let word = ['большее', 'меньшее'][rand1];

		let divisor = sl(3, 30);
		let include = null;
		let found = null;

		function findSameDigitNumber() {
			let candidates = [];
			for (let d = 1; d <= 9; d++) {
				let num = d * 111;
				if (num % divisor === 0) {
					candidates.push(num);
				}
			}
			genAssertNonempty(candidates, 'Нет трёхзначного числа из одинаковых цифр, делящегося на ' + divisor);
			return rand1 === 0 ? Math.max(...candidates) : Math.min(...candidates);
		}

		function findNaiveExtremum() {
			if (rand1 === 0) {
				return 999 - (999 % divisor);//наибольшее
			} else {
				let start = 100;
				let remainder = start % divisor;
				return remainder === 0 ? start : start + divisor - remainder;//наименьшее
			}
		}

		function findWithExcludedDigit() {
			let naive = findNaiveExtremum();
			let digits = [...new Set(String(naive))];
			genAssert(digits.length > 0, 'naive число не имеет цифр');
			include = digits.iz();
			if (rand1 === 0) {
				for (let n = naive; n >= 100; n -= divisor) {
					if (!String(n).includes(include)) {
						return n;
					}
				}
			} else {
				for (let n = naive; n <= 999; n += divisor) {
					if (!String(n).includes(include)) {
						return n;
					}
				}
			}
			genAssert(false, 'Не найдено подходящее число без цифры ' + include);
		}

		switch (rand2) {
			case 2://sameNumber
				found = findSameDigitNumber();
				break;
			case 1://simpleNumber
				found = findNaiveExtremum();
				break;
			case 0://exceptNumber
				found = findWithExcludedDigit();
				break;
			default:
				genAssert(false, 'Неизвестный режим rand2: ' + rand2);
		}

		NAtask.setTask({
			text: 'Найдите наи' + word + ' трёхзначное число,' + [' в записи которого не используется цифра $' + include + '$ и', '', ' записанное одинаковыми цифрами и'][rand2] +
				' которое нацело делится на $' + divisor + '$.',
			answers: found,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//4921509
//Открытый банк заданий 4B18A5
