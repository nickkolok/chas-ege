(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let letters = latbukv.slice(0, 4).concat('');

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

		trp.addVertexToConnectionMatrix(trp.heightCAB.pe, 'C');
		let AH = trp.pointA.distanceTo(trp.heightCAB.pe)[0];

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[2].x, points[2].y], 15);

			ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `Высота равнобедренной трапеции, проведённая из вершины $C$, делит основание $AB$ на отрезки длиной $${AH}$ и $${trp.lengthAB - AH}$. 
			Найдите длину основания $CD$.`,
			answers: trp.lengthCD,
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/test?likes=324216
