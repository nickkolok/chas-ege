(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let side = sl(5, 10);
		let letters = latbukv.slice(0, 3).concat('M');

		let key = "11322";
		let preference = ['side_AB_by_height', 'side_AB_by_median', 'bisector'];

		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let triangle = new Triangle({
			lengths: {
				lengthAB: side * (3).sqrt(),
				lengthBC: side,
				lengthCA: side,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		triangle.addVertexToConnectionMatrix(triangle.heightCEndPoint, 'C');

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
			switch (rand) {
			case 0:
				ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 15);
				ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7, 2);
				ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);
				break;
			case 1:
				ctx.arcBetweenSegments([points[0].x, points[0].y, points[2].x, points[2].y, points[3].x, points[3].y], 15);
				ctx.arcBetweenSegments([points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y], 20);
				ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[3].x, points[3].y, 7);
				ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[3].x, points[3].y, 7);
				break;
			case 2:
				ctx.arcBetweenSegments([points[0].x, points[0].y, points[2].x, points[2].y, points[3].x, points[3].y], 15);
				ctx.arcBetweenSegments([points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y], 20);
				ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7, 2);
				ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);
				break;
			}
			//

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В `,
			questions: [
				[{
					text: `равнобедренном треугольнике $ABC$ угол $ACB$ равен $120^\\circ$. 
                Высота $CM$, проведённая к основанию $AB$, равна $${triangle.heightCLength}$. Найдите длину стороны $AC$.`,
					answers: triangle.lengthCA,
				}, {
					text: `треугольнике $ABC$ угол $C$ равен $120^\\circ$.
                Медиана $CM$ делит угол $B$ пополам и равна $${triangle.heightCLength}$. 
                Найдите длину стороны $AC$.`,
					answers: triangle.lengthCA,
				}, {
					text: `треугольнике $ABC$ известно, что $AC = BC =12$, $\\angle ACB = 120^\\circ$ , $CM$ – биссектриса. 
                Найдите длину отрезка $CM$.`,
					answers: triangle.heightCLength,
				}][rand]
			],
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
// https://base.mathege.ru/clones/?position=&parent=11322
// https://base.mathege.ru/clones/?position=&parent=11412
// https://base.mathege.ru/clones/?position=&parent=10113
