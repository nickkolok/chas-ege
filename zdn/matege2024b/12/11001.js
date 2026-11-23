(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let [a, b] = om.pifagtr.iz();
		let coefficient = sl(0.1, 10, 0.1);

		let triangle = new Triangle({
			lengths: {
				lengthAB: a * coefficient,
				lengthBC: b * coefficient,
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateMidlines: true
			}
		});

		let points = autoScale(triangle.vertices);

		let triangleColor = om.secondaryBrandColors.iz();
		let angleColor = om.primaryBrandColors.iz();
		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = triangleColor;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = angleColor;
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);
		};

		NAtask.setTask({
			text: `В прямоугольном треугольнике наибольший из катетов равен $${[triangle.lengthAB, triangle.lengthBC].maxE()}$. Гипотенуза равна $${triangle.lengthCA}$. Найдите наименьшую среднюю линию этого треугольника.`,
			answers: [triangle.midlineBCLength, triangle.midlineABLength].minE(),
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
// https://base.mathege.ru/clones/?position=16&parent=11001
