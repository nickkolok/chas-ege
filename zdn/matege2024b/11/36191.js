(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 10);
		let b = sl(1, 10);
		let c = 6 * sl(1, 5);
		let V = a * b * (c / 6);

		let paint1 = function (ct) {
			ct.translate(150, 200);
			ct.scale(15, 15);
			ct.lineWidth = 2 / 15;
			
			let x1 = 3, y1 = 0;
			let x2 = 0, y2 = -3;
			let x3 = -2, y3 = 1.5;
			
			ct.beginPath();
			ct.moveTo(0, 0);
			ct.lineTo(x1, y1);
			ct.moveTo(0, 0);
			ct.lineTo(x2, y2);
			ct.moveTo(0, 0);
			ct.lineTo(x3, y3);
			
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.moveTo(x2, y2);
			ct.lineTo(x3, y3);
			ct.moveTo(x3, y3);
			ct.lineTo(x1, y1);
			
			ct.strokeStyle = om.secondaryBrandColors;
			ct.stroke();
			
			// Знак прямого угла
			ct.beginPath();
			ct.moveTo(0.4, 0);
			ct.lineTo(0.4, 0.4);
			ct.lineTo(0, 0.4);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'В треугольной пирамиде три ребра взаимно перпендикулярны, а их длины равны $' + a + '$, $' + b + '$ и $' + c + '$. Найдите объём этой пирамиды.',
			answers: V,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://global-ee.ru/bank/math11b/task/00036191
