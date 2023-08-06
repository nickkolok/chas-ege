(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = slKrome(a, 1, a - 1);
		genAssertZ1000(b / a, 'Кривой ответ');

		let rand = sl1();

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let angle = sl1() ? vertices.slice(0, 3).permuteCyclic(1) : vertices.slice(0, 3).permuteCyclic(2);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 180, 50);
			ctx.drawLine(180, 50, 390, 370);

			//высота
			ctx.drawLine(280, 200, 10, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.drawLine(280 - 33, 200 - 5, 280 - 20, 200 + 14);
			ctx.drawLine(280 - 33, 200 - 5, 280 - 13, 200 - 18);

			//штрихи
			ctx.drawLine(275 + 5, 210 + 10, 300, 210);
			ctx.drawLine(80, 210, 105 - 5, 210 + 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10 - 5, 370 + 25);
			ctx.fillText(vertices[1], 180, 50 - 10);
			ctx.fillText(vertices[2], 390 - 10, 370 + 25);
			ctx.fillText(vertices[3], 280 + 10, 200);

		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).shuffle().join('') + '$ $' +
				vertices.slice(0, 2).shuffle().join('') +
				'=' + vertices.slice(1, 3).shuffle().join('') + '$, $' + 
				[vertices[0], vertices[2]].shuffle().join('') +
				'=' + a + '$, ' + ('высота ').esli(rand) + '$' + 
				[vertices[0], vertices[3]].shuffle().join('') + '$' + [
				' – высота, ', ' равна $' + b + '$'][rand] +
				('$' + vertices.slice(2, 4).shuffle().join('') +
				'=' + b + '$').esli(!rand) + '. Найдите ' + ['косинус', 'синус'][rand] +
				' угла $' + angle.join('') + '$.',
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
// 109 111
