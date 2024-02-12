(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(2, 89);
		let b = slKrome(a, 2, 89);

		let vertices = om.latbukv.iz(4);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawArc(200, 200, 180, 0, 2 * Math.PI);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawLine(50, 98, 100, 350);
			ctx.drawLine(100, 350, 310, 342);
			ctx.drawLine(310, 342, 370, 140);
			ctx.drawLine(50, 98, 370, 140);

			ctx.drawLine(50, 98, 310, 342);
			ctx.drawLine(100, 350, 370, 140);

			ctx.drawFilledCircle(200, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 40, 98 - 10);
			ctx.fillText(vertices[1], 100 - 5, 350 + 25);
			ctx.fillText(vertices[2], 310, 350 + 10);
			ctx.fillText(vertices[3], 370, 140);

		};

		NAtask.setTask({
			text: 'Четырёхугольник $' + vertices.slice().permuteCyclic(sl(1, 3)).join('') + '$ вписан в окружность. ' +
				'Угол $' + vertices[1] + vertices[0] + vertices[2] + '$ равен $' + a + '^\\circ$, угол $' + vertices.slice(1,
					4).permuteCyclic(1).join('') + '$ равен $' + b + '^\\circ$. ' +
				'Найдите угол $' + vertices[1] + vertices[0] + vertices[3] + '$. Ответ дайте в градусах.',
			answers: a + b,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 5000);
})();
//169
