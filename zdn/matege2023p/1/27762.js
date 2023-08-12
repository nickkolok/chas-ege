(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 89);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 6);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 150, 70);
			ctx.drawLine(150, 70, 390, 370);

			ctx.drawLine(10, 370, 270, 220);
			ctx.drawLine(79, 220, 390, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			
			ctx.drawLine(79 + 20, 220 + 10, 90 + 20, 200 + 10);
			ctx.drawLine(79 + 10, 220 - 19, 90 + 20, 200 + 10);

			ctx.drawLine(270 - 35, 220 - 7, 270 - 20, 220 + 13);
			ctx.drawLine(270 - 35, 220 - 7, 270 - 15, 220 - 20);

			ctx.beginPath();
			ctx.arc(183, 270, 30, 1.15 * Math.PI, -0.15 * Math.PI);
			ctx.stroke();

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 150, 70 - 10);
			ctx.fillText(vertices[1], 10 - 5, 370 + 20);
			ctx.fillText(vertices[2], 390 - 20, 370 + 20);

			ctx.fillText(vertices[3], 270 + 10, 220 + 5);
			ctx.fillText(vertices[4], 90 - 30, 200 + 20);

			ctx.fillText(vertices[5], 180, 270 + 25);


		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).shuffle().join('') + '$ угол $' + vertices[0] + '$ равен $' + angle +
				'^{\\circ}$, углы $' + vertices[1] + '$ и $' + vertices[2] + '$ – острые, ' +
				'высоты $' + [vertices[1], vertices[3]].shuffle().join('') + '$ и $' + [vertices[2], vertices[4]].shuffle().join(
					'') +
				'$ пересекаются в точке $' + vertices[5] + '$. Найдите угол $' + vertices[3] + vertices[5] + vertices[4] +
				'$. Ответ дайте в градусах.',
			answers: 180 - angle,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27762 47265 47267 47269 47271 47273 47275 47277 47279 47281 47283 47285 47287 47289 47291 47293 47295 47297 47299 47301 47303 47305 47307 47309 47311 47313 47315 47317
