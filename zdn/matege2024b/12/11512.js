(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let side = sl(4, 60, 2);
		let k = sl(1, 10) * [0.1, 1, 10, 100].iz();

		let letters = latbukv.slice(0, 3).concat(['K', 'P']);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(side + 2, side + 20, 2) * k,
				lengthBC: side * k,
				lengthCA: side * k,
			},
			supplementary: {
				calculateHeights: true,
				calculateMidlines: true,
			}
		});

		let height = triangle.heightCLength;
		genAssert((height * 100).isAlmostInteger(), 'Высота слишком дробная');

		let answ = triangle.midlineCALength;

		triangle.addVertexToConnectionMatrix([triangle.heightC.pe], 'C');
		triangle.addVertexToConnectionMatrix(triangle.midlineCAEndPoint, 'E');
		triangle.connectVerticesInConnectionMatrix([3, 4]);

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.arcBetweenSegments([points[2].x, points[2].y, points[3].x, points[3].y, points[0].x, points[0].y], 15);

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[3].x, points[3].y, 7);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[3].x, points[3].y, 7);

			ctx.strokeInMiddleOfSegment(points[2].x, points[2].y, points[4].x, points[4].y, 7, 2);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[4].x, points[4].y, 7, 2);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2 || i == 3) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В равнобедренном треугольнике $ABC$ основание $AB=${triangle.lengthAB}$, высота $CK$, проведённая к основанию, равна $${height}$. Точка $P$ - середина стороны $BC$. Найдите длину отрезка $KP$.`,
			answers: answ,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//311680 37 340586
