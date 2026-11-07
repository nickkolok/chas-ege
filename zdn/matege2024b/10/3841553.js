(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let [a, b, hypotenuse] = om.pifagtr.filter(triple => triple[2] <= 13).iz();
	let multiplier = sl(1, 2);
	let [halfWidth, height] = [a * multiplier, b * multiplier].shuffle();
	let slope = hypotenuse * multiplier;
	let width = 2 * halfWidth;
	let length = sl(6, 15);
	let area = 2 * slope * length;

	NAtask.setTask({
		text: 'Двускатную крышу дома нужно покрыть рубероидом. Длина дома вдоль конька равна ' +
			length + ' м, ширина дома поперёк конька — ' + width + ' м, высота крыши — ' + height +
			' м. Оба ската одинаковые. Сколько квадратных метров рубероида нужно для покрытия крыши?',
		answers: area,
		analys: 'Половина ширины дома и высота крыши — катеты прямоугольного треугольника. ' +
			'По теореме Пифагора длина ската равна $\\sqrt{' + halfWidth + '^2+' + height + '^2}=' +
			slope + '$ м. Площадь двух скатов равна $2\\cdot' + slope + '\\cdot' + length + '=' + area + '$ м$^2$.',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 250,
		paint: function (ctx) {
			let scale = Math.min(270 / (width + length / 2), 115 / height);
			let left = 25;
			let right = left + width * scale;
			let middle = (left + right) / 2;
			let eave = 165;
			let ridge = eave - height * scale;
			let depthX = length * scale / 2;
			let depthY = depthX / 3;
			ctx.lineWidth = 2;
			ctx.drawLine(left, eave, middle, ridge);
			ctx.drawLine(middle, ridge, right, eave);
			ctx.drawLine(left, eave, right, eave);
			ctx.drawLine(middle, ridge, middle + depthX, ridge - depthY);
			ctx.drawLine(middle + depthX, ridge - depthY, right + depthX, eave - depthY);
			ctx.drawLine(right, eave, right + depthX, eave - depthY);
			ctx.drawLine(left, eave, left, 220);
			ctx.drawLine(right, eave, right, 220);
			ctx.drawLine(left, 220, right, 220);
			ctx.drawLine(right, 220, right + depthX, 220 - depthY);
			ctx.drawLine(right + depthX, eave - depthY, right + depthX, 220 - depthY);
			ctx.setLineDash([4, 3]);
			ctx.drawLine(middle, ridge, middle, eave);
			ctx.setLineDash([]);
			ctx.font = '15px liberation_sans';
			ctx.textAlign = 'center';
			ctx.fillText(width + ' м', middle, 188);
			ctx.fillText(length + ' м', right + depthX / 2 + 8, 209 - depthY / 2);
			ctx.textAlign = 'left';
			ctx.fillText(height + ' м', middle + 6, (ridge + eave) / 2 + 4);
		},
	});
})();
// 3A9E11, 1368A6, 38A9E9, 4D7F3B
