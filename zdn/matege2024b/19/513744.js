(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let numDigits = sl(4, 5);
		let diff = sl(1, 3);
		let divisors = [11, 12, 13, 14, 15, 18, 21, 22, 24, 25, 28, 33, 44, 55, 66, 77, 88];
		let divisor = divisors.iz();

		let validNumbers = [];
		function build(current) {
			if (current.length === numDigits) {
				let num = parseInt(current, 10);
				if (num % divisor === 0) {
					validNumbers.push(num);
				}
				return;
			}
			let lastDigit = parseInt(current[current.length - 1], 10);
			let next1 = lastDigit - diff;
			let next2 = lastDigit + diff;
			if (next1 >= 0) build(current + next1);
			if (next2 !== next1 && next2 <= 9) build(current + next2);
		}
		for (let start = 1; start <= 9; start++) {
			build(start.toString());
		}

		genAssert(validNumbers.length >= 3, 'Слишком мало подходящих чисел для красивой задачи');

		let numDigitsNames = ['', '', '', '', 'четырёхзначное', 'пятизначное'];
		let numDigitsWord = numDigitsNames[numDigits];

		NAtask.setTask({
			text: 'Найдите ' + numDigitsWord + ' число, кратное $' + divisor + '$, любые две соседние цифры которого отличаются на $' + diff + '$. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
