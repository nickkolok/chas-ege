(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 9).pm();
		// Абсолютные величины x и y должны не совпадать
		// и быть различимы визуально без труда
		let y = slKrome([x.abs(),(x+1).abs(),(x-1).abs()], 1, 9).pm();

		let labels = window.smallLatinLetters.iz(2);
		let label1 = labels[0];
		let label2 = labels[1];

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, { points: [
				// Выставляем правый край насильно, чтобы при авторасчёте масштаба не терялась вариативность
				{ value:  10, mark: "nothing" },
				// Левый тоже
				{ value: -10, mark: "nothing" },
				// Нолик с чёрточкой!
				{ value:   0, mark: "line",  label:    "0", labelPos: "underAxis" },
				// Сами точки
				{ value:   x, mark: "dot",   label: label1, labelPos: "overAxis"  },
				{ value:   y, mark: "dot",   label: label2, labelPos: "overAxis"  },
			] });
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

		NAtask.setTask({
			text: 'На координатной прямой отмечены числа. Какое из приведённых утверждений для этих чисел ' + correctOrNot + '?',
			markedAnswers: forms,
			invertMarkedAnswers: rand,
		});
		AtoB(3, {autoLaTeX: true});

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1,
		});
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=314802
