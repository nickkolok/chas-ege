(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 6);
		let minX = maxX - sl(3, 6);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1, 3))
			X.push(i);
		genAssert(X.length > 3, 'малова-то точек');
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = Y[i - 1] + sl(2, 6).pm();
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let intPoints = [X, Y].T();
		intPoints.pop();
		intPoints.shift();
		intPoints = intPoints.iz(1);
		let x0 = intPoints[0][0];

		for (let i = minX; i <= maxX; i += 0.1) {
			genAssert(f(i).abs() < 5, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push([i, f(i)]);
			}
		}

		genAssert(extremum.length < 1, 'Много минимумов');
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
			}, 30);

			ct.scale(30, -30);
			ct.lineWidth = 0.07;

			graph9AdrawFunction(ct, f, {
				minX: minX - sl(0.1, 0.5, 0.1),
				maxX: maxX + sl(0.1, 0.5, 0.1),
				minY: -6.5,
				maxY: 5.2,
				step: 0.01
			});
		};
		let equation = '$y=f(x)$ параллельна прямой $y=' + (f(x0) + 'x+' + sl(0, 20, 0.1).ts(1)).plusminus().replace('0x+',
			'') + '$';
		if (f(x0) == 0 && sl1())
			equation = 'функции $y=f(x)$ параллельна оси абсцисс';
		NAtask.setTask({
			text: 'На рисунке изображен график производной функции $f(x)$. ' +
				'Найдите абсциссу точки, в которой касательная к графику ' + equation + ' или совпадает с ней.',
			answers: x0,
			analys: 'Пересечений с прямой $y=' + f(x0) + '$ в точке $x\_0=' + x0 + '$',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//40130 40131 514459 515184 515185 515186 515187 515188 515189 515190 515191 530666
