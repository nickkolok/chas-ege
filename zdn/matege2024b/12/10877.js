(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3).concat('H');

		let key = "10877";
		let preference = ['BH_by_sin', 'CH_by_cos'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let a = sl(5, 50);
		let triangle = new Triangle({
			lengths: {
				lengthCA: a,
				lengthBC: slKrome(a, 5, 50),
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000([triangle.sinA, triangle.cosA][rand].pow(2));
		genAssertZ1000([triangle.sinA, triangle.heightCLength][rand]);

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
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $C$ равен $90^\\circ$, $CH$ – высота, $BC=${triangle.lengthBC}$, `,
			questions: [
				[{
					text: `$\\sin A=${triangle.sinA.pow(2).texsqrtfrac(1)}$. Найдите длину отрезка $BH$.`,
					answers: triangle.lengthAB - triangle.lengthCA * triangle.cosA,
				}, {
					text: `$\\cos A=${triangle.cosA.pow(2).texsqrtfrac(1)}$. Найдите высоту $CH$.`,
					answers: triangle.heightCLength,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference
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
// https://base.mathege.ru/clones/?position=16&parent=10877
