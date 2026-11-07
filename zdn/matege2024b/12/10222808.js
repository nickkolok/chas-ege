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
			let radius = 132;
			ctx.translate(180, 180);
			let radians = angles.map(angle => angle * Math.PI / 180);
			let points = radians.map(angle => [radius * Math.cos(angle), radius * Math.sin(angle)]);
			ctx.strokeStyle = '#333';
			ctx.lineWidth = 2;
			ctx.drawCircle(radius);
			ctx.drawLine(...points[0], ...points[2]);
			ctx.drawLine(...points[1], ...points[3]);
			ctx.lineWidth = 4;
			ctx.drawArc(0, 0, radius, radians[0], radians[1]);
			ctx.drawArc(0, 0, radius, radians[2], radians[3]);
			ctx.font = '17px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			radians.forEach((angle, i) => {
				ctx.fillText(['A', 'K', 'B', 'M'][i], (radius + 16) * Math.cos(angle), (radius + 16) * Math.sin(angle));
			});
		},
	});
})();
// 9BFCD8, 70985D
