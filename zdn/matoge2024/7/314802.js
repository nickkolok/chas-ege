(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 9).pm();
		let y = slKrome(x.abs(), 1, 9).pm();

		let paint1 = function (ct) {
			const w = 400;
			const h = 100;
			const mid = w / 2;
			const scale = 15;

			ct.translate(0, h / 2);

			// Прямая и стрелка
			ct.strokeStyle = om.primaryBrandColors[0];
			ct.lineWidth = 2;
			ct.drawArrow(10, 0, w - 10, 0);

			// Засечка 0 и подпись
			ct.lineWidth = 1.5;
			ct.drawLine(mid, -6, mid, 6);

			ct.fillStyle = om.secondaryBrandColors[0];
			ct.font = "16px liberation_sans";
			ct.fillText("0", mid - 4, 20);

			// Точки x и y и подпись
			let xCoord = mid + x * scale;
			let yCoord = mid + y * scale;
			ct.drawFilledCircle(xCoord, 0, 4);
			ct.drawFilledCircle(yCoord, 0, 4);

			ct.fillStyle = om.secondaryBrandColors[0];
			ct.font = "16px liberation_sans";
			ct.fillText("x", xCoord - 4, -10);
			ct.fillText("y", yCoord - 4, -10);
		};

		// строки + логическая проверка
		let forms = [
			["x + y > 0", () => x + y > 0],
			["x + y < 0", () => x + y < 0],
			["x - y > 0", () => x - y > 0],
			["x - y < 0", () => x - y < 0],
			["y - x > 0", () => y - x > 0],
			["y - x < 0", () => y - x < 0],
			["x * y > 0", () => x * y > 0],
			["x * y < 0", () => x * y < 0],
			["x^2 * y > 0", () => (x ** 2) * y > 0],
			["x^2 * y < 0", () => (x ** 2) * y < 0],
			["y^2 * x > 0", () => (y ** 2) * x > 0],
			["y^2 * x < 0", () => (y ** 2) * x < 0]
		];

		let rand = sl1();
		let correctOrNot = ['верно', 'неверно'][rand];

		let trueExprs = forms.filter(f => f[1]());
		let falseExprs = forms.filter(f => !f[1]());

		genAssert(trueExprs.length >= 3, "Мало истинных выражений");
		genAssert(falseExprs.length >= 3, "Мало ложных выражений");

		let correct = trueExprs.iz();
		let wrong = falseExprs.iz();
		let wrongForCorrect = falseExprs.filter(e => e !== correct).slice(0, 3);
		let correctForWrong = trueExprs.filter(e => e !== wrong).slice(0, 3);

		NAtask.setTask({
			text: 'На координатной прямой отмечены числа. Какое из приведённых утверждений для этих чисел ' + correctOrNot + '?',
			answers: [correct[0], wrong[0]][rand],
			wrongAnswers: [wrongForCorrect.map(x => x[0]), correctForWrong.map(x => x[0])][rand]
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
//https://oge.sdamgia.ru/test?likes=314802

