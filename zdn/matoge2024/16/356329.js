(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(5, 15);
		let b = slKrome(a, 5, 15);

		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: b,
				lengthCA: slKrome([a, b], 5, 15),
			},
			supplementary: {
				calculateBisectors: true,
			}
		});
		
		genAssert(triangle.angleAInDegrees!=90);
		genAssert(triangle.angleBInDegrees!=90);
		genAssertZ1000(triangle.area());
		let intersectPoint = triangle.bisectorA.intersect(triangle.bisectorB);

		let points = autoScale(triangle.vertices.concat(intersectPoint));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);
            ctx.drawArc(points[3].x, points[3].y, (points[3].y - points[0].y).abs(), 0, 2 * Math.PI);
		};

		NAtask.setTask({
			text: `Периметр треугольника равен $${triangle.perimeter}$, одна из сторон равна $${[triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].iz()}$, а радиус вписанной в него окружности равен $${triangle.radiusOfInscribedCircle}$. 
			Найдите площадь этого треугольника.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=356329
