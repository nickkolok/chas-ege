(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let leftEdge = sl(1, 6);
		let positions = [
			leftEdge + 0.1,
			leftEdge + 0.85,
			leftEdge + 1.15,
			leftEdge + 1.9
		];

		let idx = sl(0, 3);
		let val = positions[idx];

		let denominator = [7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21].iz();
		let numerator = Math.round(val * denominator);
		genAssert((numerator / denominator - val).abs() > 0.01, "слишком близко к целому");

		let correctLatex = numerator.texfrac(denominator);
		let correctLetter = ['A', 'B', 'C', 'D'][idx];

		let paint = function (ct) {
			coordAxis_drawAuto(ct, {
				min: leftEdge,
				max: leftEdge + 2,
				points: [
					// Засечки на целых числах
					{ value: leftEdge, mark: "line", label: leftEdge.toString(), labelPos: "underAxis" },
					{ value: leftEdge + 1, mark: "line", label: (leftEdge + 1).toString(), labelPos: "underAxis" },
					{ value: leftEdge + 2, mark: "line", label: (leftEdge + 2).toString(), labelPos: "underAxis" },
					// Точки A–D
					{ value: positions[0], mark: "dot", label: "A", labelPos: "overAxis" },
					{ value: positions[1], mark: "dot", label: "B", labelPos: "overAxis" },
					{ value: positions[2], mark: "dot", label: "C", labelPos: "overAxis" },
					{ value: positions[3], mark: "dot", label: "D", labelPos: "overAxis" }
				],
				width: 400,
				height: 100,
				margin: 20
			});
		};

		NAtask.setTask({
			text: 'На координатной прямой отмечены точки $A$, $B$, $C$, $D$. Одна из них соответствует числу $' + correctLatex + '$. Какая это точка?',
			answers: correctLetter,
			wrongAnswers: ['A', 'B', 'C', 'D'].filter(x => x !== correctLetter)
		});

		AtoB(3, ['A', 'B', 'C', 'D'].indexOf(correctLetter));

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
