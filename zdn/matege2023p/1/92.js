(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 5);

		let trapezh = [vertices[0], vertices[1], vertices[4], vertices[3]];

		if (sl1())
			trapezh = trapezh.reverse();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";
			ctx.drawLine(100, 80, 350, 80);
			ctx.drawLine(10, 320, 270, 320);
			ctx.drawLine(100, 80, 10, 320);
			ctx.drawLine(270, 320, 350, 80);

			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.drawLine(10, 320, 310, 200);

			ctx.lineWidth = 1.2;
			ctx.drawLine(300 + 15, 150, 320 + 10, 160);
			ctx.drawLine(270 + 15, 250, 290 + 10, 260);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 100, 80 - 10);
			ctx.fillText(vertices[1], 350, 80 - 10);
			ctx.fillText(vertices[2], 270, 320 + 20);
			ctx.fillText(vertices[3], 10, 320 + 20);
			ctx.fillText(vertices[4], 310 + 10, 200 + 10);

		};

		NAtask.setTask({
			text: 'Площадь параллелограмма $' + vertices.slice(0, 4).permuteCyclic(sl(1, 3)).join('') + '$ равна $' + a + '$. ' +
				'Точка $' + vertices[4] + '$ – середина стороны $' + vertices.slice(1, 3).shuffle().join('') +
				'$. Найдите площадь ' +
				'трапеции $' + trapezh.permuteCyclic(sl(0, 3)).join('') + '$.',
			answers: a * 0.75,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//92
