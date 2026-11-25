(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(4, 100);
		// Основание бывает и с корнем из 3: AB = 12√3 (D7BD68), тогда синус равен 0,5.
		// Такой вариант выбирается в каждой четвёртой попытке, и в итоге он примерно у каждой
		// пятой задачи, как в ФИПИ (одно задание из пяти)
		let baseRadicand = sl(1, 4) == 1 ? 3 : 1;
		let baseFactor = sl(4, 120, 2);
		let baseSqr = baseFactor * baseFactor * baseRadicand;

		let letters = latbukv.slice(0, 3);

		let triangle = new Triangle({
			lengths: {
				lengthAB: baseSqr.sqrt(),
				lengthBC: side,
				lengthCA: side,
			},
		});

		genAssertDecimalPlaces(triangle.sinA, 2, 'sinA треугольника не целый');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.signVertices(points, letters, {above: [2]});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ известно, что $BC=CA=${triangle.lengthBC}$, $AB=${baseSqr.texsqrt(1)}$. Найдите синус угла $${['CAB', 'ABC'].iz()}$.`,
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
	}, 10000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10136

