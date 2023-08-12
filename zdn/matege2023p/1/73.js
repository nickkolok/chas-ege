(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = sl(2, a - 1);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 3);
		if (sl1()) {

		}


		genAssertZ1000(0.5 * b / a, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 180, 50);
			ctx.drawLine(180, 50, 390, 370);

			//штрихи
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.lineWidth = 1.2;
			ctx.drawLine(275, 210, 300, 200);
			ctx.drawLine(80, 200, 105, 210);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10 - 5, 370 + 25);
			ctx.fillText(vertices[1], 180, 40);
			ctx.fillText(vertices[2], 390 - 10, 370 + 25);

		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.shuffle().join('') + '$ $' + vertices.slice(0, 2).shuffle().join('') +
				'=' + vertices.slice(1, 3).shuffle().join('') + '=' + a + '$, $' + [vertices[0], vertices[2]].shuffle().join('') + 
				'=' + b + '$. Найдите $\\cos{' + [vertices[0], vertices[2]].iz() + '}$.',
			answers: 0.5 * b / a,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 73
