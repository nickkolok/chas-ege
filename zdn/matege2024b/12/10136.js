(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(4, 60);

		let letters = latbukv.slice(0, 3);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(4, 60, 2),
				lengthBC: side,
				lengthCA: side,
			},
		});

		genAssert((triangle.sinA * 100).isAlmostInteger(), 'sinA треугольника не целый');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ известно, что $BC=CA=${triangle.lengthBC}$, $AB=${triangle.lengthAB}$. Найдите синус угла $${['CAB', 'ABC'].iz()}$.`,
			answers: triangle.sinA,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10136
