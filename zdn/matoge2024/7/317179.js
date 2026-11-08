(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 10).pm();
		let y = slKrome([x.abs(), (x + 1).abs(), (x - 1).abs()], 1, 9).pm();

		let randAlphabet = window.smallLatinLetters.iz(2);
		let label1 = randAlphabet[0];
		let label2 = randAlphabet[1];

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				points: [
					{ value: 10, mark: "nothing" },
					{ value: -10, mark: "nothing" },
					{ value: 0, mark: "line", label: "0", labelPos: "underAxis" },
					{ value: x, mark: "dot", label: label1, labelPos: "overAxis" },
					{ value: y, mark: "dot", label: label2, labelPos: "overAxis" },
				]
			});
		};

		
		NAtask.setTask({
			text: "На координатной прямой отмечены числа. Какое из следующих утверждений верно?",
			markedAnswers: [ // Генерация всех утверждений
				[`$ ${label1} < ${label2} $ и $ |${label1}| < |${label2}| $`, x < y && x.abs() < y.abs()],
				[`$ ${label1} < ${label2} $ и $ |${label1}| > |${label2}| $`, x < y && x.abs() > y.abs()],
				[`$ ${label1} > ${label2} $ и $ |${label1}| < |${label2}| $`, x > y && x.abs() < y.abs()],
				[`$ ${label1} > ${label2} $ и $ |${label1}| > |${label2}| $`, x > y && x.abs() > y.abs()],
			],
		});
		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1,
		});
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=317179
