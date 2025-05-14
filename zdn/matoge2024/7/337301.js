(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let borders = sl1() ? [-1, 0] : [0, 1];
		let [left, right] = borders;

		let outsideLeft = left - 0.5;
		let outsideRight = right + 0.5;
		let randPointA = sl1();
		let pointA = sl(0.01, 0.99, 0.01) * [(left - outsideLeft), (outsideRight - right)][randPointA] + [outsideLeft, right][randPointA];

		let paint1 = function (ct) {
			coordAxis_prepare(ct, { width: 400, height: 100 });
			let w = ct.__coordAxisW;
			let mid = w / 2;

			// Засечки
			let x1 = mid - 75;
			let x2 = mid + 75;
			let ratio = (x2 - x1) / (borders[1] - borders[0]);

			coordAxis_drawMarkPoint(ct, x1, borders[0], "line", "underAxis");
			coordAxis_drawMarkPoint(ct, x2, borders[1], "line", "underAxis");

			let pointA_coord = x1 + (pointA - borders[0]) * ratio;
			coordAxis_drawMarkPoint(ct, pointA_coord, "a", "dot", "overAxis");
		};

		let pointA2 = pointA ** 2;
		let pointA3 = pointA ** 3;
		let pointA4 = pointA ** 4;

		let randA = sl1();
		let options = [[["a", pointA], ["a^2", pointA2], ["a^3", pointA3]], [["a^2", pointA2], ["a^3", pointA3], ["a^4", pointA4]]][randA];

		let isMaxTaskOrMin = sl1();
		let targetValue = [options.T(x => x[1])[1].maxE(), options.T(x => x[1])[1].minE()][isMaxTaskOrMin];
		let maxOrMin = ['бол', 'мен'][isMaxTaskOrMin];

		let correctOptions = options.filter(x => x[1] === targetValue);
		let correct = correctOptions.length === 1 ? correctOptions[0][0] : "нет данных";

		let allLabels = options.map(x => x[0]);
		allLabels.pushIf("нет данных", !allLabels.includes("нет данных"));

		NAtask.setTask({
			text: "На координатной прямой отмечены числа. Какое из перечисленных чисел наи" + maxOrMin + "ьшее?",
			answers: correct,
			wrongAnswers: allLabels.filter(label => label !== correct)
		});

		AtoB(3, allLabels.indexOf(correct));

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1,
		});
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=337301


