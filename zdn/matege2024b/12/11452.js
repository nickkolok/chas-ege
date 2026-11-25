(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let side = sl(5, 10);
		let letters = latbukv.slice(0, 3).concat('M');

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

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			let rayReachX = 160, arcRadius = 15;
			let arcStrokeStyle = om.primaryBrandColors.iz();
			ctx.drawExternalAngle(points[0], points[1], points[2], {
				radius: arcRadius, rayLength: rayReachX - points[1].x, arcStrokeStyle,
			});
			ctx.drawExternalAngle(points[1], points[0], points[2], {
				radius: arcRadius, rayLength: rayReachX + points[0].x, arcStrokeStyle,
			});

			ctx.signVertices(points, letters, {above: [2]});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ внешние углы при вершинах $A$ и $B$ равны $150^\\circ$, $AC=${triangle.lengthCA}$. Найдите длину биссектрисы $CM$.`,
			answers: triangle.heightCLength,
			authors: ['Александра Суматохина'],
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
// https://base.mathege.ru/clones/?position=16&parent=11452

