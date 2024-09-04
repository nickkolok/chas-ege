(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = 10;
		let minX = -10;
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

		for (let i = minX + 1; i < maxX; i += sl(2, 6, 0.1)) {
			let step = 0.1;
			if (f(i) > f(i - step) && f(i) < f(i + step)) {
				if ((f(i) > f(i - step) && f(i) < f(i + step)))
					genAssert(f(i).abs() > 1.5, 'Точка слишком близко к 0');
				funcAscendingPoints.push([i, f(i)]);
			}
			if (f(i) < f(i - step) && f(i) > f(i + step))
				if ((f(i) < f(i - step) && f(i) > f(i + step))) {
					genAssert(f(i).abs() > 1.5, 'Точка слишком близко к 0');
					funcDescendingPoints.push([i, f(i)]);
				}
		}
		funcAscendingPoints = funcAscendingPoints.iz(2);
		funcDescendingPoints = funcDescendingPoints.iz(2);

		let points = [funcAscendingPoints.T()[0].concat(funcDescendingPoints.T()[0]), funcAscendingPoints.T()[1].concat(
			funcDescendingPoints.T()[1])].T();

		let derivativeAsc = funcAscendingPoints.T()[0].map((x) => [x, (f(x) - f(x - 0.01)) * 100]);
		let derivativeDesc = funcDescendingPoints.T()[0].map((x) => [x, (f(x) - f(x - 0.01)) * 100]);

		let condition;
		//TODO: придумать что-нибудь получше
		if ((derivativeAsc[0][1].abs() - derivativeAsc[1][1].abs()).abs() >= 1.5) {
			condition = ['наибольшая'];
			if (derivativeAsc[0][1] < derivativeAsc[1][1])
				condition.push(derivativeAsc[1][0]);
			else
				condition.push(derivativeAsc[0][0]);
		}
		if ((derivativeDesc[0][1].abs() - derivativeDesc[1][1].abs()).abs() >= 1.5) {
			condition = ['наименьшее'];
			if (derivativeDesc[0][1] > derivativeDesc[1][1])
				condition.push(derivativeDesc[1][0]);
			else
				condition.push(derivativeDesc[0][0]);
		}
		genAssert(condition.length != 1);

		let pointsView = points.T()[0].map((num) => num.ts());

		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '',
				y1: '',
				sh1: 17,
			}, 20);

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

			ct.fillStyle = "#0099ff";
			graph9AmarkCircles(ct, points, points.length, 0.1);


			ct.scale(1 / 20, -1 / 20);
			ct.lineWidth = 2;
			ct.fillStyle = "#007acc";
			for (let i = 0; i < points.length; i++) {
				ct.font = "17px liberation_sans";

				if (f(points[i][0]) < 0) {
					ct.fillText(pointsView[i], points[i][0] * 20, -3);
				} else {
					ct.fillText(pointsView[i], points[i][0] * 20, 15);
				}

				ct.setLineDash([4, 2]);
				ct.drawLine(points[i][0] * 20, 0, points[i][0] * 20, -points[i][1] * 20);
				graph9AmarkCircles(ct, [
					[points[i][0] * 20, 0]
				], 1, 2);

			}

		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции $y=f(x)$ и отмечены точки $' + pointsView.join('$; $') +
				'$. В какой из этих точек значение производной ' + condition[0] + '? В ответе укажите эту точку. ',
			answers: condition[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//317544 318045 318055 318139 318047 318049 318051 318053 318057 318059 
//318061 318063 318065 318067 318069 318071 318073 318075 318077 318079 
//318081 318083 318085 318087 318089 318091 318093 318095 318097 318099 
//318121 318123 318125 318127 318129 318131 318133 318135 318137 318141 318143
