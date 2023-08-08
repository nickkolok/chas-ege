(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 44);
		let b = sl(91, 179) / 2;

		genAssert(180 - a - 2 * b > 0, 'Слишком большие углы')

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 150, 70);
			ctx.drawLine(150, 70, 390, 370);

			ctx.drawLine(10, 370, 270 - 2, 220 - 5);
			//ctx.drawLine(79 + 4, 220 - 10, 390, 370);

			ctx.beginPath();
			//ctx.arc(183, 270, 30, 0.10 * Math.PI, -1.13 * Math.PI);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(10, 370, 30, 0, -0.17 * Math.PI, true);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(10, 370, 25, -0.17 * Math.PI, -0.34 * Math.PI, true);
			ctx.stroke();

			ctx.beginPath();
			//ctx.arc(390, 370, 30, -Math.PI, -0.85 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			//ctx.arc(390, 370, 35, -Math.PI, -0.85 * Math.PI);
			ctx.stroke();

			ctx.beginPath();
			//ctx.arc(390, 370, 40, -0.85 * Math.PI, -0.72 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			//ctx.arc(390, 370, 45, -0.85 * Math.PI, -0.72 * Math.PI);
			ctx.stroke();


			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 150, 70 - 10);
			ctx.fillText(vertices[1], 10 - 5, 370 + 20);
			ctx.fillText(vertices[2], 390 - 20, 370 + 20);

			ctx.fillText(vertices[3], 270 + 10, 220 + 5);

		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).join('') + '$ $' + [vertices[1], vertices[3]].shuffle().join('') +
				'$ – биссектриса, ' +
				'угол $' + vertices[2] + '$ равен $' + a + '^\\circ$, угол $' + vertices.slice(1, 4).permuteCyclic(1).join('') +
				'$ равен $' + b + '^\\circ$.' +
				'Найдите угол $' + vertices[0] + '$. Ответ дайте в градусах.',
			answers: 180 - a - 2 * b,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27758 47055 47057 47059 47061 47063 47065 47067 47069 47071 47073 47075 47077 47079 47081 47083 47085 47087 47089 47091 47093 47095 47097 47099 47101 47103 563889
