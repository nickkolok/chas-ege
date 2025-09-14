(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3).concat('M');
		let side = sl(3, 15);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(8, 15),
				lengthBC: side,
				lengthCA: side,
			},
			supplementary: {
				calculateMedians: true,
			}
		});

		genAssert(triangle.medianCLength.pow(2).isAlmostInteger(), 'Медиана треугольника не выражается корнем из целого числа');
		genAssert((triangle.cosA * 100).isAlmostInteger(), 'cos A треугольника существенно нецелый');

		triangle.addVertexToConnectionMatrix(triangle.medianC.pe, 'C');

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

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[3].x, points[3].y, 7);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[3].x, points[3].y, 7);

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7, 2);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В равнобедренном треугольнике $ABC$ боковые стороны $BC=CA=${triangle.lengthCA}$, медиана $CM=${triangle.medianCLength.pow(2).texsqrt(1)}$. Найдите $\\cos\\angle ${['CAB', 'ABC'].iz()}$.`,
			answers: triangle.cosA,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=10935
