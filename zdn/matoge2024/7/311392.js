(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let epsilon = 1e-6;
		let denominatorA = sl(10, 90);
		let numeratorA = sl(1, denominatorA - 1, 1);
		let a = sl(1, 9, 1) + numeratorA / denominatorA;
		
		genAssert(a > 1 + epsilon && a < 9.8 - epsilon, "точка А должна быть в границах от 1 до 9,8");

		let paint1 = function (ct) {

			coordAxis_prepare(ct, { width: 400, height: 100 });
			const w = ct.__coordAxisW;

			//Засечки где подписаны лишь 0 и 1
			for (let i = 0; i <= 10; i++) {
				let x = 10 + (w - 40) * (i / 10);
				let label = (i === 0 || i === 1) ? i.toString() : "";
				coordAxis_drawMarkPoint(ct, x, label, "line", "underAxis");
			}
			// Точка A
			coordAxis_drawMarkPoint(ct, 10 + (w - 20) * (a / 10), "A", "dot", "overAxis");
		};

		// Генерация ответа
		let correct = numeratorA.texfrac(denominatorA);
		let wrAns = [];
		let usedNumerators = [numeratorA];

		while (wrAns.length < 3) {
			let wrongNumerator = slKrome(function (x) {
				let testVal = x / denominatorA;
				return (
					x.kratno(denominatorA) ||// исключаем кратные
					usedNumerators.includes(x) ||// дубликаты
					testVal <= 1 + epsilon || testVal >= 10 - epsilon || // вне допустимого диапазона
					(testVal.round() - testVal).abs() < epsilon // попадает на целое
				);
			}, 1, 150);

			usedNumerators.push(wrongNumerator);
			wrAns.push(wrongNumerator.texfrac(denominatorA));
		}

		NAtask.setTask({
			text: 'Одно из чисел отмечено на прямой точкой $A$. Какое это число?',
			answers: '$' + correct + '$',
			wrongAnswers: wrAns.map(e => '$' + e + '$'),
		});
		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=311392


