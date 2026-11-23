(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		// Боковые стороны в ответ не входят, поэтому трапеция строится по основаниям, высоте и углу,
		// а не по четырём целым сторонам: так достижимы данные ФИПИ — основания от 1,
		// высота бывает полуцелой (AD = 8, BC = 4, площадь 21)
		let a = sl(1, 40);
		let c = slKrome(a, 1, 20);
		let height = sl(1, 30, 0.5);
		genAssert(height >= Math.max(a, c) / 8, 'Слишком плоская трапеция — плохой чертёж');
		genAssert(Math.min(a, c) >= Math.max(a, c) / 8, 'Основания слишком разные — подписи короткого наезжают друг на друга');
		let trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthCD: c,
			},
			height: height,
			angles: {
				angle: {
					angleA: sl(40, 80),
				},
				angleInDegree: true,
			},
			supplementary: {
				calculateDiagonals: true,
			}
		});

		genAssert(trp.area().isAlmostInteger(), 'Площадь трапеции не целая');
		genAssert(!trp.angleCInRadians.isAlmostEqual(Math.PI / 2, 1e-9), 'Получилась прямоугольная трапеция');
		genAssert(!trp.angleDInRadians.isAlmostEqual(Math.PI / 2, 1e-9), 'Получилась прямоугольная трапеция');


		let trian = new Triangle({
			lengths: {
				lengthAB: trp.lengthDiagonalAC,
				lengthBC: trp.lengthCD,
				lengthCA: trp.lengthDA,
			},
		});
		genAssertAlmostInteger(trian.area(), 'Площадь треугольника не целая');

		trp.connectVerticesInConnectionMatrix([
			[0, 2],
		]);

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В трапеции $ABCD$ известно, что $AB = ${trp.lengthAB}$, $CD = ${trp.lengthCD}$, а её площадь равна $${trp.area()}$. Найдите площадь треугольника $ADC$.`,
			answers: trian.area(),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
// https://oge.sdamgia.ru/problem?id=351634
