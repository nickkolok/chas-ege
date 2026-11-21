(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = sl(0.01, 0.99, 0.01);

		let vertices = window.latbukv.iz(4);

		genAssertZ1000(a / (1 - b.pow(2)).sqrt(), 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 190, 50);
			ctx.drawLine(190, 50, 390, 370);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawLine(190, 50, 190, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.drawLine(190, 370 - 20, 190 + 20, 370 - 20);
			ctx.drawLine(190 + 20, 370, 190 + 20, 370 - 20);

			//штрихи

			ctx.strokeInMiddleOfSegment(10, 370, 190, 50, 10);
			ctx.strokeInMiddleOfSegment(190, 50, 390, 370, 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10 - 5, 370 + 25);
			ctx.fillText(vertices[1], 190-5, 40);
			ctx.fillText(vertices[2], 390 - 10, 370 + 25);
			ctx.fillText(vertices[3], 190, 370 + 25);

		};

		NAtask.setTask({
			text: 'В треугольнике  $' + vertices.slice(0, 3).shuffleJoin() + '$ $' +
				vertices.slice(0, 2).shuffleJoin() +
				'=' + vertices.slice(1, 3).shuffleJoin() + '$, высота $' + [vertices[1], vertices[3]].shuffleJoin() +
				'$ равна $' + a + '$, $\\cos{' + [vertices[0], vertices[2]].iz() + '} = ' + b.ts(1) +
				' $. Найдите $' + [vertices.slice(0, 2),
					vertices.slice(1, 3)
				].iz().shuffleJoin() + '$.',
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
