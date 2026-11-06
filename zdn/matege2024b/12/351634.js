(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		let a = sl(5, 40);
		let b = slKrome(a, 10, 20);
		let trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: b,
				lengthCD: slKrome([a, b], 10, 20),
				lengthDA: slKrome([a, b], 5, 20),
			},
			supplementary: {
				calculateDiagonals: true,
			}
		});

		genAssert(trp.area().isAlmostInteger(), 'Площадь трапеции не целая');
		genAssert(trp.angleCInRadians != Math.PI / 2, 'Получилась прямоугольная трапеция');
		genAssert(trp.angleDInRadians != Math.PI / 2, 'Получилась прямоугольная трапеция');


		let trian = new Triangle({
			lengths: {
				lengthAB: trp.lengthDiagonalAC,
				lengthBC: trp.lengthCD,
				lengthCA: trp.lengthDA,
			},
			supplementary: {
				calculateDiagonals: true,
			}
		});

		trp.connectVerticesInConnectionMatrix([
			[0, 2],
		]);

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В трапеции $ABCD$ известно, что $AB = ${trp.lengthAB}$, $CD = ${trp.lengthCD}$, а её площадь равна $${trp.area()}$. Найдите площадь треугольника $ADC$.`,
			answers: trian.area(),
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
// https://oge.sdamgia.ru/problem?id=351634
