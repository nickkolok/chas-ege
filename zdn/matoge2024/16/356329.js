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

		genAssert(triangle.angleAInDegrees != 90);
		genAssert(triangle.angleBInDegrees != 90);
		genAssertZ1000(triangle.area());
		let circle = triangle.inscribedCircle();
		let intersectPoint = circle.pc;

		let camera = { scale: 1 };
		let points = autoScale(triangle.vertices.concat(intersectPoint), camera);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);
			new Circle(new Point(points[3].x, points[3].y), circle.r * camera.scale).drawOnto(ctx);
		};

		NAtask.setTask({
			text: `Периметр треугольника равен $${triangle.perimeter}$, одна из сторон равна $${[triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].iz()}$, а радиус вписанной в него окружности равен $${triangle.radiusOfInscribedCircle}$. Найдите площадь этого треугольника.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356329

