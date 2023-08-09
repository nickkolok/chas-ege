(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = slKrome(a, 1, a - 1);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let angle = sl1() ? vertices.slice(0, 3).permuteCyclic(1) : vertices.slice(0, 3).permuteCyclic(2);

		genAssertZ1000(b / a, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 180, 200);
			ctx.drawLine(180, 200, 390, 370);

			//высота
			ctx.lineWidth = 1;
			ctx.drawLine(180 - 40, 200 - 33, 390, 370);
			ctx.drawLine(180 - 40, 200 - 33, 10, 370);

			//прямой угол

			ctx.drawLine(180 - 52, 200 - 13, 180 - 35, 200 - 1);
			ctx.drawLine(180 - 35, 200 - 1, 180 - 23, 200 - 17);

			//штрихи

			ctx.drawLine(275 + 10, 210 + 90, 300, 200 + 90);
			ctx.drawLine(80, 200 + 90, 105 - 10, 210 + 90);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10 - 5, 370 + 25);
			ctx.fillText(vertices[1], 180, 200 - 10);
			ctx.fillText(vertices[2], 390 - 10, 370 + 25);
			ctx.fillText(vertices[3], 180 - 40, 200 - 40);

		};

		NAtask.setTask({
			text: 'В треугольнике  $' + vertices.slice(0, 3).shuffle().join('') + '$ $' +
				vertices.slice(0, 2).shuffle().join('') +
				'=' + vertices.slice(1, 3).shuffle().join('') + '$, $' + vertices[0] + vertices[2] + '=' + a + '$, высота $' + 
				[vertices[0], vertices[3]].shuffle().join('') +
				'$ равна $' + b + '$. Найдите $\\sin \\angle ' + angle.join('') + '$.',
			answers: b / a,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 105
