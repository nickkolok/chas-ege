(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 44);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 6);

		let question = [
			['больший', 180 + angle],
			['меньший', 180 - angle]
		].iz();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.drawLine(50, 80, 350, 80);
			ctx.drawLine(10, 320, 310, 320);
			ctx.drawLine(50, 80, 10, 320);
			ctx.drawLine(310, 320, 350, 80);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 50, 80 - 10);
			ctx.fillText(vertices[1], 350, 80 - 10);
			ctx.fillText(vertices[2], 310, 320 + 20);
			ctx.fillText(vertices[3], 10, 320 + 20);

		};

		NAtask.setTask({
			text: 'Один угол параллелограмма больше другого на $' + angle + '^\\circ$. Найдите ' + question[0] +
				' угол. Ответ дайте в градусах.',
			answers: 0.5 * question[1],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//5941
