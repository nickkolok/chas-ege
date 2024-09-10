(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 10);
		let minX = maxX - sl(8, 10);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 6).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let number = 0;

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(f(i));
			}
			if (extremum.length)
				genAssert((number - extremum[extremum.length - 1]).abs() > 1, 'Слишком близко к линии');

		}
		genAssert(extremum.length > 1, 'Минимумов недостаточно');

		let root = [];
		let step = 0.01;
		for (let i = minX + step; i < maxX - step; i += step)
			if ((f(i) >= number && f(i + step) <= number) || (f(i) <= number && f(i + step) >= number)) {
				genAssert((i.round().abs() - i.abs()).abs() < 0.1, 'Кривые корни');
				root.push(i.round());
			}

		genAssert(root.length == 2, 'Слишком много корней');

		let condition = '';
		root = root.iz();
		
		if (f(root) > f(root + 0.1) && f(root) < f(root - 0.1))
			condition = 'минимума';
		else
			genAssert(false, '!');

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
				ct.fillText(maxX, 20 * maxX, 15);

			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 13, 15);

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
		};
		NAtask.setTask({
			text: 'На рисунке изображён график $y=f\'(x)$ — производной функции $f(x)$, определенной на интервале $(' +
				minX + ';' + maxX + ')$. ' +
				'Найдите точку '+condition+' функции $f(x)$.',
			answers: root,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
/*38 по Ширяевой*/
