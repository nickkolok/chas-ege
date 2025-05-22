(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let leftEdge = sl(1, 6);
		let scale = 140; 
		let x0 = 60;

		let positions = [
			leftEdge + 0.1, // A — ближе к началу
			leftEdge + 0.85, // B — симметрия
			leftEdge + 1.15, // C — симметрия
			leftEdge + 1.9  // D — ближе к концу
		];

		let idx = sl(0, 3);
		let val = positions[idx];

		let denominator = [7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21].iz();
		let numerator = Math.round(val * denominator);
		genAssert((numerator / denominator - val).abs() > 0.01, "слишком близко к целому");

		let correctLatex = numerator.texfrac(denominator);
		let correctLetter = ['A', 'B', 'C', 'D'][idx];

		let paint = function (ct) {
			coordAxis_prepare(ct, { width: 400, height: 100 });
			
			for (let i = 0; i <= 2; i++) {
				let x = x0 + i * scale;
				coordAxis_drawMarkPoint(ct, x, (leftEdge + i), "line", "underAxis");
			}

			for (let i = 0; i < 4; i++) {
				let v = positions[i];
				let x = x0 + (v - leftEdge) * scale;
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
