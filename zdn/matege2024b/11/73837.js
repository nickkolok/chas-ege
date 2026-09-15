(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 12);
		let b = sl(2, 12);
		let h = sl(2, 12);
		let V = (a * b * h) / 3;
		genAssertZ1000(V, 'должно юыть не более 3-х знаков');
		
		let paint = function (ct) {
			ct.translate(200, 180);
			ct.scale(28, 28);
			ct.lineWidth = 1.5 / 28;
			ct.strokeStyle = '#000';

			let baseWidth = 2.5;
			let baseDepth = 1.8;
			let pyramidHeight = 2.5;

			let angle = 35;
			let angleRad = angle * Math.PI / 180;
			let cosA = Math.cos(angleRad);
			let sinA = Math.sin(angleRad);
			let depthFactor = 0.5;

			let A = {x: -baseWidth/2, y: 0};
			let B = {x: baseWidth/2, y: 0};
			let C = {x: baseWidth/2 + baseDepth*cosA, y: -baseDepth*sinA*depthFactor};
			let D = {x: -baseWidth/2 + baseDepth*cosA, y: -baseDepth*sinA*depthFactor};

			let centerX = (A.x + B.x + C.x + D.x) / 4;
			let centerY = (A.y + B.y + C.y + D.y) / 4;
			let S = {x: centerX, y: centerY - pyramidHeight};

			ct.setLineDash([0.2, 0.15]);
			
			ct.beginPath();
			ct.moveTo(D.x, D.y);
			ct.lineTo(C.x, C.y);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(A.x, A.y);
			ct.lineTo(D.x, D.y);
			ct.stroke();

			ct.beginPath();
			ct.moveTo(D.x, D.y);
			ct.lineTo(S.x, S.y);
			ct.stroke();

			ct.beginPath();
			ct.moveTo(centerX, centerY);
			ct.lineTo(S.x, S.y);
			ct.stroke();

			ct.setLineDash([]);
			
			ct.beginPath();
			ct.moveTo(A.x, A.y);
			ct.lineTo(B.x, B.y);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(B.x, B.y);
			ct.lineTo(C.x, C.y);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(A.x, A.y);
			ct.lineTo(S.x, S.y);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(B.x, B.y);
			ct.lineTo(S.x, S.y);
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(C.x, C.y);
			ct.lineTo(S.x, S.y);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'Основанием четырёхугольной пирамиды является прямоугольник со сторонами $' + a + '$ и $' + b + '$. Найдите высоту этой пирамиды, если её объём равен $' + V + '$.',
			answers: h,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=73837
