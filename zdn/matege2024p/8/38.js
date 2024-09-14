(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 7);
		let minX = maxX - sl(5, 7);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.5))
			X.push(i);
		Y.push(sl(1, 5).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = (i % 2) ? 0 : sl(2, 5).pm();
		}
		let spline = new Spline(X, Y);

		genAssert(f(maxX).abs() < 5, 'Экстремум за пределами сетки');
		genAssertGraphIntersectsPointWithNeighborhood(f, 1.1, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.5, 1.1, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.3, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, maxX, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, minX, -0.3, 0.2);

		let extremums = findExtremumsOfFunction(f, minX, maxX, 0.1);
		let extremumsAll = extremums.minP.concat(extremums.maxP);

		let extremumsY = extremumsAll.T()[1];
		extremumsY.forEach((elem) => genAssert(elem.abs() < 5), 'Экстремум за пределами сетки');
		extremumsY.forEach((elem) => genAssert(elem.abs() > 0.5), 'Экстремум слишком близко к Ox');

		let root = [];
		let step = 0.01;
		let number = 0;
		for (let i = minX + step; i < maxX - step; i += step)
			if ((f(i) >= number && f(i + step) <= number) || (f(i) <= number && f(i + step) >= number)) {
				genAssert((i.round().abs() - i.abs()).abs() < 0.05, 'Кривые корни');
				root.push(i.round());
			}

		genAssert(root.length == 2, 'Слишком много корней');
		root = root.iz();

		let condition = (f(root) > f(root + 0.3) && f(root) < f(root - 0.3)) ?  'максимума' : 'минимума';

		let paint1 = function(ctx) {
			let h = 400;
			let w = 500;
			let scale = 30;
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, scale);

			ctx.font = "12px liberation_sans";
			ctx.drawLine(scale * maxX, 5, scale * maxX, -5);
			ctx.drawLine(scale * minX, 5, scale * minX, -5);

			if (maxX != 0 && maxX != 1)
				ctx.fillText(maxX, scale * maxX, 15);

			if (minX != 0 && minX != 1)
				ctx.fillText(minX, scale * minX - 13, 15);

			ctx.scale(scale, -scale);
			ctx.lineWidth = 0.1;

			graph9AdrawFunction(ctx, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});

			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ctx.fillStyle = "white";
			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);
		};
		NAtask.setTask({
			text: 'На рисунке изображён график $y=f\'(x)$ — производной функции $f(x)$, определенной на интервале $(' +
				minX + ';' + maxX + ')$. ' +
				'Найдите точку ' + condition + ' функции $f(x)$.',
			answers: root,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	},5000);
})();
//SugarHedgehog
/*38 по Ширяевой*/
