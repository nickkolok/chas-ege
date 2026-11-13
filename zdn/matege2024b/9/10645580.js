(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let innerRadius = sl(1, 3);
	let outerRadius = sl(innerRadius + 1, 6);
	let areaPerSquaredRadius = sl(1, 12);
	let innerArea = areaPerSquaredRadius * innerRadius * innerRadius;
	let ringArea = areaPerSquaredRadius * (outerRadius * outerRadius - innerRadius * innerRadius);
	let cell = 26;
	let size = 2 * (outerRadius + 1) * cell;

	NAtask.setTask({
		text: `На клетчатой бумаге нарисованы два круга с общим центром. Площадь внутреннего круга равна ${innerArea}. Найдите площадь заштрихованной фигуры.`,
		answers: ringArea,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: size,
		height: size,
		paint: function (ctx) {
			ctx.translate(size / 2, size / 2);
			ctx.fillStyle = '#b0b0b0';
			ctx.beginPath();
			ctx.arc(0, 0, outerRadius * cell, 0, 2 * Math.PI);
			ctx.moveTo(innerRadius * cell, 0);
			ctx.arc(0, 0, innerRadius * cell, 0, 2 * Math.PI);
			ctx.fill('evenodd');
			ctx.lineWidth = 0.5;
			ctx.regularGrid(cell, outerRadius + 1);
			ctx.lineWidth = 1.5;
			ctx.drawCircle(outerRadius * cell);
			ctx.drawCircle(innerRadius * cell);
		},
	});
})();
// A2704C, 58E8BF, 6FAACF, AEA7F1, 9CBE1B, D8839E, 29CB07, 6B95B4, C2C0AA, 97587C, ED8F76, 20DF36, 3AC111, 06ED9B, 591F9A, A2E250, 71B8CB, 03A3E7, 09F767, 62F438
