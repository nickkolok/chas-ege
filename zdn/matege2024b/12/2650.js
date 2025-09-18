(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4).concat('K');

		let par = new Parallelogram({
			lengths: {
				lengthAB: sl(2, 10),
				lengthBC: sl(2, 10)
			},
			angles: {
				angle: {
					angleA: sl(0.2, 0.4, 0.01) * Math.PI
				},
			},
		});

		let bisector = bisectorIntersection({
			fP: par.pointD,
			sP: par.pointA,
			tP: par.pointB
		}, [par.segmentCD])[0].pe;
		genAssert((bisector.x - par.pointC.x).abs() > Number.EPSILON, 'Биссектриса совпала с диагональю');
		par.addVertexToConnectionMatrix(bisector, 'A');

		let points = autoScale(par.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ проведена биссектриса угла $A$, пересекающая сторону $CD$ в точке $K$. Найдите $KC$, если $${['DA', 'BC'].iz()}=${par.lengthDA}$, а периметр параллелограмма равен $${par.perimeter}$.`,
			answers: par.lengthAB - par.lengthDA,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
})();
// https://self-edu.ru/ege2020_base_30.php?id=3_15
