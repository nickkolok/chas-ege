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

		// Корень не должен быть слишком близко к целому (чтобы не слипался с засечкой)
		genAssert(Math.min(root % 1, 1 - root % 1) >= 0.1, "корень слишком близко к целому");

		// Расставляем три неправильные точки
		let wrongs = [];
		let candidates = [];
		for (let k = 1; k <= 19; k++) {
			let p = leftEdge + k / 10;
			if (Math.min(p % 1, 1 - p % 1) < 0.1) continue;  // липнет к засечке
			if (Math.abs(p - root) < 0.25) continue;		   // липнет к правильной
			candidates.push(p);
		}
		let shuffledCandidates = candidates.shuffle();
		for (let p of shuffledCandidates) {
			if (wrongs.every(w => Math.abs(w - p) >= 0.25)) {
				wrongs.push(p);
			}
			if (wrongs.length === 3) break;
		}
		genAssert(wrongs.length === 3, "не удалось расставить точки");

		// Собираем все позиции и сортируем
		let positions = [root].concat(wrongs).sort((a, b) => a - b);
		let correctIndex = positions.indexOf(root);
		let correctLetter = ['A', 'B', 'C', 'D'][correctIndex];

		let paint = function (ct) {
			coordAxis_drawAuto(ct, {
				min: leftEdge,
				max: leftEdge + 2,
				points: [
					{ value: leftEdge, mark: "line", label: leftEdge.toString(), labelPos: "underAxis" },
					{ value: leftEdge + 1, mark: "line", label: (leftEdge + 1).toString(), labelPos: "underAxis" },
					{ value: leftEdge + 2, mark: "line", label: (leftEdge + 2).toString(), labelPos: "underAxis" },
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

		AtoB(3, {autoLaTeX: true});

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
