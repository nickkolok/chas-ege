(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	retryWhileError(function () {
		// Выбираем представление с k > 0: одновременная смена знаков k и b сохраняет график.
		let k = sl(1, 4) / 2;
		let b = slKrome(0, -5, 5) / 2;
		let f = x => Math.abs(k * Math.abs(x) + b);
		let vertex = -b / k;
		genAssert(b > 0 || vertex < 5.5, 'Излом должен быть виден на графике');
		let points = intPoints(f, {minX: 1, maxX: 7, minY: 1, maxY: 5})
			.filter(([x]) => k * x + b > 0);
		genAssert(points.length >= 2, 'Нужны две точки с разными модулями абсцисс');
		let marks = points.iz(2).map(([x, y]) => [x.pm(), y]);

		let x = sl(8, 12);
		let value = f(x);
		let lastRoot = (value - b) / k;
		genAssertZ1000(lastRoot, 'Крайний корень должен иметь конечную десятичную запись');
		let variants = [
			['произведение $k\\cdot b$', k * b, false],
			['сумму $k+b$', k + b, true],
			['$f(' + x.pm() + ')$', value, false],
			['коэффициент $k$', k, true],
			['наибольшее $x$, при котором $f(x)=' + value.ts() + '$', lastRoot, false],
			['наименьшее $x$, при котором $f(x)=' + value.ts() + '$', -lastRoot, false],
		];
		if (!b.isZ()) {
			variants.push(['коэффициент $b$', b, true]);
		}
		let [question, answer, needsSign] = variants.iz();
		let restrictions = needsSign ? ', где $k>0$' : '';
		let inner = (k.ts() + '\\lvert x\\rvert+' + b.ts()).plusminus();
		NAtask.setTask({
			text: 'На рисунке изображён график функции $f(x)=\\Bigl|k\\lvert x\\rvert+b\\Bigr|$' +
				restrictions + '. Найдите ' + question + '.',
			answers: answer,
			analys: 'На внешних ветвях графика $f(x)=k\\lvert x\\rvert+b$ при выборе $k>0$. ' +
				'По двум отмеченным точкам с разными $\\lvert x\\rvert$ получаем ' +
				'$f(x)=\\Bigl|' + inner + '\\Bigr|$.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: function (ct) {
				graph9AdrawAxes_20_300(ct);
				ct.translate(140, 140);
				ct.scale(20, -20);
				ct.lineWidth = 0.1;
				graph9AdrawFunction(ct, f, {minX: -6.8, maxX: 6.8, minY: -0.1, maxY: 6.8, step: 0.05});
				graph9AmarkCircles(ct, marks, undefined, 0.15);
			},
		});
	}, 1000);
})();
//56382401
