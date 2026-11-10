(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '514394';
		// 'smallerLeg' — как в ФИПИ: один из углов 45° (в ФИПИ — 135°), найти меньшую боковую сторону;
		// 'biggerLeg' — не из ФИПИ, обобщение тем же методом: один из углов 60° или 120°,
		// найти большую (наклонную) боковую сторону
		let preference = ['smallerLeg', 'biggerLeg'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Высота, опущенная из вершины тупого угла, отсекает прямоугольный треугольник
		// с катетом, равным разности оснований d, и острым углом 45° или 60°:
		// при 45° меньшая боковая сторона (высота) равна d,
		// при 60° большая (наклонная) боковая сторона равна 2d, а высота — d√3
		let difference = sl(1, 10);
		let smallBase = sl(1, 15);
		let bigBase = smallBase + difference;
		let acuteAngle = [45, 60][rand];
		let height = [difference, difference * (3).sqrt()][rand];
		let answer = [difference, 2 * difference][rand];

		// Большее основание AB всегда внизу: угол B острый, угол C тупой.
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
		let angleGiven = [acuteAngle, 180 - acuteAngle].iz();
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
			text: `В прямоугольной трапеции основания равны $${bases[0]}$ и $${bases[1]}$, а один из углов равен $${angleGiven}^\\circ$. Найдите ${['меньшую', 'большую'][rand]} боковую сторону.`,
			answers: answer,
			authors: ['Александра Суматохина'],
			preference: preference,
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
