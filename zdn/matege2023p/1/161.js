(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(20, 100);
		let b = sl(10, a / 2 - 1);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.beginPath();
			ctx.arc(180, 200, 150, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();

			ctx.drawLine(30, 50, 30, 350);
			ctx.drawLine(30, 350, 290, 350);
			ctx.drawLine(290, 350, 380, 50);
			ctx.drawLine(30, 50, 380, 50);

			ctx.drawFilledCircle(180, 200, 2);

		};

		NAtask.setTask({
			text: 'Периметр прямоугольной трапеции , описанной около окружности, ' +
				'равен $' + a + '$, её большая боковая сторона равна $' + b + '$. ' +
				'Найдите радиус окружности.',
			answers: 0.25 * a - b * 0.5,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//161
