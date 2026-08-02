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
			text: 'На координатной прямой отмечены точки $A$, $B$, $C$, $D$. Одна из них соответствует числу $\\sqrt{' + numForRoot + '}$. Какая это точка?',
			answers: correctLetter,
			wrongAnswers: ['A', 'B', 'C', 'D'].filter(l => l !== correctLetter)
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
//zer00player
//https://oge.sdamgia.ru/test?likes=105
