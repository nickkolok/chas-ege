(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '11532';
		let preference = ['area', 'side'];

		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let rhombus = new Rhombus({
			length: sl(1, 50) * Math.sqrt(3),
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
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);

		};

		NAtask.setTask({
			text: ``,
			questions: [
				[{
					text: `Сторона ромба $${rhombus.lengthAB.pow(2).texsqrt(1)}$, одна из диагоналей равна $${rhombus.lengthDiagonalAC}$. Найдите площадь ромба`,
					answers: rhombus.area(),
				}, {
					text: `Одна из диагоналей ромба равна $${rhombus.lengthDiagonalAC}$, а его площадь равна $${rhombus.area().pow(2).texsqrt(1)}$. Найдите сторону ромба`,
					answers: rhombus.lengthAB,
				}][rand]
			],
			postquestion: `.`,
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.multiplyAnswerBySqrt(13);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=11532
// https://base.mathege.ru/clones/?position=16&parent=10121
