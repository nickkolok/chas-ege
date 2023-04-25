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
			Y[i] = Y[i - 1] + sl(2, 10).pm();
		}
		let spline = new Spline(X, Y);
		let extremum = findExtremumsOfFunction(f, minX, maxX, 0.01,true,true);
		
		let minimum=extremum.minP.T()[1];
		let maximum=extremum.maxP.T()[1];
		
		genAssert(minimum.minE().abs()<8, 'минмум ниже -8');
		genAssert(maximum.maxE().abs()<8, 'минмум ниже -8');


		let funcAscendingPoints = [];
		let funcDescendingPoints = [];

		for (let i = minX + 1; i < maxX; i += sl(2, 6, 0.1)) {
			let step = 0.1;
			if (f(i).abs() > 1.5) {
				if (f(i) > f(i - step) && f(i) < f(i + step)) {
					if ((f(i) > f(i - step) && f(i) < f(i + step)))
						funcAscendingPoints.push([i, f(i)]);
				}
				if (f(i) < f(i - step) && f(i) > f(i + step))
					if ((f(i) < f(i - step) && f(i) > f(i + step))) {
						funcDescendingPoints.push([i, f(i)]);
					}
			}
		}
		genAssert(funcDescendingPoints.length > 2 && funcAscendingPoints.length > 2, 'Мало точек');

		funcAscendingPoints = funcAscendingPoints.iz(2);
		funcDescendingPoints = funcDescendingPoints.iz(2);

		let points = [funcAscendingPoints.T()[0].concat(funcDescendingPoints.T()[0]), funcAscendingPoints.T()[1].concat(
			funcDescendingPoints.T()[1])].T();

		let derivativeAsc = funcAscendingPoints.T()[0].map((x) => [x, (f(x) - f(x - 0.01)) * 100]);
		let derivativeDesc = funcDescendingPoints.T()[0].map((x) => [x, (f(x) - f(x - 0.01)) * 100]);

		let condition = [
			[(derivativeAsc[0][1].abs() - derivativeAsc[1][1].abs()).abs(), (derivativeDesc[0][1].abs() - derivativeDesc[1][
				1
			].abs()).abs()],
			['наибольшая', [derivativeAsc[1][0], derivativeAsc[0][0]].maxE()],
			['наименьшее', [derivativeDesc[1][0], derivativeDesc[0][0]].maxE()]
		];
		genAssert(condition[0].maxE() < 1.5, 'Разница слишком маленькая');
		condition = condition[condition[0].max() + 1];

		let pointsView = points.T()[0].map((num) => num.ts(1));

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
					ct.fillText(pointsView[i].replace('{,}', ','), points[i][0] * 20, -3);
				} else {
					ct.fillText(pointsView[i].replace('{,}', ','), points[i][0] * 20, 15);
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
	},10000);
})();
//SugarHedgehog
//317544 318045 318055 318139 318047 318049 318051 318053 318057 318059 
//318061 318063 318065 318067 318069 318071 318073 318075 318077 318079 
//318081 318083 318085 318087 318089 318091 318093 318095 318097 318099 
//318121 318123 318125 318127 318129 318131 318133 318135 318137 318141 318143
