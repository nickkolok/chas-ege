(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1(); //AB < BC = 0, AB > BC = 1

		let a = sl(4, 48);

		let par = new Parallelogram({
			lengths: {
				lengthAB: a,
				lengthBC: [sl(a + 1, 50), sl(2, a - 1)][rand]
			},
			angles: {
				angle: {
					angleA: Math.PI * [1 / 6, 2 / 3].iz()
				},
			},
			supplementary: {
				calculateHeights: true,
			}
		});


		genAssert(par.heightDAB.pe.x + 5 < par.pointB.x, 'Высота из вершины D к стороне AB выходит за пределы фигуры');
		genAssert(par.heightDBC.pe.x > par.pointB.x, 'Высота из вершины D к стороне BC выходит за пределы фигуры');

		let height = [par.lengthHeightDAB, par.lengthHeightDBC];
		height.forEach((h) => genAssert(h.isAlmostInteger(), 'Высоты не целые'));

		par.addVertexToConnectionMatrix([par.heightDAB.pe, par.heightDBC.pe], 'E');
		par.connectVerticesInConnectionMatrix([
			[3, 4],
			[3, 5]
		]);

		let points = autoScale(par.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.arcBetweenSegments([points[3].x, points[3].y, points[4].x, points[4].y, points[0].x, points[0].y], 15);
			ctx.arcBetweenSegments([points[3].x, points[3].y, points[5].x, points[5].y, points[2].x, points[2].y], 15);
		};

		NAtask.setTask({
			text: 'Стороны параллелограмма равны $' + [par.lengthAB, par.lengthBC].shuffleJoin('$ и $') + '$. Высота, ' +
				'опущенная на ' + ['большую', 'меньшую'][rand] + ' из этих сторон, ' +
				'равна $' + height[rand] + '$. Найдите высоту, опущенную на ' + ['меньшую', 'большую'][rand] +
				' сторону параллелограмма.',
			answers: height[1 - rand],
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
//4850
