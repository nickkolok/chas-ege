(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 88);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 300, 390, 300);
			ctx.drawLine(10, 300, 150, 100);
			ctx.drawLine(150, 100, 390, 300);
			ctx.drawLine(150, 100, 390 / 2, 300);
			ctx.drawLine(150, 100, 150, 300);

			//прямой угол
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.lineWidth = 1;
			ctx.drawLine(150 - 20, 300, 150 - 20, 300 - 20);
			ctx.drawLine(150, 300 - 20, 150 - 20, 300 - 20);

			//штрихи
			ctx.drawLine(390 / 4, 300 - 10, 390 / 4, 300 + 10);
			ctx.drawLine(3 * 390 / 4, 300 - 10, 3 * 390 / 4, 300 + 10);
			ctx.stroke();

		};

		NAtask.setTask({
			text: 'Острые углы прямоугольного треугольника ' +
				'равны $' + angle + '^{\\circ}$ и $' + (90 - angle) + '^{\\circ}$. Найдите угол между высотой и ' +
				'медианой, проведёнными из вершины прямого ' +
				'угла. Ответ дайте в градусах.',
			answers: (2 * angle - 90).abs(),
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//6080
