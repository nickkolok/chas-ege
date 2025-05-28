(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let denominatorA = sl(10, 90, 1);
		let numeratorA = sl(1, denominatorA - 1, 1);
		let sum = sl(1, 9, 1);
		let a = sum + numeratorA / denominatorA;

		genAssert(!a <= 1.1, "точка А должна быть в границах от 1,1");
		genAssert(!a <= 9.8, "точка А должна быть в границах до 9,8 ");
		genAssert((a - a.round()).abs() < 0.05, "точка А не целое");

		let paint1 = function (ct) {

			let points = [];

			for (let i = 0; i <= 10; i++) {
				points.push({
					value: i,
					mark: 'line',
					label: i.toString().esli(i === 0 || i === 1),
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

			coordAxis_drawAuto(ct, { points });
		};

		// Генерация ответа
		let correct = (numeratorA + sum * denominatorA).texfrac(denominatorA);
		let wrAns = [];
		let usedNumerators = [numeratorA];

		while (wrAns.length < 3) {
			let wrongNumerator = slKrome(function (x) {
				let num = (1, 9, 1);
				let val = (num * denominatorA + x) / denominatorA;
				return (
					x.kratno(denominatorA) ||                     // исключаем целые
					usedNumerators.includes(x) ||                // дубликаты
					val <= 1.05 || val >= 9.75 ||                // вне границ
					(val - val.round()).abs() < 0.06       // близко к целому
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

