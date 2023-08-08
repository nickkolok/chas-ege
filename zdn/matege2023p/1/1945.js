(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 3);

		let angle = sl(2, 150);
		let question = angle < 90 ? [vertices[0], vertices[2], 180 - 2 * angle] : [vertices[2], vertices[0], 0.5 * (180 -
			angle)];

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 300, 390, 300);
			ctx.drawLine(10, 300, 190, 100);
			ctx.drawLine(190, 100, 390, 300);

			//штрихи
			ctx.drawLine(105 - 15, 300 / 1.5, 105, 300 / 1.5 + 10);
			ctx.drawLine(400-100 , 300 / 1.5, 400-100-15, 300 / 1.5 + 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 5, 330);
			ctx.fillText(vertices[1], 390 - 15, 330);
			ctx.fillText(vertices[2], 190 - 10, 100 - 10);
		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.shuffle().join('') + '$ угол $' + question[0] + '$ равен $' + angle +
				'^{\\circ}$, стороны $' +
				vertices[2] + vertices[0] + '$ и $' +
				vertices[2] + vertices[1] + '$ равны. Найдите угол $' + question[1] + '$. Ответ дайте в градусах.',
			answers: question[2],
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//1945
