(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let intervals = [].concat(
			sl(-0.7, -0.1, 0.03),
			sl(0.1, 0.9, 0.03),
			sl(1.1, 1.7, 0.03)
		);

		let a = intervals.iz();
		let b = slKrome([a] - 0.7, 1.7, 0.03);

		genAssert((a - b).abs() > 0.1, "Точки не должны быть слишком близко друг к другу");
		genAssert(intervals.includes(a), "a вне допустимого интервала");
		

		let labels = window.smallLatinLetters.iz(2);
		let labelA = labels[0];
		let labelB = labels[1];

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				points: [
					// Нолик и плюс-минус единичка с чёрточками!
					{ value: 0, mark: "line", labelPos: "underAxis", label: 0 },
					{ value: 1, mark: "line", labelPos: "underAxis", label: 1 },
					// Сами точки
					{ value: 1 * a, mark: "dot", label: labelA, labelPos: "overAxis" },
					{ value: 1 * b, mark: "dot", label: labelB, labelPos: "overAxis" },
					// И немного разбавляем края для вариативности
					{ value: -0.8, mark: "nothing" },
					{ value: +1.8, mark: "nothing" },
				]
			});
		};

		let invA = 1 / a;
		let invB = 1 / b;
		let values = [
			[`$\\frac{1}{${labelA}}$`, invA],
			[`$\\frac{1}{${labelB}}$`, invB],
			[`$1$`, 1]
		];

		// Проверка на корректность
		let valid = values.every(x => Number.isFinite(x[1])) &&
			new Set(values.map(x => +x[1].toFixed(4))).size === 3;

		genAssert(valid, "Не подходящие значения");

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
