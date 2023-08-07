(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'

		let a = sl(2, 89);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(130, 200, 120, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.drawLine(130, 200, 130 + 50, 200 - 110);
			ctx.drawLine(380, 200, 130, 200 - 137);
			ctx.drawLine(130, 200, 130 + 50, 200 + 110);
			ctx.drawLine(380, 200, 130, 200 + 137);

			ctx.drawFilledCircle(130, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 130 + 50, 200 - 115);
			ctx.fillText(vertices[1], 380, 200 + 20);
			ctx.fillText(vertices[2], 130 + 50, 200 + 137);
			ctx.fillText(vertices[3], 130 - 20, 200);

		};

		NAtask.setTask({
			text: 'Через концы $' + [vertices[0], vertices[2]].shuffle().join('$ и $') + '$ дуги окружности с центром $' +
				vertices[3] + '$ ' +
				'проведены касательные $' + [vertices.slice(0, 2).join(''), vertices.slice(1, 3).join('')].shuffle().join(
					'$ и $') +
				'$. Меньшая дуга $' + [vertices[0], vertices[2]].shuffle().join('') + '$ равна $' + a + '^\\circ$. ' +
				'Найдите угол $' + vertices.slice(0, 3).join('') + '$. Ответ дайте в градусах.',
			answers: 180 - a,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//145
