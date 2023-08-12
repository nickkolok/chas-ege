(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = sl(0.01, 0.99, 0.01);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		genAssertZ1000(a / (1 - b.pow(2)).sqrt(), 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 180, 50);
			ctx.drawLine(180, 50, 390, 370);

			ctx.drawLine(180, 50, 180, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.drawLine(180, 370 - 20, 180 + 20, 370 - 20);
			ctx.drawLine(180 + 20, 370, 180 + 20, 370 - 20);

			//штрихи

			ctx.drawLine(275, 210, 300, 200);
			ctx.drawLine(80, 200, 105, 210);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10 - 5, 370 + 25);
			ctx.fillText(vertices[1], 180, 40);
			ctx.fillText(vertices[2], 390 - 10, 370 + 25);
			ctx.fillText(vertices[3], 180, 370 + 25);

		};

		NAtask.setTask({
			text: 'В треугольнике  $' + vertices.slice(0, 3).shuffle().join('') + '$ $' +
				vertices.slice(0, 2).shuffle().join('') +
				'=' + vertices.slice(1, 3).shuffle().join('') + '$, высота $' + [vertices[1], vertices[3]].shuffle().join('') +
				'$ равна $' + a + '$, $\\cos{' + [vertices[0], vertices[2]].iz() + '} = ' + b.ts() +
				' $. Найдите $' + [vertices.slice(0, 2),
					vertices.slice(1, 3)
				].iz().shuffle().join('') + '$.',
			answers: a / (1 - b.pow(2)).sqrt(),
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 99
