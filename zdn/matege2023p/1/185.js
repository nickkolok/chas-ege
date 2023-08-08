(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(1, 30).pow(2);

		let question = [
			[a * 3, 120, 12],
			[a * 2, 135, 8],
			[a, 150, 0.25]
		].iz();

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 3);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(200, 200, 180, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.drawLine(200 - 160, 200 - 86, 200 + 170, 200 - 60);
			ctx.drawLine(200 - 160, 200 - 86, 200 - 15, 200 - 180);
			ctx.drawLine(200 - 15, 200 - 180, 200 + 170, 200 - 60);

			ctx.drawFilledCircle(200, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 200 - 160 - 20, 200 - 86);
			ctx.fillText(vertices[1], 200 + 170, 200 - 60);
			ctx.fillText(vertices[2], 200 - 15 - 5, 200 - 180 - 3);

		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.shuffle().join('') + '$ сторона $' + vertices.slice(0, 2).shuffle().join('') +
				'$ равна $' + question[0].texsqrt(sl1()) + '$, ' +
				'угол $' + vertices[2] + '$ равен $' + question[1] + '^\\circ$. Найдите радиус описанной ' +
				'около этого треугольника окружности.',
			answers: a.sqrt(),
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//185
