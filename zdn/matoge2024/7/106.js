(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let leftEdge = sl(1, 6);

		let denominator = [7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21].iz();
		// Выберем числитель так, чтобы значение попало в интервал [leftEdge, leftEdge+2]
		// и не было слишком близко к целому
		let numerator;
		let val;
		while (true) {
			numerator = sl(leftEdge * denominator + 1, (leftEdge + 2) * denominator - 1);
			val = numerator / denominator;
			if (Math.abs(val - Math.round(val)) >= 0.1) {
				break;
			}
		}
		genAssert(Math.abs(val - Math.round(val)) >= 0.1, "дробь слишком близко к целому");

		let correctLatex = numerator.texfrac(denominator);

		// Расставляем три неправильные точки
		let wrongs = [];
		let candidates = [];
		for (let k = 1; k <= 19; k++) {
			let p = leftEdge + k / 10;
			if (Math.abs(p - Math.round(p)) < 0.1) continue;  // липнет к засечке
			if (Math.abs(p - val) < 0.25) continue;		   // липнет к правильной
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

		let positions = [val].concat(wrongs).sort((a, b) => a - b);
		let correctIndex = positions.indexOf(val);
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
			text: 'На координатной прямой отмечены точки $A$, $B$, $C$, $D$. Одна из них соответствует числу $' + correctLatex + '$. Какая это точка?',
			answers: correctLetter,
			wrongAnswers: ['A', 'B', 'C', 'D'].filter(x => x !== correctLetter)
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
