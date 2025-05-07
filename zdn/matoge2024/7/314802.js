function drawMarkPoint(ct, coord, text, markForm, textPosition) {

	if (markForm) {
		ct.lineWidth = 1.5;
		ct.drawLine(coord, -6, coord, 6);
	} else {
		ct.drawFilledCircle(coord, 0, 4);
	}

	ct.fillStyle = om.secondaryBrandColors[0];
	ct.font = "16px liberation_sans";
	if (textPosition) {
		ct.fillText(text, coord - 4, -10);
	} else {
		ct.fillText(text, coord - 4, 20);;
	}
};

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
			drawMarkPoint(ct, mid, "0", 1, 0);
			drawMarkPoint(ct, mid + x * scale, "x", 0, 1);
			drawMarkPoint(ct, mid + y * scale, "y", 0, 1);

		};

		// строки + логическая проверка
		let forms = [
			["x + y > 0", x + y > 0],
			["x + y < 0", x + y < 0],
			["x - y > 0", x - y > 0],
			["x - y < 0", x - y < 0],
			["y - x > 0", y - x > 0],
			["y - x < 0", y - x < 0],
			["x * y > 0", x * y > 0],
			["x * y < 0", x * y < 0],
			["x^2 * y > 0", (x ** 2) * y > 0],
			["x^2 * y < 0", (x ** 2) * y < 0],
			["y^2 * x > 0", (y ** 2) * x > 0],
			["y^2 * x < 0", (y ** 2) * x < 0]
		];

		let rand = sl1();
		let correctOrNot = ['верно', 'неверно'][rand];

		let trueExprs = forms.filter(f => f[1]);
		let falseExprs = forms.filter(f => !f[1]);

		genAssert(trueExprs.length >= 3, "Мало истинных выражений");
		genAssert(falseExprs.length >= 3, "Мало ложных выражений");

		let correct = trueExprs.iz();
		let wrong = falseExprs.iz();
		let wrongForCorrect = falseExprs.filter(e => e !== correct);
		let correctForWrong = trueExprs.filter(e => e !== wrong);

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

