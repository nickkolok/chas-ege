(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let side = sl(5, 10);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(2, 7),
				lengthBC: side,
				lengthCA: side,
			},
		});
		genAssert(![triangle.lengthAB, triangle.lengthBC].hasDubl(), 'Основание не должно совпадать с боковой стороной');

		let angleB = triangle.angleBInDegrees.ceil();

		let points = autoScale(triangle.vertices);
		genAssert(160 - points[1].x > 20, 'Прямая из угла B не видна');
		let letters = latbukv.slice(0, 3);

		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.drawLine(points[1].x, points[1].y, 160, points[1].y);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, 160, points[1].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В равнобедренном треугольнике $ABC$ с основанием $AB$
            внешний угол при вершине $B$ равен $${180 - angleB}^{\\circ}$. 
            Найдите величину угла $${letters.slice().permuteCyclic(-1).randomReverse().join('')}$. Ответ дайте в градусах`,
			answers: 180 - angleB * 2,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.allDecimalsToStandard(/*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//311680 37 340586
