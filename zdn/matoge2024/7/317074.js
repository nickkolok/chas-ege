
(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let numeratorA = sl(1, 50, 1);
		let denominatorA = numeratorA + slKrome(function (x) { return x.kratno(numeratorA) }, 3, 40);

		let a = numeratorA / denominatorA;
		const epsilon = 1e-6;
		genAssert(Math.abs(Math.round(a * 10) / 10 - a) > epsilon, "точка A не должна стоять на засечке");

		let paint1 = function (ct) {
			const w = 400;
			const h = 100;
			ct.translate(0, h / 2);

			//линия со стрелкой и "х"
			ct.lineWidth = 2;
			ct.strokeStyle = om.primaryBrandColors[0];
			ct.drawArrow(10, 0, w + 10, 0);
			coordAxis_drawMarkPoint(ct, w, "x", "nothing", "onAxis");

			//Засечки от 0 до 1 с шагом 0.1
			for (let i = 0; i <= 10; i++) {
				let frac = i / 10;
				let label = (frac === 0 || frac === 1) ? frac.toString() : frac.toFixed(1);
				coordAxis_drawMarkPoint(ct, 10 + (w - 20) * frac, label, "line", "underAxis");
			}
			// Точка A
			coordAxis_drawMarkPoint(ct, 10 + (w - 20) * a, "A", "dot", "overAxis");
		};

		// Генерация ответа
		let correct = numeratorA.texfrac(denominatorA);
		let wrAns = [];

		let usedNumerators = [numeratorA]; // чтобы избежать дубликатов
		while (wrAns.length < 3) {
			let notCorrectNumeratorA = slKrome(function (x) {
				return x >= denominatorA ||//не >=1                 
					x.kratno(denominatorA) ||
					usedNumerators.includes(x);//чтобы не случались одиночные underfined
			}, 1, denominatorA - 1);

			usedNumerators.push(notCorrectNumeratorA);
			wrAns.push(notCorrectNumeratorA.texfrac(denominatorA));
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
//https://oge.sdamgia.ru/test?likes=317074


