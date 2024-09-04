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
		for (let i = minX; i <= maxX; i += sl(1.3, 3.4, 0.3))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				if (i % 2)
					Y[i] = Y[i - 1] + sl(4, 6).pm();
				else
					Y[i] = 0;
			} while (Y[i].abs() > 5);
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let points = [];
		let step = 0.001;
		for (let i = minX; i < maxX; i += step) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - step) && f(i) < f(i + step) || (f(i) > f(i - step) && f(i) > f(i + step))) {
				genAssert((i.abs() - i.round().abs()).abs() > 0.3, 'Экстремум целый');
				extremum.push([i, f(i)]);
			}


			if (extremum.length > 0) {
				genAssert(extremum[extremum.length - 1][1].abs().round() != 0, 'Слишком непонятный экстремум');
			}
		}
		genAssert(extremum.length > 1, 'Экстремумов недостаточно');

		for (let i = minX + 1; i < maxX; i++)
			points.push(i);

		let pointsOfIncreasing = [];
		let pointsOfDecreasing = [];

		for (let i = 0; i < points.length; i++) {
			if (f(points[i]))
				if (f(points[i]) > f(points[i] - 0.1) && f(points[i]) < f(points[i] + 0.1))
					pointsOfIncreasing.push(points[i]);
				else
					pointsOfDecreasing.push(points[i]);
		}


		let condition = [
			['положительна', [
				['сумму', pointsOfIncreasing.sum()],
				['количество', pointsOfIncreasing.length]
			].iz()],
			['отрицательна', [
				['сумму', pointsOfDecreasing.sum()],
				['количество', pointsOfDecreasing.length]
			].iz()]
		].iz();

		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ct.font = "12px liberation_sans";
			ct.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ct.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1)
				ct.fillText(maxX, 20 * maxX - 5, 15);
			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 10, 15);
			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);

			ct.fillStyle = "blue";
		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции y = f(x), определенной на интервале $(' + minX + '; ' + maxX +
				')$. ' +
				'Определите ' + condition[1][0] + ' целых точек, в которых производная функции ' + condition[0] + '.',
			answers: condition[1][1],
		});
		chas2.task.modifiers.addCanvasIllustration({
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
