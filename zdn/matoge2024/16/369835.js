(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '356518';
		let preference = ['radius', 'side'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let circle = new Circle(new Point(0, 0), sl(1, 20) * [1, (2).sqrt()][rand]);
		let rotate = sl(0, 100).pm();

		let AB = circle.chordByAngles(90 + rotate, 180 + rotate, {
			angleInDegrees: true
		});

		let CD = circle.chordByAngles(270 + rotate, 360 + rotate, {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[1],
			[0, 1],
			[1, 0, 1],
		];

		let points = autoScale([AB.ps, AB.pe, CD.ps, CD.pe]);
		var radius = new Point(points[0].x, points[0].y).distanceTo(new Point(points[2].x, points[2].y))[0] / 2;

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			ctx.drawArc(0, 0, radius, 0, 2 * Math.PI);
		};

		genAssert(radius < 200, 'Окружность вышла за границы спрайта');

		NAtask.setTask({
			text: ``,
			questions: [
				[{
					text: `Сторона квадрата равна $${AB.length.pow(2).texsqrt(1)}$. Найдите радиус окружности, описанной около этого квадрата.`,
					answers: circle.r
				}, {
					text: `Радиус окружности, описанной около квадрата, равен $${circle.r.pow(2).texsqrt(1)}$. Найдите длину стороны этого квадрата.`,
					answers: AB.length
				}][rand]
			],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://oge.sdamgia.ru/problem?id=369835
