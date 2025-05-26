(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let borders = [0, 1];
		let [left, right] = borders;

		let a = [(Math.random() * 0.6 - 0.7), (Math.random() * 0.6 + 1.1)].iz().toFixed(2);
		let b = [(Math.random() * 0.6 - 0.7), (Math.random() * 0.6 + 1.1)].iz().toFixed(2);

		genAssert((a - b).abs() > 0.05,"Точки не должны располагаться слишком близко");


		let labels = [['a', 'b'], ['x', 'y'], ['c', 'd']].iz();
		let [labelA, labelB] = labels;

		let paint1 = function (ct) {
			coordAxis_prepare(ct, { width: 450, height: 100 });
			let w = ct.__coordAxisW;
			let mid = w / 2;

			let x1 = mid - 75;
			let x2 = mid + 75;
			let scale = (x2 - x1) / (right - left);

			coordAxis_drawMarkPoint(ct, x1, "0", "line", "underAxis");
			coordAxis_drawMarkPoint(ct, x2, "1", "line", "underAxis");

			let a_coord = x1 + (a - left) * scale;
			let b_coord = x1 + (b - left) * scale;

			coordAxis_drawMarkPoint(ct, a_coord, labelA, "dot", "overAxis");
			coordAxis_drawMarkPoint(ct, b_coord, labelB, "dot", "overAxis");
		};

		let invA = 1 / a;
		let invB = 1 / b;

		let values = [
			[`1/${labelA}`, invA],
			[`1/${labelB}`, invB],
			["1", 1]
		];

		// Проверка на корректность
		let valid = values.every(x => Number.isFinite(x[1])) &&
			new Set(values.map(x => +x[1].toFixed(4))).size === 3;

		genAssert(valid,"Не подходящие значения");

		let isAscending = sl1();
		let sorted = values.slice().sort((x, y) =>
			isAscending ? x[1] - y[1] : y[1] - x[1]
		);

		let correct = sorted.map(x => x[0]).join(", ");

		let wrongAnswers = new Set();
		while (wrongAnswers.size < 3) {
			let perm = values.shuffle();
			let variant = perm.map(x => x[0]).join(", ");
			if (variant !== correct) wrongAnswers.add(variant);
		}

		NAtask.setTask({
			text: 'Расположите в порядке ' + ['убывания', 'возрастания'][isAscending] + ' числа.',
			answers: correct,
			wrongAnswers: Array.from(wrongAnswers)
		});

		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 450,
			height: 100,
			paint: paint1
		});
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/test?likes=317600
