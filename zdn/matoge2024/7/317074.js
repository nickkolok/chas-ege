
(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let denominatorA = sl(5, 50, 1);
		let numeratorA = sl(1, denominatorA - 1, 1);

		let a = numeratorA / denominatorA;
		const epsilon = 1e-6;
		genAssert(((a * 10).round() / 10 - a).abs() > epsilon, "точка A не должна стоять на засечке");

		let paint1 = function (ct) {
			let points = [];

			// Засечки от 0 до 1 с шагом 0.1, подписываем 0 и 1
			for (let i = 0; i <= 10; i++) {
				let val = i / 10;
				points.push({
					value: val,
					mark: 'line',
					label: (i === 0 || i === 10) ? val.toString() : '',
					labelPos: 'underAxis'
				});
			}

			// Точка A
			points.push({
				value: a,
				mark: 'dot',
				label: 'A',
				labelPos: 'overAxis'
			});

			// Фиктивные точки для ограничения диапазона и сдвига
			points.push({ value: -0.05, mark: 'nothing' });
			points.push({ value: 1.05, mark: 'nothing' });

			coordAxis_drawAuto(ct, { points });
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
			width: 400,
			height: 100,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=317074


