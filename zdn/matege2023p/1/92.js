(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);

		let vertices = om.latbukv.iz(5);

		let trapezoid = [vertices[0], vertices[1], vertices[4], vertices[3]].randomReverse();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawLine(100, 80, 350, 80);
			ctx.drawLine(10, 320, 270, 320);
			ctx.drawLine(100, 80, 10, 320);
			ctx.drawLine(270, 320, 350, 80);

			ctx.strokeStyle = om.primaryBrandColors[0];
			let middle = coordinatesMiddleOfSegment(270, 320, 350, 80);
			ctx.drawLine(10, 320, middle[0], middle[1]);

			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.strokeInMiddleOfSegment(350, 80, middle[0], middle[1], 10);
			ctx.strokeInMiddleOfSegment(270, 320, middle[0], middle[1], 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 100, 80 - 10);
			ctx.fillText(vertices[1], 350, 80 - 10);
			ctx.fillText(vertices[2], 270, 320 + 20);
			ctx.fillText(vertices[3], 10, 320 + 20);
			ctx.fillText(vertices[4], middle[0] + 5, middle[1] + 5);

		};

		NAtask.setTask({
			text: 'Площадь параллелограмма $' + vertices.slice(0, 4).permuteCyclic(sl(0, 3)).join('') + '$ равна $' + a +
				'$. Точка $' + vertices[4] + '$ – середина стороны $' + vertices.slice(1, 3).shuffleJoin() +
				'$. Найдите площадь трапеции $' + trapezoid.permuteCyclic(sl(0, 3)).join('') + '$.',
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
