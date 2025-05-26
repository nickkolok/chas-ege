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
