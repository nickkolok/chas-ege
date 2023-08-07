(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let b = sl(91, 179);
		let a = sl(2, b / 2-1);


		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 5);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(130, 200, 120, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.drawLine(130 - 67 - 27, 200 - 100, 380, 200 - 100);
			ctx.drawLine(130, 200 + 120, 380, 200 - 100);
			ctx.drawLine(130, 200 + 120, 130 + 67, 200 - 100);
			//вписанный

			ctx.drawFilledCircle(130, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 130, 200 + 120 + 20);
			ctx.fillText(vertices[1], 380 - 10, 200 - 100 - 10);
			ctx.fillText(vertices[2], 130 - 67 - 10, 200 - 100 - 10);
			ctx.fillText(vertices[3], 130 + 67, 200 - 100 - 10);
			ctx.fillText(vertices[4], 130 + 120, 200 + 40);

		};

		NAtask.setTask({
			text: 'Угол $' + vertices.slice(0, 3).join('') + '$ равен $' + a + '^\\circ$. ' +
				'Градусная мера дуги $' + [vertices[0], vertices[2]].shuffle().join('') + '$ ' +
				'окружности, не содержащей точек $' + vertices.slice(3, 6).join('$ и $') + '$, равна ' +
				'$' + b + '^\\circ$. Найдите угол $' + vertices[3] + vertices[0] + vertices[4] + '$. Ответ дайте в градусах.',
			answers: 0.5 * b - a,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//149
