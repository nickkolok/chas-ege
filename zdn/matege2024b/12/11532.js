(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '11532';
		let preference = ['area', 'side'];

		let rand = getSelectedPreferenceFromList(key, preference);

		let k = sl(1, 50);
		let rhombus = new Rhombus({
			length: k * Math.sqrt(3),
			angles: {
				angle: {
					angleA: Math.PI / 3,
				},
			},
		});

		genAssertZ1000(rhombus.area().pow(2) * 1000, 'Площадь не целая');

		rhombus.connectVerticesInConnectionMatrix([
			[0, 2],
			[1, 3]
		]);

		let points = autoScale(rhombus.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);

		};

		NAtask.setTask({
			text: ``,
			questions: [
				[{
					text: `Сторона ромба $${(3 * k * k).texsqrt(1)}$, одна из диагоналей равна $${rhombus.lengthDiagonalAC}$. Найдите площадь ромба`,
					answers: rhombus.area(),
				}, {
					text: `Одна из диагоналей ромба равна $${rhombus.lengthDiagonalAC}$, а его площадь равна $${(27 * k ** 4).texsqrtfrac(4)}$. Найдите сторону ромба`,
					answers: rhombus.lengthAB,
				}][rand]
			],
			postquestion: `.`,
			authors: ['Александра Суматохина'],
			preference: [preference],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=11532
// https://base.mathege.ru/clones/?position=16&parent=10121
