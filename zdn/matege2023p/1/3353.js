(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = slKrome(90, 1, 179);

		let vertices = om.latbukv.iz(4);
	
		let numbers = [
			[0, 1, 3],
			[3, 1, 2],
			[0, 3, 1],
			[1, 3, 2]
		].iz();
		//не придумала ничего умнее, чем просто перечислить спрашиваемые вершины
		let letters = numbers.map((elem) => vertices[elem]);
		letters = letters.randomReverse();
		
		let subangle = [vertices[1],[vertices[0], vertices[2]].iz(), vertices[3]];
		vertices=(angle<90)?vertices.slice().permuteCyclic(1):vertices.slice();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(100, 80, 350, 80);
			ctx.drawLine(10, 320, 270, 320);
			ctx.drawLine(100, 80, 10, 320);
			ctx.drawLine(270, 320, 350, 80);

			(angle<90)?ctx.drawLine(100, 80, 270, 320):ctx.drawLine(10, 320, 350, 80);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 100, 80 - 10);
			ctx.fillText(vertices[1], 350, 80 - 10);
			ctx.fillText(vertices[2], 270, 320 + 20);
			ctx.fillText(vertices[3], 10, 320 + 20);

		};

		NAtask.setTask({
			text: 'В ромбе $' + vertices.slice().randomReverse().permuteCyclic(sl(0, 3)).join('') + '$ угол $' + subangle.slice().randomReverse().join('') +
				'$ равен $' + angle + '^\\circ$. Найдите ' +
				'угол $' + letters.join('') + '$. Ответ дайте в градусах',
			answers: 0.5 * (180 - angle),
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//3353
