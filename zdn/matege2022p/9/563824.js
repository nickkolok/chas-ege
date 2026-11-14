(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	retryWhileError(function () {
		let a = sl(1, 4).pm() / 2;
		let b = sl(1, 4) / 2;
		let direction = (1).pm();
		let vertexX = sl(-4, 4) / 2;
		let vertexY = sl(-7, 7) / 2;
		let c = -b * vertexX;
		let d = vertexY - a * vertexX;
		let sign = direction > 0 ? '+' : '-';
		let f = x => a * x + d + direction * Math.abs(b * x + c);
		let points = intPoints(f, {minX: -6, maxX: 7, minY: -6, maxY: 5});
		let left = points.filter(([x]) => x < vertexX);
		let right = points.filter(([x]) => x > vertexX);
		genAssert(left.length >= 2 && right.length >= 2, 'На каждой ветви нужны две целочисленные точки');

		let x = sl(8, 12).pm();
		let rhs = a * x + d;
		let variants = [
			['корень уравнения $ax+d=' + rhs.ts() + '$', x, false],
			['сумму $a+b+c+d$', a + b + c + d, true],
			['произведение $a\\cdot b\\cdot c\\cdot d$', a * b * c * d, true],
			['коэффициент $a$', a, false],
			['коэффициент $b$', b, true],
			['коэффициент $c$', c, true],
			['коэффициент $d$', d, false],
		];
		if (!vertexX.isZ()) {
			variants.push(['абсциссу вершины графика', vertexX, false]);
		}
		if (!vertexY.isZ()) {
			variants.push(['ординату вершины графика', vertexY, false]);
		}
		let [question, answer, needsSign] = variants.iz();
		let restrictions = needsSign ? ', где $b>0$' : '';
		let inner = (b.ts() + 'x+' + c.ts()).plusminus();
		let formula = (a.ts() + 'x+' + d.ts()).plusminus() + sign + '\\left|' + inner + '\\right|';

		NAtask.setTask({
			text: 'На рисунке изображён график функции вида $f(x)=ax+d' + sign +
				'\\left|bx+c\\right|$' + restrictions + '. Найдите ' + question + '.',
			answers: answer,
			analys: 'По отмеченным точкам восстановим две линейные части графика. ' +
				'Коэффициент $a$ равен полусумме их угловых коэффициентов, а $|b|$ — половине модуля их разности. ' +
				'Если вершина имеет координаты $(x_0;y_0)$, то $c=-bx_0$ и $d=y_0-ax_0$. ' +
				'При $b>0$ получаем $f(x)=' + formula + '$.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: function (ct) {
				graph9AdrawAxes_20_300(ct);
				ct.translate(140, 140);
				ct.scale(20, -20);
				ct.lineWidth = 0.1;
				graph9AdrawFunction(ct, f, {minX: -6, maxX: 7, minY: -6.8, maxY: 6.8, step: 0.05});
				graph9AmarkCircles(ct, left, 2, 0.15);
				graph9AmarkCircles(ct, right, 2, 0.15);
			},
		});
	}, 1000);
})();
//563824
