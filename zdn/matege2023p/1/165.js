(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(2, 100);
		let b = slKrome(a, 2, 100);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(180, 200, 150, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.drawLine(20, 50, 35, 350);
			ctx.drawLine(35, 350, 290, 350);
			ctx.drawLine(290, 350, 380, 50);
			ctx.drawLine(20, 50, 380, 50);

			ctx.drawFilledCircle(180, 200, 2);

		};

		NAtask.setTask({
			text: 'Боковые стороны трапеции, описанной около окружности, ' +
				'равны $' + a + '$ и $' + b + '$. Найдите среднюю линию трапеции.',
			answers: (a + b) * 0.5,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//165
