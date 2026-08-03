(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 88);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			let arc = Math.PI/2.9;
			
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 250, 390-8, 250);
			let ver = ctx.drawLineAtAngle(10, 250, -arc, 200-25);
			ctx.drawLineAtAngle(ver.x, ver.y, -arc+Math.PI/2, 350-20);
			//штрихи
			ctx.strokeInMiddleOfSegment(10, 250, (390-8)/2, 250, 10);
			ctx.strokeInMiddleOfSegment(10, 250, 3*(390-8)/2, 250, 10);
			
			//медиана
			ctx.strokeStyle = om.primaryBrandColors [0];
			ctx.drawLine(ver.x, ver.y,(390-8)/2, 250);
			
			//высота
			ctx.strokeStyle = om.primaryBrandColors [1];
			ctx.drawLine(ver.x, ver.y,ver.x, 250);

			//прямой угол
			ctx.lineWidth = 1.2;
			ctx.drawLine(ver.x - 20, 250, ver.x - 20, 250 - 20);
			ctx.drawLine(ver.x, 250 - 20, ver.x - 20, 250 - 20);

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
