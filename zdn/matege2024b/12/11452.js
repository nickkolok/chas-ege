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
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.drawLine(points[1].x, points[1].y, 160, points[1].y);
			ctx.drawLine(points[0].x, points[0].y, -160, points[0].y);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, 160, points[1].y], 15);

			ctx.arcBetweenSegments([-160, points[0].y, points[0].x, points[0].y, points[2].x, points[2].y], 15);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ внешние углы при вершинах $A$ и $B$ равны $150^\\circ$, $AC=${triangle.lengthCA}$. Найдите длину биссектрисы $CM$.`,
			answers: triangle.heightCLength,
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
// https://base.mathege.ru/clones/?position=16&parent=11452
