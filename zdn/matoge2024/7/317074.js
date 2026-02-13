(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let denominatorA = sl(5, 50, 1);
		let numeratorA = sl(1, denominatorA - 1, 1);

		genAssert(numeratorA.nod(denominatorA) === 1, "дробь должна быть несократимой");

		let a = numeratorA / denominatorA;
		const epsilon = 1e-6;
		genAssert(((a * 10).round() / 10 - a).abs() > epsilon, "точка A не должна стоять на засечке");

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				min: -0.05,
				max: 1.05,
				points: [
					// Фиктивные точки для границ
					{ value: -0.05, mark: "nothing" },
					{ value: 1.05, mark: "nothing" },
					// Засечки от 0 до 1 с шагом 0.1
					...Array.from({ length: 11 }, (_, i) => {
						let val = i * 0.1;
						return {
							value: val,
							mark: "line",
							label: (val === 0 || val === 1) ? val.toString() : "",
							labelPos: "underAxis"
						};
					}),
					// Точка A
					{ value: a, mark: "dot", label: "A", labelPos: "overAxis" }
				],
				width: 400,
				height: 100,
				margin: 20
			});
		};

		let correct = numeratorA.texfrac(denominatorA);
		let wrAns = [];
		let usedNumerators = [numeratorA];
		while (wrAns.length < 3) {
			let notCorrectNumeratorA = slKrome(function (x) {
				return x >= denominatorA ||
					x.kratno(denominatorA) ||
					usedNumerators.includes(x) ||
					x.nod(denominatorA) !== 1;
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
