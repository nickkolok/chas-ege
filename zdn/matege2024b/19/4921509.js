(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '4921509';
		let preference1 = ['biggestNumber', 'smallestNumber'];
		let preference2 = ['ignoreNumber', 'okayNumber', 'sameNumber'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let word = ['большее', 'меньшее'][rand1];

		let divisor = sl(3, 30);
		let include = ['3', '4', '5', '6', '7', '8', '9'].iz();

		let found = null;

		if (rand2 === 2) {
			let candidates = [];
			for (let d = 1; d <= 9; d++) {
				let num = d * 111;
				if (num % divisor === 0) {
					candidates.push(num);
				}
			}
			genAssertNonempty(candidates, 'Нет трёхзначного числа из одинаковых цифр, делящегося на ' + divisor);
			found = rand1 === 0 ? Math.max(...candidates) : Math.min(...candidates);
		} else {

			if (rand1 === 0) {
				//Ищем НАИБОЛЬШЕЕ
				for (let n = 999; n >= 100; n--) {
					if (rand2 === 0 && String(n).includes(include)) {
						continue;
					}
					if (n % divisor === 0) {
						found = n;
						break;
					}
				}
			} else {
				//Ищем НАИМЕНЬШЕЕ
				for (let n = 100; n <= 999; n++) {
					if (rand2 === 0 && String(n).includes(include)) {
						continue;
					}
					if (n % divisor === 0) {
						found = n;
						break;
					}
				}
			}
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
