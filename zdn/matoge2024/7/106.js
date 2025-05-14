(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let leftEdge = sl(1, 8);
		let positions = [];
		for (let i = 1; i <= 4; i++) {
			positions.push(leftEdge + (2 * i) / 5);
		}

		let idx = sl(0, 3);
		let val = positions[idx];

		let denominator = sl(2, 20);
		let numerator = (val * denominator).round();
		genAssert((numerator / denominator - val).abs() > 0.01, "не слишком близкое к целому числу значение");

		let correctLatex = numerator.texfrac(denominator);
		let correctLetter = ['A', 'B', 'C', 'D'][idx];

		let paint = function (ct) {
			coordAxis_prepare(ct, { width: 400, height: 100 });

			let x0 = 40;
			let x1 = ct.__coordAxisW - 40;
			let scale = (x1 - x0) / 2;

			for (let i = 0; i <= 2; i++) {
				let x = x0 + i * scale;
				coordAxis_drawMarkPoint(ct, x, (leftEdge + i), "line", "underAxis");
			}

			for (let i = 0; i < 4; i++) {
				let val = positions[i];
				let x = x0 + (val - leftEdge) * scale;
				coordAxis_drawMarkPoint(ct, x, ['A', 'B', 'C', 'D'][i], "dot", "overAxis");
			}
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
//zer00player
//https://oge.sdamgia.ru/test?likes=105
