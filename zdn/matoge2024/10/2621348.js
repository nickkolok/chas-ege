(function () {
	'use strict';
	retryWhileError(function () {

		let preference = ['consecutive', 'arbitrary'];
		let variant = getSelectedPreferenceFromList('2621348', preference);
		let diceSides = 6;
		let minSum = sl(3, 6);
		let maxSum = minSum + sl(1, 3);
		let sumsText = variant ? arrayOfUniqueValues(sl(2, 4), 2, 12).sortNumeric() : Array.from({length: maxSum - minSum + 1}, (_, i) => minSum + i);

		let favorable = 0;
		for (let i = 1; i <= diceSides; i++) {
			for (let j = 1; j <= diceSides; j++) {
				let sum = i + j;
				if (sumsText.includes(sum)) {
					favorable++;
				}
			}
		}

		let probability = favorable / 36;

		let sumsStr = sumsText.joinLast(', ', ' или ');

		genAssertZ1000(probability);

		NAtask.setTask({
			text: 'Симметричный игральный кубик бросают два раза. ' +
				'Найдите вероятность события «сумма выпавших очков равна ' + sumsStr + '».',
			answers: probability,
			preference: preference,
		});
	}, 1000);
})();
//2621348
//Открытый банк заданий 27FFA4
