(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let minX = -sl(5, 10);
		let maxX = sl(5, 11);
		let segmentMin = sl(minX + 1, (maxX / 2).floor());
		let segmentMax = sl(segmentMin + 1, maxX - 0.5);

		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 2, 0.5)) {
			X.push(i);
		}
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 5).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}

		let spline = new Spline(X, Y);
		genAssert(f(maxX).abs() < 7, 'Экстремум за пределами сетки');

		let extremums = findExtremumsOfFunction(f, minX, maxX, 0.1);
		let extremumsAll = extremums.minP.concat(extremums.maxP);

		genAssert(extremumsAll.length > 2, 'Экстремумов недостаточно');

		let extremumsX = extremumsAll.T()[0].sortNumericArr();
		let extremumsY = extremumsAll.T()[1];

		extremumsX.forEach((elem) => genAssert((elem - segmentMin).abs() > 0.3), 'Экстремум слишком близко к левому концу');
		extremumsX.forEach((elem) => genAssert((elem - segmentMax).abs() > 0.3), 'Экстремум слишком близко к правому концу');

		extremumsY.forEach((elem) => genAssert(elem.abs() < 7), 'Экстремум за пределами сетки');
		extremumsY.forEach((elem, index) => {
			if (index != extremumsY.length - 1)
				genAssert((elem - extremumsY[index + 1]).abs() > 1,	'Экстремумы слишком близко');
		});

		let answ = extremumsX.kolvoMzhd(segmentMin, segmentMax, true);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 500;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ctx.font = "12px liberation_sans";
			ctx.strokeStyle = 'black';
			ctx.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ctx.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1) {
				ctx.fillText(maxX, 20 * maxX, 15);
			}
			if (minX != 0 && minX != 1) {
				ctx.fillText(minX, 20 * minX - 13, 15);
			}
			ctx.scale(20, -20);
			ctx.lineWidth = 0.13;

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
				')$. Найдите количество ' + ['точек, в которых ' + ['касательная к графику функции параллельна прямой $y=' +
				sl(0, 20, 0.1).ts(1) + '$ или совпадает с ней,', 'производная функции $f(x)$ равна $0$,'].iz(),
				'решений уравнения $f\'(x)=0$'].iz() + ' на отрезке $[' + segmentMin + '; ' + segmentMax + ']$.',
			answers: answ,
			analys: 'Всего точек экстремума: ' + extremumsAll.length + '<br>' +
				extremumsAll.map((elem) => '$(' + elem[0].toFixedLess(2) + ';' + elem[1].toFixedLess(2) + ')$').join('<br>'),
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 10000);
})();
/*27496 6427 8039 8047 7805 7811 7813 7815 7819 7827 7831 7837 7845 7853 7857 7863 7867 7871 7883 7887 7889 7903 7905 7917 7923 7927 7931 7933 7937 7953 7957 7961 7963 7965 7973 7981 7983 7989 7993 7995 8003 8007 8011 8019 8021 8023 8033 8043
 */
