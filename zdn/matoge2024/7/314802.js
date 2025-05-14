function coordAxis_drawMarkPoint(ct, coord, text, markForm, textPosition) {

	ct.fillStyle = om.secondaryBrandColors[0];
	switch (markForm) {
		case "dot": // точка
			ct.drawFilledCircle(coord, 0, 4);
			break;
		case "line": // засечка
			ct.lineWidth = 1.5;
			ct.drawLine(coord, -6, coord, 6);
			break;
		case "nothing": // «невидимая точка» — ничего не рисуем
			break;
	}
	ct.font = "16px liberation_sans";

	switch (textPosition) {
		case "underAxis": // под осью
			ct.fillText(text, coord - 4, 20);
			break;
		case "overAxis": // над осью
			ct.fillText(text, coord - 4, -10);
			break;
		case "onAxis": // по центру, справа от оси 
			ct.fillText(text, coord + 15, 5);
			break;
	}
}
function coordAxis_prepare(ct, { width = 450, height = 100 } = {}) {
	ct.__coordAxisW = width;
	ct.__coordAxisH = height;

	ct.translate(0, height / 2);

	ct.strokeStyle = om.primaryBrandColors[0];
	ct.lineWidth = 2;
	ct.drawArrow(10, 0, width - 10, 0);
}

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 9).pm();
		let y = slKrome(x.abs(), 1, 9).pm();

		let randAlfabel = sl1();
		let label1 = ['x', 'a'][randAlfabel];
		let label2 = ['y', 'b'][randAlfabel];

		let paint1 = function (ct) {
			coordAxis_prepare(ct, { width: 450, height: 100 });
			const w = ct.__coordAxisW;
			const mid = w / 2;
			const scale = 15;

			coordAxis_drawMarkPoint(ct, mid, "0", "line", "underAxis");
			coordAxis_drawMarkPoint(ct, mid + x * scale, label1, "dot", "overAxis");
			coordAxis_drawMarkPoint(ct, mid + y * scale, label2, "dot", "overAxis");
		};

		// строки + логическая проверка
		let forms = [
			[label1 + " + " + label2 + " > 0", x + y > 0],
			[label1 + " + " + label2 + " < 0", x + y < 0],
			[label1 + " - " + label2 + " > 0", x - y > 0],
			[label1 + " - " + label2 + " < 0", x - y < 0],
			[label2 + " - " + label1 + " > 0", y - x > 0],
			[label2 + " - " + label1 + " < 0", y - x < 0],
			[label1 + " * " + label2 + " > 0", x * y > 0],
			[label1 + " * " + label2 + " < 0", x * y < 0],
			[label1 + "^2 * " + label2 + " > 0", (x ** 2) * y > 0],
			[label1 + "^2 * " + label2 + " < 0", (x ** 2) * y < 0],
			[label2 + "^2 * " + label1 + " > 0", (y ** 2) * x > 0],
			[label2 + "^2 * " + label1 + " < 0", (y ** 2) * x < 0]
		];

		let rand = sl1();
		let correctOrNot = ['верно', 'неверно'][rand];

		let trueExprs = forms.filter(f => f[1]);
		let falseExprs = forms.filter(f => !f[1]);

		genAssert(trueExprs.length >= 3, "Мало истинных выражений");
		genAssert(falseExprs.length >= 3, "Мало ложных выражений");

		let correct = trueExprs.iz();
		let wrong = falseExprs.iz();

		NAtask.setTask({
			text: 'На координатной прямой отмечены числа. Какое из приведённых утверждений для этих чисел ' + correctOrNot + '?',
			answers: [correct[0], wrong[0]][rand],
			wrongAnswers: [falseExprs.map(x => x[0]), trueExprs.map(x => x[0])][rand]
		});
		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 450,
			height: 100,
			paint: paint1,
		});
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=314802

