(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let a = sl(2, 89);
		let b = sl(90, 179);

		let vertices = om.latbukv.iz(3);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawArc(200, 200, 170, 0, 2 * Math.PI);

			//вписанный
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawLine(200 + 170, 200 + 10, 200 - 80, 200 - 150);
			ctx.drawLine(200 - 170, 200 + 10, 200 - 80, 200 - 150);

			ctx.drawFilledCircle(200, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 200 - 180 - 10, 200 + 10);
			ctx.fillText(vertices[1], 200 + 170, 200 + 10);
			ctx.fillText(vertices[2], 200 - 90, 200 - 160);

		};

		NAtask.setTask({
			text: 'На окружности отмечены точки $' + vertices[0] + '$, $' + vertices[1] + '$ и $' + vertices[2] + '$. ' +
				['Дуга окружности $' + [vertices[0], vertices[2]].shuffleJoin() + '$, не содержащая точку $' + vertices[1] +
				'$, составляет $' + a + '^\\circ$. ',
				'Дуга окружности $' + vertices.slice(1, 4).shuffleJoin()  + '$, не содержащая точку $' + vertices[0] +
				'$, составляет $' + b +
				'^\\circ$. '].shuffleJoin() +
				'Найдите вписанный угол $' + [vertices[0], vertices[2], vertices[1]].randomReverse().join('') + '$. Ответ дайте в градусах.',
			answers: (360 - a - b) / 2,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//131
