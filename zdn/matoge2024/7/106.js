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
			let points = [];

			for (let i = 0; i <= 2; i++) {
				points.push({
					value: leftEdge + i,
					label: leftEdge + i,
					mark: 'line',
					labelPos: 'underAxis'
				});
			}

			// Точки A–D
			for (let i = 0; i < 4; i++) {
				points.push({
					value: positions[i],
					label: ['A', 'B', 'C', 'D'][i],
					mark: 'dot',
					labelPos: 'overAxis'
				});
			}

			coordAxis_drawAuto(ct, { points });
		};

		NAtask.setTask({
			text: 'На координатной прямой отмечены точки A, B, C, D. Одна из них соответствует числу ' + '$' + correctLatex + '$' + '. Какая это точка?',
			answers: correctLetter,
			wrongAnswers: ['A', 'B', 'C', 'D'].filter(x => x !== correctLetter)
		});

		AtoB(3, ['A', 'B', 'C', 'D'].indexOf(correctLetter));

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint
		});
	}, 1000);
})();
