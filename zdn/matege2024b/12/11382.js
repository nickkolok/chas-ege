(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "11382";
		let letters = latbukv.slice(0, 3).concat('M');
		let preference = ['length_BC_by_median_and_base', 'median', 'length_BC_by_median_and_area'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));


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

		genAssert(triangle.medianCLength.isAlmostInteger(), 'Площадь трапеции не целая');

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

			if (rand) {
				ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7, 2);
				ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);
			} else {
				ctx.arcBetweenSegments([points[2].x, points[2].y, points[3].x, points[3].y, points[0].x, points[0].y], 15);
			}

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ `,
			questions: [
				[{
					text: `медиана $CM$ перпендикулярна $BC$. Найдите $BC$, если $CM=${triangle.medianCLength}$, $AB = ${triangle.lengthAB}$.`,
					answers: triangle.lengthBC,
				}, {
					text: `известно, что $BC=CA=${triangle.lengthBC}$, $AB = ${triangle.lengthAB}$. Найдите длину медианы $CM$.`,
					answers: triangle.medianCLength,
				}, {
					text: `известно, что $BC=CA=${triangle.lengthBC}$, медиана $CM$ равна $${triangle.medianCLength}$. Площадь треугольника $ABC$ равна $${triangle.area()}$. Найдите длину стороны $BC$.`,
					answers: triangle.lengthBC ,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference,
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
// https://base.mathege.ru/clones/?position=16&parent=11382
// https://base.mathege.ru/clones/?position=16&parent=6583
// https://base.mathege.ru/clones/?position=&parent=6693
