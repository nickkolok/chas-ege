(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '512423';
		let preference = ['small_diagonal', 'perimeter'];

		let rand = getSelectedPreferenceFromList(key, preference)

		let rhombus = new Rhombus({
			length: sl(1, 50),
			angles: {
				angle: {
					angleA: 60,
				},
				angleInDegree: true,
			},
		});

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
			text: `Сумма двух углов ромба равна $${[`120`, `240`].iz()}^\\circ$, а его `,
			questions: [
				[{
					text: `меньшая диагональ равна $${rhombus.lengthDiagonalBD}$. ${decor.orderToFind.iz().toZagl()} периметр`,
					answers: rhombus.perimeter,
				}, {
					text: `периметр равен $${rhombus.perimeter}$. ${decor.orderToFind.iz().toZagl()} длину меньшей диагонали`,
					answers: rhombus.lengthDiagonalBD,
				}][rand]
			],
			postquestion: ` ромба.`,
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=512423
// https://mathb-ege.sdamgia.ru/problem?id=518610
