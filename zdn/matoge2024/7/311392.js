
(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let denominatorA = sl(10, 40);
		const epsilon = 1e-6;
		let targetA = slKrome(function (x) { return Math.abs(Math.round(x) - x) > epsilon; }, 12, 95) / 10;

		let numeratorA = Math.round(targetA * denominatorA);
		let a = numeratorA / denominatorA;

		genAssert((a > 1 + epsilon && a < 9.8 - epsilon && Math.abs(Math.round(a) - a) > epsilon), "точка А должна быть в границах от 1 до 9,8 и не целой!");

		let paint1 = function (ct) {
			const w = 400;
			const h = 100;
			ct.translate(0, h / 2);

			//линия со стрелкой и "х"
			ct.lineWidth = 2;
			ct.strokeStyle = om.primaryBrandColors[0];
			ct.drawArrow(10, 0, w + 10, 0);
			coordAxis_drawMarkPoint(ct, w, "x", "nothing", "onAxis");

			//Засечки где подписаны лишь 0 и 1
			for (let i = 0; i <= 10; i++) {
				let x = 10 + (w - 20) * (i / 10);
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
					Math.abs(Math.round(testVal) - testVal) < epsilon // попадает на целое
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
			width: 450,
			height: 100,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=311392


