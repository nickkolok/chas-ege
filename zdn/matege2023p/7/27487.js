(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}

		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(8, 10);
		let minX = maxX - sl(13, 18);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1.3, 4.3, 0.3))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				if (i % 2)
					Y[i] = Y[i - 1] + sl(4, 6).pm();
				else
					Y[i] = 0;
			} while (Y[i].abs() > 9);
		}
		let spline = new Spline(X, Y);
		genAssert(f(maxX).abs() < 9, 'Экстремум за пределами сетки');
		genAssertGraphIntersectsPointWithNeighborhood(f, 1.1, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.5, 1.1, 0.3);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.3, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, maxX, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, minX, -0.3, 0.2);

		let extremums = findExtremumsOfFunction(f, minX, maxX);
		let extremumsAll = [...extremums.minP, ...extremums.maxP].sort((a, b) => a[0] - b[0]);
		genAssert(extremumsAll.length > 1, 'Экстремумов недостаточно');

		let extremumsY = extremumsAll.T()[1];
		extremumsY.forEach((elem) => genAssert(elem.abs() < 5), 'Экстремум за пределами сетки');
		extremumsY.forEach((elem) => genAssert(elem.abs() > 0.5), 'Экстремум слишком близко к Ox');

		for (let i = 0; i < extremumsY.length - 1; i++) {
			 genAssert(Math.abs(extremumsY[i] - extremumsY[i + 1]) > 1);
		}

		let extremumsX = extremumsAll.T()[0].sortNumericArr();
		extremumsX.forEach((elem) => genAssert((elem.abs() - elem.abs().floor()).abs() > 0.5,
			'Невозможно определить целую точку, если экстремум в ' + elem));

		let intervals = findIntervalsOfIncreaseAndDecrease(f, minX, maxX, extremums);
		let points = findIncreasingAndDecreasingPoints(intervals, minX, maxX);

		let condition = [
			['положительна', [
				['сумму', points.increasingPoints.sum()],
				['количество', points.increasingPoints.length]
			].iz()],
			['отрицательна', [
				['сумму', points.decreasingPoints.sum()],
				['количество', points.decreasingPoints.length]
			].iz()]
		].iz();

		let paint1 = function(ctx) {
			let h = 400;
			let w = 500;
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ctx.font = "12px liberation_sans";
			ctx.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ctx.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1)
				ctx.fillText(maxX, 20 * maxX - 5, 15);
			if (minX != 0 && minX != 1)
				ctx.fillText(minX, 20 * minX - 10, 15);
			ctx.scale(20, -20);
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
			text: 'На рисунке изображен график функции $y = f(x)$, определенной на интервале $(' + minX + '; ' + maxX +
				')$. ' +
				'Определите ' + condition[1][0] + ' целых точек, в которых производная функции ' + condition[0] + '.',
			answers: condition[1][1],
			analys: 'Точки возрастания: $' + points.increasingPoints.join(', ') + '$<br>' +
				'Точки убывания: $' + points.decreasingPoints.join(', ') + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
/*27487: 6867 7089 559401 6869 6877 6879 6883 6885 6887 6889 6891 6893 6895 
6901 6905 6911 6913 6915 6917 6921 6923 6925 6929 6935 6941 6945 6947 6951 6953 
6961 6965 6971 6975 6979 6981 6985 6987 6997 6999 7001 7007 7009 7013 7015 7023 
7027 7033 7035 7045 7051 7053 7055 7057 7065 7071 7075 7077 7079 7083 7085 7087
*/
