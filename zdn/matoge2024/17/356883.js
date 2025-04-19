(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let par = new Parallelogram({
			lengths: {
				lengthAB: sl(10, 50),
				lengthBC: sl(10, 50),
			},
			angles: {
				angle: {
					angleA: slKrome(90,30,150),
				},
				angleInDegree: true,
			},
		});

		let points = autoScale(par.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);
		};

		NAtask.setTask({
			text: `Один из углов параллелограмма равен $${par.angleAInDegrees}^\\circ$. Найдите ${[`больший`, `меньший`][Number(par.angleAInDegrees>par.angleBInDegrees)]} угол этого параллелограмма. Ответ дайте в градусах.`,
			answers: par.angleBInDegrees,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);

})();
// https://oge.sdamgia.ru/problem?id=356883
