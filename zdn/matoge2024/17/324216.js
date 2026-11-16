(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let letters = latbukv.slice(0, 4);

		let side = sl(5, 20);
		let a = sl(5, 20);

		const trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: side,
				lengthCD: sl(2, a-1),
				lengthDA: side,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		let vertex = sl1() ? 'C' : 'D';
		let foot = trp['height' + vertex + 'AB'].pe;
		trp.addVertexToConnectionMatrix(foot, vertex);
		let AH = trp.pointA.distanceTo(foot)[0];

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[vertex == 'C' ? 2 : 3].x, points[vertex == 'C' ? 2 : 3].y], 15);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.textAlign = "center";
			points.slice(0, 4).forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + (i < 2 ? 25 : -5)));
		};

		NAtask.setTask({
			text: `Высота равнобедренной трапеции, проведённая из вершины $${vertex}$, делит основание $AB$ на отрезки длиной $${AH}$ и $${trp.lengthAB - AH}$. Найдите длину основания $CD$.`,
			answers: trp.lengthCD,
			authors: ['Александра Суматохина'],
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
// https://oge.sdamgia.ru/test?likes=324216
