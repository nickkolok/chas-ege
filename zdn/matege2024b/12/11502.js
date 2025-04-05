(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '11502';
		let preference = ['midline', 'side'];

		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let side = sl(4, 60);

		let letters = latbukv.slice(0, 3).concat(['K', 'N', 'M']);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(side + 2, side + 20, 2),
				lengthBC: side,
				lengthCA: side,
			},
			supplementary: {
				calculateHeights: true,
				calculateMidlines: true
			}
		});

		let height = triangle.heightCLength;
		genAssert((height * 100).isAlmostInteger(), 'Высота слишком дробная');

		triangle.addVertexToConnectionMatrix([triangle.heightC.pe], 'C');
		triangle.addVertexToConnectionMatrix(triangle.midlinePointsAB, 'E');

		triangle.connectVerticesInConnectionMatrix([4, 5]);

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

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2 || i == 3) ? 25 : -5)));
		};

		NAtask.setTask({
			text: ` В равнобедренном треугольнике $ABC$ медиана $CK = ${height}$`,
			questions: [
				[{
					text: `, боковая сторона $AC = ${triangle.lengthCA}$. Найдите длину отрезка $MN$, если известно, что он соединяет середины боковых сторон.`,
					answers: triangle.midlineABLength,
				}, {
					text: `, отрезок $MN$, соединяющий середины боковых сторон, равен $${triangle.midlineABLength}$. Найдите боковую сторону $AC$.`,
					answers: triangle.lengthCA,
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
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11502
// https://base.mathege.ru/clones/?position=16&parent=11472
