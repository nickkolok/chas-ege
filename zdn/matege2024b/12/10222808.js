(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let arcAK = sl(20, 74, 2);
	let arcBM = sl(20, 74, 2);
	let gap = (360 - arcAK - arcBM) / 2 + sl(-24, 24);
	let start = sl(0, 359);
	let angles = [start, start + arcAK, start + arcAK + gap, start + arcAK + gap + arcBM];
	let answer = (arcAK + arcBM) / 2;
	NAtask.setTask({
		text: 'В окружности проведены пересекающиеся хорды $AB$ и $KM$. Меньшая дуга $AK$ равна $' +
			arcAK + '^\\circ$, меньшая дуга $BM$ равна $' + arcBM +
			'^\\circ$. Найдите меньший из углов между хордами $AB$ и $KM$. Ответ дайте в градусах.',
		answers: answer,
		analys: 'Угол между пересекающимися хордами равен полусумме градусных мер дуг, ' +
			'заключённых между его сторонами и сторонами вертикального угла. Для дуг $AK$ и $BM$ это $(' +
			arcAK + '+' + arcBM + '):2=' + answer + '^\\circ$. Этот угол острый, поэтому он является меньшим.',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 360,
		height: 360,
		paint: function (ctx) {
			let circle = new Circle(new Point(0, 0), 132);
			ctx.translateToCenter();
			let radians = angles.map(angle => angle * Math.PI / 180);
			let points = angles.map(angle => circle.pointOnCircle(angle, {angleInDegrees: true}));
			ctx.strokeStyle = '#333';
			ctx.lineWidth = 2;
			circle.drawOnto(ctx);
			ctx.drawLine(points[0].x, points[0].y, points[2].x, points[2].y);
			ctx.drawLine(points[1].x, points[1].y, points[3].x, points[3].y);
			ctx.lineWidth = 4;
			ctx.drawArc(circle.pc.x, circle.pc.y, circle.r, radians[0], radians[1]);
			ctx.drawArc(circle.pc.x, circle.pc.y, circle.r, radians[2], radians[3]);
			ctx.font = '17px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			points.forEach((point, i) => {
				let label = labelPositionAwayFrom(point, circle.pc, 16);
				ctx.fillText(['A', 'K', 'B', 'M'][i], label.x, label.y);
			});
		},
	});
})();
// 9BFCD8, 70985D

