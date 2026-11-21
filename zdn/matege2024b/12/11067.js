(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '11067';
		let preference = ['height', 'hypotenuse'];

		let rand = getSelectedPreferenceFromList(key, preference);

		let a = sl(1, 50);

		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 1, 50),
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000(triangle.heightBLength);

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);
		};

		NAtask.setTask({
			text: ``,
			questions: [[{
				text: `В прямоугольном треугольнике катеты равны $${triangle.lengthAB}$ и $${triangle.lengthBC}$. Найдите высоту, опущенную на гипотенузу.`,
				answers: triangle.heightBLength,
			},{
				text: `Площадь прямоугольного треугольника равна $${triangle.area()}$. Один из катетов равен $${[triangle.lengthAB, triangle.lengthBC].iz()}$. Найдите гипотенузу этого треугольника.`,
				answers: triangle.lengthCA,
			}][rand]],
			authors: ['Александра Суматохина'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11067
// https://base.mathege.ru/clones/?position=16&parent=10983
