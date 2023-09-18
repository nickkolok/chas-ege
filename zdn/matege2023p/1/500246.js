(function() {
	retryWhileError(function() {
		'use strict';
		let angle = sl(10, 89);
		let letter = window.latbukv.iz(4);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawArc(200, 200, 180, 0, 2 * Math.PI);
			ctx.fillKrug(200, 200, 2);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.drawLineAtAngle(210, 20, Math.PI / 3, 300);
			ctx.drawLineAtAngle(210, 20, 4 * Math.PI / 6, 320);
			ctx.drawLine(210 + (Math.PI / 3).cos() * 300, 20 + (Math.PI / 3).sin() * 300, 210 + (4 * Math.PI / 6).cos() *
				320, 20 + (4 * Math.PI / 6).sin() * 320);

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(200, 200, 210 + (4 * Math.PI / 6).cos() * 320, 20 + (4 * Math.PI / 6).sin() * 320);
			ctx.drawLine(200, 200, 210 + (Math.PI / 3).cos() * 300, 20 + (Math.PI / 3).sin() * 300);


			ctx.font = "23px liberation_sans";
			ctx.fillText(letter[0], 210, 20 - 5);
			ctx.fillText(letter[1], 210 + (Math.PI / 3).cos() * 300 + 10, 20 + (Math.PI / 3).sin() * 300);
			ctx.fillText(letter[2], 210 + (4 * Math.PI / 6).cos() * 320 - 30, 20 + (4 * Math.PI / 6).sin() * 320);

			ctx.fillText(letter[3], 200 + 5, 200);
		};

		NAtask.setTask({
			text: 'Треугольник $' + letter.slice(0, 3).shuffleJoin() + '$ вписан в окружность с центром $' + letter[3] +
				'$. Угол $' + letter[1] + letter[0] + letter[2] + '$ равен $' + angle + '^\\circ$.' +
				'Найдите угол $' + letter[1] + letter[3] + letter[2] + '$. Ответ дайте в градусах.',
			answers: angle * 2,
			analys: ''
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//500246
