(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let range = sl(1,10);
		let a = sl(5, 20)*range;

		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 5, 20)*range,
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateMidlines: true
			}
		});
		genAssert(triangle.midlineCALength.isAlmostInteger(), 'Гипотенуза не целая');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);
		};

		NAtask.setTask({
			text: `Катеты прямоугольного треугольника равны $${[triangle.lengthAB,triangle.lengthBC].shuffleJoin('$ и $')}$. Найдите наибольшую среднюю линию треугольника.`,
			answers: triangle.midlineCALength,
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
// https://mathb-ege.sdamgia.ru/problem?id=506338
