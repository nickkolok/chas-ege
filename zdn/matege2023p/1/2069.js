(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 44);
		let condition = [
			['больший', 45 + angle],
			['меньший', 45 - angle]
		].iz();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 300, 390, 300);
			ctx.drawLine(10, 300, 150, 100);
			ctx.drawLine(150, 100, 390, 300);
			ctx.drawLine(150, 100, 390 / 2, 300);
			ctx.drawLine(150, 100, 390 / 2.2, 300);

			ctx.drawLine(390 / 4, 300 - 10, 390 / 4, 300 + 10);
			ctx.drawLine(3 * 390 / 4, 300 - 10, 3 * 390 / 4, 300 + 10);

			ctx.beginPath();
			ctx.arc(150, 100, 50, 0.45 * Math.PI, 0.69 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(150, 100, 40, 0.22 * Math.PI, 0.45 * Math.PI);

			ctx.stroke();

		};

		NAtask.setTask({
			text: 'Угол между биссектрисой и медианой прямоугольного треугольника, ' +
				'проведёнными из вершины прямого угла, равен $' + angle + '^{\\circ}$. ' +
				'Найдите ' + condition[0] + ' угол прямоугольного треугольника. Ответ дайте в градусах.',
			answers: condition[1],
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//2069
