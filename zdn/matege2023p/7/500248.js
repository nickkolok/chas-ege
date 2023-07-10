(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(5, 10);
		let minX = maxX - sl(10, 15);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 10).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}
		let spline = new Spline(X, Y);
		let extremum = [];

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(f(i));
			}
		}
		genAssert(extremum.length > 2, 'Максимумов недостаточно');

		let funcAscendingPoints = [];
		let funcDescendingPoints = [];
		let points = [];
		for (let i = minX + 1; i < maxX; i += sl(1, 3, 0.1)) {
			let step = 0.4;
			if (f(i) > f(i - step) && f(i) < f(i + step)) {
				if ((f(i) > f(i - step) && f(i) < f(i + step)))
					genAssert(f(i).abs() > 1.5, 'Экстремум слишком близко к 0');
				points.push([i, f(i)]);

				funcAscendingPoints.push(i);
			}
			if (f(i) < f(i - step) && f(i) > f(i + step))
				if ((f(i) < f(i - step) && f(i) > f(i + step))) {
					genAssert(f(i).abs() > 1.5, 'Экстремум слишком близко к 0');
					points.push([i, f(i)]);

					funcDescendingPoints.push(i);
				}
		}

		genAssert(points.length > 3, 'точек мало');
		let condition = [
			['положительна', funcAscendingPoints],
			['отрицательна', funcDescendingPoints]
		].iz();
		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '',
				y1: '',
				sh1: 13,
			}, 40);

			ct.fillStyle = "black";
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

			ct.fillStyle = "#0099ff";
			graph9AmarkCircles(ct, points, points.length, 0.1);


			ct.scale(1 / 20, -1 / 20);
			ct.lineWidth = 2;
			ct.fillStyle = "#007acc";
			for (let i = 0; i < points.length; i++) {
				ct.font = "17px liberation_sans";

				if (f(points[i][0]) < 0) {
					ct.fillText('x', points[i][0] * 20, -3);
					ct.font = "14px liberation_sans";
					ct.fillText((i + 1).toString(), (points[i][0] + 0.4) * 20, 0);
				} else {
					ct.fillText('x', (points[i][0] - 0.5) * 20, 12);
					ct.font = "14px liberation_sans";
					ct.fillText((i + 1).toString(), (points[i][0] - 0.1) * 20, 15);
				}

				ct.setLineDash([4, 2]);
				ct.drawLine(points[i][0] * 20, 0, points[i][0] * 20, -points[i][1] * 20);
				graph9AmarkCircles(ct, [
					[points[i][0] * 20, 0]
				], 1, 2);

			}

		};
		NAtask.setTask({
			text: 'На рисунке изображён график дифференцируемой функции $y=f(x)$. ' +
				'На оси абсцисс отмечены ' + chislitlx(points.length, 'точка') + ' : $x\_1, x\_2, x\_3, \\dots, x\_' + points.length + '$. ' +
				'Среди этих точек найдите все точки, в которых производная функции $f(x)$ ' + condition[0] + '. ' +
				'В ответе укажите количество найденных точек.',
			answers: condition[1].length,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//500248
//Демонстрационный вариант ФИПИ
