(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Угол 45° (или 135°) между наклонной боковой стороной и основанием возможен
		// только при высоте, равной разности оснований, — так и задаём, без перебора
		let height = sl(1, 10);
		let smallBase = sl(1, 15);
		let bigBase = smallBase + height;

		// Большее основание AB всегда внизу: угол B острый (45°), угол C тупой (135°).
		// В условии упоминается любой из этих двух углов, чертёж от этого не переворачивается
		let trp = new Trapezoid({
			lengths: {
				lengthAB: bigBase,
				lengthCD: smallBase,
			},
			height: height,
			angles: {
				angle: {
					angleA: Math.PI / 2,
				},
			},
		});

		let points = autoScale(trp.vertices);
		let angleGiven = [45, 135].iz();
		let bases = [bigBase, smallBase].shuffle(); // порядок оснований в тексте

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			// Прямые углы при вершинах A и D, как на чертеже-образце
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[3].x, points[3].y, points[0].x, points[0].y, points[1].x, points[1].y], 15, true);
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 15, true);
		};

		NAtask.setTask({
			text: `В прямоугольной трапеции основания равны $${bases[0]}$ и $${bases[1]}$, а один из углов равен $${angleGiven}^\\circ$. Найдите меньшую боковую сторону.`,
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
