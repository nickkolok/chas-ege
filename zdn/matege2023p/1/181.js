(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(10, 150);
		let b = slKrome(a, 10, 150);
		
		genAssert(a+b!=180, 'Сумма углов равна 180');

		let question = [
			['меньший', [180 - a, 180 - b].minE()],
			['больший', [180 - a, 180 - b].maxE()]
		].iz();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawArc(200, 200, 180, 0, 2 * Math.PI);

			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawLine(200 - 160, 200 - 86, 200 - 120, 200 + 134);
			ctx.drawLine(200 - 120, 200 + 134, 200 + 82, 200 + 160);
			ctx.drawLine(200 + 82, 200 + 160, 200 + 170, 200 - 60);
			ctx.drawLine(200 - 160, 200 - 86, 200 + 170, 200 - 60);

			ctx.drawFilledCircle(200, 200, 2);

		};

		NAtask.setTask({
			text: 'Два угла вписанного в окружность четырёхугольника равны $' + a + '^\\circ$ и $' + b + '^\\circ$. ' +
				'Найдите ' + question[0] + ' из оставшихся углов. Ответ дайте в градусах.',
			answers: question[1],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//181
