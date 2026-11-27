(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3).concat('M');

		let a = sl(1, 25);
		let base = slKrome(a, 1, 25);
		let doubleHeight = Math.sqrt(4 * a ** 2 - base ** 2);
		genAssert(doubleHeight > 0 && Number.isInteger(doubleHeight));
		let triangle = new Triangle({
			lengths: {
				lengthAB: base,
				lengthBC: a,
				lengthCA: a,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000(triangle.area());

		triangle.addVertexToConnectionMatrix([triangle.heightC.pe], 'C');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.arcBetweenSegments([points[2].x, points[2].y, points[3].x, points[3].y, points[0].x, points[0].y], 15);

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7);
			ctx.strokeInMiddleOfSegment(points[2].x, points[2].y, points[1].x, points[1].y, 7);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.textAlign = 'center';
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В равнобедренном треугольнике $ABC$ высота $CM$, проведённая к основанию, равна $${triangle.heightCLength.pow(2).texsqrt(1)}$, а $\\tg A = ${doubleHeight.texfrac(base)}$. Найдите площадь треугольника $ABC$.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11302
// ФИПИ 5E4B47 98554D 84A203 FBD477 10DD70 652C71 7DF916 06C02C 74D92E 200A22 18E7DD 3DB5D9 41055B BBE1A0 8E69A3 5FDFCA CE83E8 1BB869 1B6534 8F8A3C
