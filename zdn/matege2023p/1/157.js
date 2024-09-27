(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let a = sl(2, 50);
		let b = sl(2, 50);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.beginPath();
			ctx.arc(180, 200, 150, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.drawLine(10, 30, 45, 350);
			ctx.drawLine(45, 350, 290, 350);
			ctx.drawLine(290, 350, 380, 68);
			ctx.drawLine(10, 30, 380, 68);

			ctx.drawFilledCircle(180, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10, 30 - 10);
			ctx.fillText(vertices[1], 45, 350 + 20);
			ctx.fillText(vertices[2], 290, 350 + 20);
			ctx.fillText(vertices[3], 380, 68 - 10);

		};

		NAtask.setTask({
			text: 'В четырёхугольник $' + vertices.slice().permuteCyclic(sl(1, 3)).join('') + '$ вписана окружность, ' +
				'$' + vertices.slice(0, 2).shuffle().join('') + '=' + a + '$, $' + vertices.slice(2, 4).shuffle().join('') +
				'=' + b + '$. ' +
				'Найдите периметр четырёхугольника.',
			answers: 2 * (a + b),
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//157
