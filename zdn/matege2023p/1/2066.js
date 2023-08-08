(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let angle = sl(2, 89);
		let question = sl1() ? [vertices[0],
			[vertices[3], vertices[2], vertices[1]].join('')
		] : [vertices[1],
			[vertices[0], vertices[2], vertices[3]].join('')
		];

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 300, 390, 300);
			ctx.drawLine(10, 300, 150, 100);
			ctx.drawLine(150, 100, 390, 300);
			ctx.drawLine(150, 100, 390 / 2, 300);

			//штрихи
			ctx.drawLine(390 / 4, 300 - 10, 390 / 4, 300 + 10);
			ctx.drawLine(3 * 390 / 4, 300 - 10, 3 * 390 / 4, 300 + 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 5, 330);
			ctx.fillText(vertices[1], 390 - 15, 330);
			ctx.fillText(vertices[2], 150 - 10, 100 - 10);
			ctx.fillText(vertices[3], 390 / 2 - 10, 330);
		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).shuffle().join('') + '$ $' + vertices[2] + vertices[3] +
				'$ – медиана, угол $' +
				vertices[2] + '$ равен ' +
				'$90^{\\circ}$, угол $' + question[0] + '$ равен $' + angle + '^{\\circ}$. Найдите угол $' + question[1] +
				'$. Ответ' +
				' дайте в градусах.',
			answers: 90 - angle,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//2066
