(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		
		// Параметры задачи: делитель и разность между произведением и суммой цифр
		// Все комбинации с хотя бы одним решением
		let combinations = [
			{divisor: 11, diff: 1},
			{divisor: 7, diff: 1},
			{divisor: 7, diff: 2},
			{divisor: 7, diff: 3},
			{divisor: 13, diff: 1},
			{divisor: 13, diff: 2},
			{divisor: 13, diff: 3},
			{divisor: 17, diff: 3},
			{divisor: 19, diff: 2}
		];
		
		let combo = combinations.iz();
		let divisor = combo.divisor;
		let diff = combo.diff;
		
		let validNumbers = [];
		
		// Перебираем все четырёхзначные числа
		for (let num = 1000; num <= 9999; num++) {
			if (num % divisor !== 0) {
				continue;
			}
			
			let digits = String(num).split('').map(Number);
			let sum = digits.reduce((a, b) => a + b, 0);
			let product = digits.reduce((a, b) => a * b, 1);
			
			// Проверка условия: сумма + diff = произведение
			if (product - sum === diff) {
				validNumbers.push(num);
			}
		}
		
		genAssert(validNumbers.length > 0, 'Нет решений для сгенерированных параметров');
		
		NAtask.setTask({
			text: 'Найдите четырёхзначное натуральное число, кратное $' + divisor + '$, сумма цифр которого на $' + diff + '$ меньше их произведения. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
		});
		
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=509604
