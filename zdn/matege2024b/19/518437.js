(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let preference = ['cube', 'fourthPower'];
		let mode = getSelectedPreferenceFromList('518437', preference);
		let power = mode ? 4 : 3;
		let k = mode ? sl(3, 12) : sl(6, 15);

		let minN = Math.floor(Math.pow(1000 * k, 1 / power));
		let maxN = Math.ceil(Math.pow(9999 * k, 1 / power));

		let validNumbers = [];

		for (let n = minN; n <= maxN; n++) {
			let value = n ** power;
			if (value % k === 0) {
				let N = value / k;
				if (N >= 1000 && N <= 9999) {
					validNumbers.push(N);
				}
			}
		}

		genAssert(validNumbers.length > 0, `Не найдено четырёхзначных чисел для k = ${k}`);

		NAtask.setTask({
			text: 'Найдите четырёхзначное число, которое в $' + k + '$ раз меньше ' + (mode ? 'четвёртой степени' : 'куба') +
				' некоторого натурального числа. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
			preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=518437
//zer00player
// 1CBB64, 6BDF9E, EB38AD
