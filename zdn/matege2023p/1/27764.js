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

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 150, 70);
			ctx.drawLine(150, 70, 390, 370);

			ctx.drawLine(10, 370, 270 - 2, 220 - 5);
			ctx.drawLine(79 + 4, 220 - 10, 390, 370);

			ctx.beginPath();
			ctx.arc(183, 270, 30, 0.10 * Math.PI, -1.13 * Math.PI);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(10, 370, 30, 0, -0.17 * Math.PI, true);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(10, 370, 25, -0.17 * Math.PI, -0.34 * Math.PI, true);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(390, 370, 30, -Math.PI, -0.85 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(390, 370, 35, -Math.PI, -0.85 * Math.PI);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(390, 370, 40, -0.85 * Math.PI, -0.72 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(390, 370, 45, -0.85 * Math.PI, -0.72 * Math.PI);
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
				'биссектрисы $' + [vertices[1], vertices[3]].shuffle().join('') + '$ и $' + [vertices[2], vertices[4]].shuffle()
				.join(
					'') +
				'$ пересекаются в точке $' + vertices[5] + '$. Найдите угол $' + vertices[2] + vertices[5] + vertices[1] +
				'$. Ответ дайте в градусах.',
			answers: 90 + 0.5 * angle,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27764 628357 628475 47369 47371 47373 47375 47377 47379 47381 47383 47385 47387 47389 47391 47393 47395 47397 47399 47401 47403 47405 47407 47409 47411 47413 47415 47417 47419 47421 47423 47425 47427 47429 47431 47433 47435 47437 47439 47441 47443 47445 47447 47449 47451 47453
