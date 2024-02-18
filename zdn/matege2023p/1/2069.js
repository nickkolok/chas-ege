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
			
			let angle = Math.PI/2.9;
			
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 250, 390-8, 250);
			let ver = ctx.drawLineAtAngle(10, 250, -angle, 200-25);
			ctx.drawLineAtAngle(ver.x, ver.y, -angle+Math.PI/2, 350-20);
			//штрихи
			ctx.strokeInMiddleOfSegment(10, 250, (390-8)/2, 250, 10);
			ctx.strokeInMiddleOfSegment(10, 250, 3*(390-8)/2, 250, 10);
			//биссектриса
			ctx.strokeStyle = om.primaryBrandColors [0];
			let bis = ctx.drawLineAtAngle(ver.x, ver.y, (-angle+Math.PI/2)+Math.PI/4, 160+2);
			//медиана
			ctx.strokeStyle = om.primaryBrandColors [1];
			ctx.drawLine(ver.x, ver.y,(390-8)/2, 250);
			
			ctx.strokeStyle = om.primaryBrandColors [0];
			ctx.arcBetweenSegments([10, 250,ver.x, ver.y, bis.x, bis.y], 30);
			ctx.arcBetweenSegments([390-8, 250,ver.x, ver.y, bis.x, bis.y], 38);

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
