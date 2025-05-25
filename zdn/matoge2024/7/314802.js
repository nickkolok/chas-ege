(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 9).pm();
		// Абсолютные величины x и y должны не совпадать
		// и быть различимы визуально без труда
		let y = slKrome([x.abs(),(x+1).abs(),(x-1).abs()], 1, 9).pm();

		let randAlfabel = sl1();
		let label1 = ['x', 'a'][randAlfabel];
		let label2 = ['y', 'b'][randAlfabel];

		let paint1 = function (ct) {
			coordAxis_prepare(ct, { width: 400, height: 100 });
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
			[label1 + " \\cdot " + label2 + " > 0", x * y > 0],
			[label1 + " \\cdot " + label2 + " < 0", x * y < 0],
			[label1 + "^2 \\cdot " + label2 + " > 0", (x ** 2) * y > 0],
			[label1 + "^2 \\cdot " + label2 + " < 0", (x ** 2) * y < 0],
			[label2 + "^2 \\cdot " + label1 + " > 0", (y ** 2) * x > 0],
			[label2 + "^2 \\cdot " + label1 + " < 0", (y ** 2) * x < 0]
		];

		let rand = sl1();
		let correctOrNot = ['верно', 'неверно'][rand];

		let trueExprs = forms.filter(f => f[1]);
		let falseExprs = forms.filter(f => !f[1]);

		genAssert(trueExprs.length >= 3, "Мало истинных выражений");
		genAssert(falseExprs.length >= 3, "Мало ложных выражений");

		trueExprs = trueExprs.map(f => [`$${f[0]}$`, f[1]]);
		falseExprs = falseExprs.map(f => [`$${f[0]}$`, f[1]]);

		let correct = trueExprs.iz();
		let wrong = falseExprs.iz();

		NAtask.setTask({
			text: 'На координатной прямой отмечены числа. Какое из приведённых утверждений для этих чисел ' + correctOrNot + '?',
			answers: [correct[0], wrong[0]][rand],
			wrongAnswers: [falseExprs.map(x => x[0]), trueExprs.map(x => x[0])][rand]
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

