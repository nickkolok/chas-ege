(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Угол 45° (или 135°) между наклонной боковой стороной и основанием возможен
		// только при высоте, равной разности оснований, — так и задаём, без перебора
		let height = sl(1, 10);
		let smallBase = sl(1, 15);
		let bases = [smallBase + height, smallBase].shuffle();

		let trp = new Trapezoid({
			lengths: {
				lengthAB: bases[0],
				lengthCD: bases[1],
			},
			height: height,
			angles: {
				angle: {
					angleA: Math.PI / 2,
				},
			},
		});

		let points = autoScale(trp.vertices);
		let angleC = bases[0] > bases[1] ? 135 : 45;

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
			text: `В прямоугольной трапеции основания равны $${bases[0]}$ и $${bases[1]}$, а один из углов равен $${angleC}^\\circ$. Найдите меньшую боковую сторону.`,
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
