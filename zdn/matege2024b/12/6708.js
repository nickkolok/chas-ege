(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(5, 20);
		let a = sl(5, 20);

		const trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: side,
				lengthCD: slKrome(a, 5, 20),
				lengthDA: side,
			},
			supplementary: {
				calculateHeights: true,
			}
		});
		genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');

		let rand = trp.lengthAB < trp.lengthCD ? 1 : 0;

		let tg = [trp.angleAInRadians, trp.angleDInRadians][rand].tg();
		genAssertZ1000(tg);

		trp.addVertexToConnectionMatrix([trp.heightCAB.pe, trp.heightACD.pe][rand], ['C', 'A'][rand]);

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
			if (rand) {
				ctx.arcBetweenSegments([points[3].x, points[3].y, points[4].x, points[4].y, points[0].x, points[0].y], 15);
			} else {
				ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[2].x, points[2].y], 15);
			}
		};

		NAtask.setTask({
			text: `В равнобедренной трапеции одно из оснований равно $${trp.lengthAB}$, а другое – $${trp.lengthCD}$. Высота трапеции равна $${trp.lengthHeightACD}$. Найдите тангенс острого угла трапеции.`,
			answers: tg,
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
// https://base.mathege.ru/clones/?position=16&parent=6708
