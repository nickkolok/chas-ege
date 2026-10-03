(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 6);
		let m = sl(1, 15);
		let k = 4 * m;
		let V = a * a * m;

		let paintPyramid = function (ct) {
			ct.translate(200, 100);
			ct.scale(40, 40);
			ct.lineWidth = 1.5 / 40;
			
			// Coordinates for triangular pyramid
			// Front-left vertex of base
			let x1 = -1.5, y1 = 3;
			// Front-right vertex of base
			let x2 = 1.5, y2 = 3;
			// Back vertex of base (hidden)
			let x3 = 0, y3 = 1.5;
			// Top vertex
			let topX = 0, topY = 0;
			
			// Draw back edge of base (dashed - hidden)
			ct.save();
			ct.setLineDash([0.1, 0.1]);
			ct.strokeStyle = '#666';
			ct.lineWidth = 1.5 / 40;
			ct.beginPath();
			ct.moveTo(x1, y1);
			ct.lineTo(x3, y3);
			ct.stroke();
			ct.restore();
			
			ct.save();
			ct.setLineDash([0.1, 0.1]);
			ct.strokeStyle = '#666';
			ct.beginPath();
			ct.moveTo(x3, y3);
			ct.lineTo(x2, y2);
			ct.stroke();
			ct.restore();
			
			// Draw front edge of base (solid - visible)
			ct.strokeStyle = '#000';
			ct.lineWidth = 1.5 / 40;
			ct.beginPath();
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.stroke();
			
			// Draw lateral edges (solid - visible)
			ct.beginPath();
			ct.moveTo(x1, y1);
			ct.lineTo(topX, topY);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(x2, y2);
			ct.lineTo(topX, topY);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(x3, y3);
			ct.lineTo(topX, topY);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'Сторона основания правильной треугольной пирамиды равна $' + a + '$, а высота пирамиды равна $' + k + '\\sqrt{3}$. Найдите объём этой пирамиды.',
			answers: V,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paintPyramid,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=27087
