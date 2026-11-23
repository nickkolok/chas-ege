(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3).concat('H');

		let key = "10877";
		let preference = ['BH_by_sin', 'CH_by_cos'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Как в ФИПИ: BC целое, синус или косинус угла A — десятичная дробь от 0,1 до 0,8
		// (sin A = 0,25, cos A = 0,7 и т. п.); катет AC при этом обычно не целый, в условие он не входит
		let BC = sl(4, 50);
		let trigA = sl(2, 16) / 20;
		let tgA = [trigA / (1 - trigA * trigA).sqrt(), (1 - trigA * trigA).sqrt() / trigA][rand];
		let triangle = new Triangle({
			lengths: {
				lengthCA: BC / tgA,
				lengthBC: BC,
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000([triangle.sinA, triangle.heightCLength][rand]);

		triangle.addVertexToConnectionMatrix(triangle.heightCEndPoint, 'C');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[2].x, points[2].y, points[1].x, points[1].y], 15);
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $C$ равен $90^\\circ$, $CH$ – высота, $BC=${triangle.lengthBC}$, `,
			questions: [
				[{
					text: `$\\sin A=${trigA}$. Найдите длину отрезка $BH$.`,
					answers: triangle.pointB[0].distanceTo(triangle.heightCEndPoint)[0],
				}, {
					text: `$\\cos A=${trigA}$. Найдите высоту $CH$.`,
					answers: triangle.heightCLength,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference
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
// https://base.mathege.ru/clones/?position=16&parent=10877
