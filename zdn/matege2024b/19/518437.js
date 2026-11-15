(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k = sl(6, 15);

		let minN = Math.ceil(Math.cbrt(1000 * k));
		let maxN = Math.floor(Math.cbrt(9999 * k));

		let validNumbers = [];

		for (let n = minN; n <= maxN; n++) {
			let cube = n * n * n;
			if (cube % k === 0) {
				let N = cube / k;
				if (N >= 1000 && N <= 9999) {
					validNumbers.push(N);
				}
			}
		}

		genAssert(validNumbers.length > 0, `Не найдено четырёхзначных чисел для k = ${k}`);

		NAtask.setTask({
			text: 'Найдите четырёхзначное число, которое в $' + k + '$ раз меньше куба некоторого натурального числа. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=518437
//zer00player

