(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let triangle = new Triangle({
			lengths: {
				lengthBC: sl(3, 10),
				lengthCA: sl(3, 10),
			},
			angles: {
				angle: 90,
				angleInDegree: true
			},
		});
		genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
			'Все стороны треугольника должны быть разными');

		let angle = [triangle.angleBInDegrees, triangle.angleAInDegrees].iz().ceil();

		let points = autoScale(triangle.vertices);
		let letters = latbukv.slice(0, 3);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[2].x, points[2].y, points[1].x, points[1].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `Один из острых углов прямоугольного треугольника равен $${angle}^{\\circ}$. Найдите его другой острый угол. Ответ дайте в градусах`,
			answers: 90 - angle,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//348758 349483 349526 349694 349873 350097 350346 350753 351032 351393 352036 353022 401228 401725 401767 401880 402001 402159 402344 402628 402808 403021 403402
