(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let validNumbers = [];
		for (let n = 6001; n < 8000; n++) {
			if (n % 18 === 0) {
				let s = String(n);
				let isDecreasing = true;
				for (let i = 0; i < s.length - 1; i++) {
					if (parseInt(s[i]) <= parseInt(s[i+1])) {
						isDecreasing = false;
						break;
					}
				}
				if (isDecreasing) {
					validNumbers.push(n);
				}
			}
		}

		genAssert(validNumbers.length > 0, 'Нет решений');

		NAtask.setTask({
			text: 'Найдите четырёхзначное число, большее 6000, но меньшее 8000, которое делится на 18 и каждая следующая цифра которого меньше предыдущей. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
