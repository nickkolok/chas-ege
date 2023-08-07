(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let b = sl(2, 100);
		let a = sl(2, b - 2);

		genAssertZ1000(a * 180 / b, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(200, 200, 180, 0, 2 * Math.PI);
			ctx.stroke();

			//вписанный
			let deltaX = (a / b < 0.25 ? 120 : 180);
			let deltaY = (a / b < 0.25 ? 135 : 10);

			ctx.drawLine(200 + deltaX, 200 + deltaY, 200, 200 - 180);
			ctx.drawLine(200 - deltaX, 200 + deltaY, 200, 200 - 180);

		};

		NAtask.setTask({
			text: 'Найдите вписанный угол, опирающийся на дугу, равную $' + (a).texrndfrac(b) + '$ окружности. ' +
				'Ответ дайте в градусах.',
			answers: a * 180 / b,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//127
