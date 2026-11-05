(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let height = sl(5, 20);

		let trp = new Trapezoid({
			lengths: {
				lengthAB: sl(5, 20),
				lengthCD: sl(5, 20),
			},
			height: height,
			angles: {
				angle: {
					angleA: Math.PI / 2,
				},
			},
		});

		let points = autoScale(trp.vertices);

		genAssert(trp.angleCInDegrees.isZ(), 'Данный угол не целый');
		genAssert(trp.angleCInDegrees != 90, 'Получился прямоугольник');

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

		};

		NAtask.setTask({
			text: `В прямоугольной трапеции основания равны $${trp.lengthAB}$ и $${trp.lengthCD}$, а один из углов равен $${trp.angleCInDegrees}^\\circ$. Найдите меньшую боковую сторону.`,
			answers: height,
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
// https://mathb-ege.sdamgia.ru/problem?id=514394
