(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let leftEdge = sl(1, 8);
		let start = leftEdge * leftEdge;
		let end = (leftEdge + 2) * (leftEdge + 2) - 1;
		let numForRoot = sl(start, end);
		genAssert(!numForRoot.isPolnKvadr(), "число не должно быть полным квадратом");
		let root = Math.sqrt(numForRoot);

		//Делим отрезок на 5 равных частей — точки A–D между засечками
		let positions = [];
		for (let i = 1; i <= 4; i++) {
			positions.push(leftEdge + (2 * i) / 5);
		}

		//какая точка ближе всего к корню
		let closestIndex = 0;
		let minDiff = Infinity;
		for (let i = 0; i < positions.length; i++) {
			let diff = Math.abs(positions[i] - root);
			if (diff < minDiff) {
				minDiff = diff;
				closestIndex = i;
			}
		}
		let correctLetter = ['A', 'B', 'C', 'D'][closestIndex];

		let paint = function (ct) {
			coordAxis_prepare(ct, { width: 400, height: 100 });

			let w = ct.__coordAxisW;
			let margin = 40;
			let x0 = margin;
			let x1 = w - margin;
			let scale = (x1 - x0) / 2;

			// Чёрточки 
			for (let i = 0; i <= 2; i++) {
				let x = x0 + i * scale;
				coordAxis_drawMarkPoint(ct, x, (leftEdge + i), "line", "underAxis");
			}

			// Точки A–D
			for (let i = 0; i < 4; i++) {
				let val = positions[i];
				let x = x0 + (val - leftEdge) * scale;
				coordAxis_drawMarkPoint(ct, x, ['A', 'B', 'C', 'D'][i], "dot", "overAxis");
			}
		};

		NAtask.setTask({
			text: 'На координатной прямой отмечены точки A, B, C, D. Одна из них соответствует числу $\\sqrt{' + numForRoot + '}$. Какая это точка?',
			answers: correctLetter,
			wrongAnswers: ['A', 'B', 'C', 'D'].filter(l => l !== correctLetter)
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
