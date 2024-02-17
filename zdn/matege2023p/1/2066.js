(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let vertices = om.latbukv.iz(4);

		let angle = sl(2, 89);
		let question = sl1() ? [vertices[0], [vertices[3], vertices[2], vertices[1]].join('')] : 
		[vertices[1],[vertices[0], vertices[2], vertices[3]].join('')];

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			let angle = Math.PI / 2.9;

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 250, 390 - 8, 250);
			let ver = ctx.drawLineAtAngle(10, 250, -angle, 200 - 25);
			ctx.drawLineAtAngle(ver.x, ver.y, -angle + Math.PI / 2, 350 - 20);
			//медиана
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawLine(ver.x, ver.y, (390 - 8) / 2, 250);

			ctx.strokeInMiddleOfSegment(0, 250, (390 - 8) / 2, 250, 10);
			ctx.strokeInMiddleOfSegment(390 - 8, 250, (390 - 8) / 2, 250, 10);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 10, 250 + 20);
			ctx.fillText(vertices[1], 390 - 15, 250 + 20);
			ctx.fillText(vertices[2], ver.x - 5, ver.y - 5);
			ctx.fillText(vertices[3], (390 - 8) / 2, 250 + 20);
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
