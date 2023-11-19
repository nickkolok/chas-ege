(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 89);

		let vertices = window.latbukv.iz(6);

		let rand = sl1();

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			let coordinatesByAngle = (x, y, angle, length) => [x + angle.cos() * length, y + angle.sin() * length];//А надо ли это в функцию?

			let angle = -Math.PI / 3.2;
			let vertex = coordinatesByAngle(10, 370, angle, 400);

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, vertex[0], vertex[1]);
			ctx.drawLine(390, 370, vertex[0], vertex[1]);


			ctx.drawLineAtAngle(390, 370, Math.atan2(-370 + vertex[1], -390 + vertex[0]) / 2 - Math.PI / 2, 317);
			ctx.drawLineAtAngle(10, 370, angle / 2, 345);

			let bisector1 = coordinatesByAngle(10, 370, angle / 2, 345);
			let bisector2 = coordinatesByAngle(390, 370, Math.atan2(-370 + vertex[1], -390 + vertex[0]) / 2 - Math.PI / 2, 317);

			ctx.strokeStyle = om.primaryBrandColors[rand];
			ctx.arcBetweenSegmentsCount([vertex[0], vertex[1], 10, 370].concat(bisector1), 30, 2);
			ctx.arcBetweenSegmentsCount(bisector1.concat([10, 370, 390, 370]), 40, 2);

			ctx.strokeStyle = om.primaryBrandColors[rand];
			ctx.arcBetweenSegments([10, 370, 390, 370].concat(bisector2), 30);
			ctx.arcBetweenSegments((bisector2.concat([390, 370, vertex[0], vertex[1]])), 40);

			ctx.strokeStyle = om.primaryBrandColors[1 - rand];
			ctx.arcBetweenSegmentsCount(bisector1.concat([10, 370]).concat(bisector2).concat([390, 370]), 25, 3);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], vertex[0], vertex[1] - 10);
			ctx.fillText(vertices[1], 10 - 5, 370 + 20);
			ctx.fillText(vertices[2], 390 - 20, 370 + 20);

			ctx.fillText(vertices[3], bisector1[0], bisector1[1]);
			ctx.fillText(vertices[4], bisector2[0] - 20, bisector2[1]);

			ctx.fillText(vertices[5], 210, 250);
		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).join('') + '$ угол $' + vertices[0] + '$ равен $' + angle +
				'^{\\circ}$, углы $' + vertices[1] + '$ и $' + vertices[2] + '$ – острые, ' +
				'биссектрисы $' + [vertices[1], vertices[3]].shuffleJoin() + '$ и $' + [vertices[2], vertices[4]].shuffleJoin() +
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
