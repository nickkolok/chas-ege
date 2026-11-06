(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '369835';
		let preference = ['radius', 'side'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Данная величина (сторона или радиус) равна k√2; квадрат её — целое 2k², поэтому
		// texsqrt выносит множитель из-под корня точно. Ответ: радиус k или сторона 2k.
		let k = sl(1, 40);
		let circle = new Circle(new Point(0, 0), k * [1, (2).sqrt()][rand]);
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
		// Описанная окружность на чертеже: центр — середина диагонали, проходит через вершину
		let center = new Point((points[0].x + points[2].x) / 2, (points[0].y + points[2].y) / 2);
		let radius = center.distanceTo(new Point(points[0].x, points[0].y))[0];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			ctx.drawCircle(center.x, center.y, radius);
		};

		genAssert(radius < 200, 'Окружность вышла за границы спрайта');

		NAtask.setTask({
			text: ``,
			questions: [
				[{
					text: `Сторона квадрата равна $${(2 * k * k).texsqrt(1)}$. Найдите радиус окружности, описанной около этого квадрата.`,
					answers: k
				}, {
					text: `Радиус окружности, описанной около квадрата, равен $${(2 * k * k).texsqrt(1)}$. Найдите длину стороны этого квадрата.`,
					answers: 2 * k
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference,
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
