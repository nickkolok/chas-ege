(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 7);
		let minX = maxX - sl(3, 7);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(2, 4))
			X.push(i);
		Y.push(sl(1, 4).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = Y[i - 1] + sl(2, 5).pm();
		}
		genAssert(Y[0] != Y[Y.length - 1], 'Скучный график');
		let spline = new Spline(X, Y);
		let extremum = [];
		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 5, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push([i, f(i)]);
			}
		}
		genAssert(extremum.length == 1, 'Больше одного экстремума');
		genAssert((extremum[0][0].okrugldo(0.1)).isZ(), 'Экстремум не целый');

		let paint1 = function(ct) {
			let scale = 30;
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, scale);

			ct.font = "12px liberation_sans";
			ct.drawLine(scale * maxX, 5, scale * maxX, -5);
			ct.drawLine(scale * minX, 5, scale * minX, -5);
			if (maxX != 0 && maxX != 1)
				ct.fillText(maxX, scale * maxX, 15);
			if (minX != 0 && minX != 1)
				ct.fillText(minX, scale * minX, 15);
			ct.scale(scale, -scale);
			ct.lineWidth = 0.1;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -5.5,
				maxY: 5.5,
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
		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции $y = f(x)$, определенной на интервале $(' + minX + '; ' + maxX +
				')$. ' +
				'Найдите корень уравнения $f\'(x)=0$.',
			answers: extremum[0][0],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//562751 629170
