(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '317600';
		let preference = ['descending', 'ascending'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let randA = sl(0, 2);
		let randB = sl(0, 2);
		let a = [sl(-0.9, 0.3, 0.01), sl(0.3, 0.9, 0.01), sl(1.1, 2.5, 0.01)][randA];
		let b = [sl(-0.9, 0.3, 0.01), sl(0.3, 0.9, 0.01), sl(1.1, 2.5, 0.01)][randB];

		genAssert((a - b).abs() > 0.1, "Точки не должны быть слишком близко друг к другу");

		let labels = window.smallLatinLetters.iz(2);
		let labelA = labels[0];
		let labelB = labels[1];

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				points: [
					{ value: -1.0, mark: "nothing" },
					{ value: 1.0, mark: "nothing" },
					{ value: 0, mark: "line", label: "0", labelPos: "underAxis" },
					{ value: 1, mark: "line", label: "1", labelPos: "underAxis" },
					{ value: a, mark: "dot", label: labelA, labelPos: "overAxis" },
					{ value: b, mark: "dot", label: labelB, labelPos: "overAxis" },
				],
				width: 400,
				height: 100,
				margin: 20
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

		let sorted = values.slice().sort((x, y) =>
			rand ? x[1] - y[1] : y[1] - x[1]
		);
		let correct = sorted.map(x => x[0]).join(", ");

		let wrongAnswers = new Set();
		while (wrongAnswers.size < 3) {
			let perm = values.shuffle();
			let variant = perm.map(x => x[0]).join(", ");
			if (variant !== correct) {
				wrongAnswers.add(variant);
			}
		}

		NAtask.setTask({
			text: 'Расположите в порядке ' + ['убывания', 'возрастания'][rand] + ' числа.',
			answers: correct,
			wrongAnswers,
			preference,
		});

		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1
		});
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/test?likes=317600
