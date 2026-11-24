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
			let rightRayEnd = ctx.drawLineAtAngle(points[1].x, points[1].y, 0, rayReachX - points[1].x);
			let leftRayEnd = ctx.drawLineAtAngle(points[0].x, points[0].y, Math.PI, rayReachX + points[0].x);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, rightRayEnd.x, rightRayEnd.y], arcRadius);

			ctx.arcBetweenSegments([leftRayEnd.x, leftRayEnd.y, points[0].x, points[0].y, points[2].x, points[2].y], arcRadius);

			ctx.signVertices(points, letters, {above: [2]});
			ctx.scale(1, -1);
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

