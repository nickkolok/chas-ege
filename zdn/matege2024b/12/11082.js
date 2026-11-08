(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let a = sl(5, 20);
		let k = sl(1, 10, 0.5);

		let triangle = new Triangle({
			lengths: {
				lengthAB: a*k,
				lengthBC: slKrome(a, 5, 20)*k,
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateMidlines: true
			}
		});

		genAssert(triangle.lengthCA.isAlmostInteger(), 'Гипотенуза не целая');

		triangle.addVertexToConnectionMatrix([triangle.midlinePointsBC, triangle.midlinePointsAB][Number((triangle.lengthAB < triangle.lengthBC))], 'E');
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
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);
		};

		NAtask.setTask({
			text: `Катет прямоугольного треугольника равен $${[triangle.lengthAB,triangle.lengthBC].maxE()}$, одна из средних линий равна $${[triangle.midlineABLength, triangle.midlineBCLength].minE()}$. Найдите гипотенузу этого треугольника.`,
			answers: triangle.lengthCA,
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
// https://base.mathege.ru/clones/?position=16&parent=11082
