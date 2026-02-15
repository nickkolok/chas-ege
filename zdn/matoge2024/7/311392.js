(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let denominatorA = sl(10, 90);
		let numeratorA = sl(1, denominatorA - 1);
		let sum = sl(1, 9);
		let a = sum + numeratorA / denominatorA;

		genAssert(numeratorA.nod(denominatorA) === 1, "дробь должна быть несократимой");

		genAssert(a > 1.1, "точка A должна быть больше 1.1");
		genAssert(a < 9.8, "точка A должна быть меньше 9.8");
		genAssert((a - a.round()).abs() >= 0.05, "точка A не должна быть слишком близка к целому");

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				min: -0.5,
				max: 10.5,
				points: [
					{ value: -0.5, mark: "nothing" },
					{ value: 10.5, mark: "nothing" },
					...Array.from({ length: 11 }, (_, i) => ({
						value: i,
						mark: "line",
						label: (i === 0 || i === 1) ? i.toString() : "",
						labelPos: "underAxis"
					})),
					{ value: a, mark: "dot", label: "A", labelPos: "overAxis" }
				],
				width: 400,
				height: 100,
				margin: 20
			});
		};

		let correct = (numeratorA + sum * denominatorA).texfrac(denominatorA);
		let wrAns = [];
		let usedNumerators = [numeratorA]; 

		while (wrAns.length < 3) {
			let wrongNumerator = slKrome(function (x) {
				return x <= 0 ||
					x >= 150 ||
					usedNumerators.includes(x) ||
					x % denominatorA === 0 ||
					x.nod(denominatorA) !== 1 ||
					(() => {
						let val = x / denominatorA;
						let intPart = Math.floor(val);
						let fracPart = val - intPart;
						return intPart < 1 || intPart > 9 || fracPart < 0.05 || fracPart > 0.95;
					})();
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
