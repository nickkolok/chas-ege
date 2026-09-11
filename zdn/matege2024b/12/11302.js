(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3).concat('M');

		let a = sl(1, 25);
		let triangle = new Triangle({
			lengths: {
				lengthAB: slKrome(a, 1, 25),
				lengthBC: a,
				lengthCA: a,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000(triangle.area());
		genAssertZ1000(triangle.tgA * 1000);
		
		triangle.addVertexToConnectionMatrix([triangle.heightC.pe], 'C');

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

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7);
			ctx.strokeInMiddleOfSegment(points[2].x, points[2].y, points[1].x, points[1].y, 7);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В равнобедренном треугольнике $ABC$ высота $CM$, проведённая к основанию, равна $${triangle.heightCLength.pow(2).texsqrt(1)}$, а $\\tg A = ${triangle.tgA.pow(2).texsqrtfrac(1)}$. Найдите площадь треугольника.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11302
