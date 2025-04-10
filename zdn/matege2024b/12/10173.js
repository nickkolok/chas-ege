(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		let AB = sl(3, 15);
		let CD = sl(2, AB - 1);

		let trp = new Trapezoid({
			lengths: {
				lengthAB: AB,
				lengthCD: CD,
			},
			height: (CD.pow(2) - (AB - CD).pow(2)).sqrt(),
			angles: {
				angle: {
					angleD: Math.PI / 2,
				},
			},
		});

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
			ctx.arcBetweenSegments([points[1].x, points[1].y, points[0].x, points[0].y, points[3].x, points[3].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В прямоугольной трапеции $ABCD$ с основаниями $AB$ и $CD$ угол $BAD$ прямой, $AD=${trp.lengthDA.pow(2).texsqrt(1)}$, $BC = CD = ${trp.lengthCD}$. Найдите среднюю линию трапеции.`,
			answers: 0.5 * (trp.lengthCD + trp.lengthAB),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
})();
// https://base.mathege.ru/clones/?position=&parent=10173
