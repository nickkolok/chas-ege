(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '369835';
		let preference = ['radius', 'side'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Данная величина (сторона или радиус) равна k√2; квадрат её — целое 2k², поэтому
		// texsqrt выносит множитель из-под корня точно. Ответ: радиус k или сторона 2k.
		let k = sl(1, 40);
		// Окружность чертежа — фиксированного радиуса: чертёж от k не зависит
		let circle = new Circle(new Point(0, 0), 170);
		// Квадрат переходит в себя при повороте на 90°, поэтому хватает поворотов от 10° до 80°.
		// При rotate = 0 квадрат стоит «ромбиком», при rotate = 45° его стороны параллельны осям;
		// поворот на несколько градусов от этих положений выглядит как криво нарисованный квадрат,
		// поэтому исключаются 0…10°, 80…90° и 35…55°
		let rotate = slKrome((x) => (x - 45).abs() <= 10, 11, 79);

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

		let points = [AB.ps, AB.pe, CD.ps, CD.pe];

		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			circle.drawOnto(ctx);
		};

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
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
// https://oge.sdamgia.ru/problem?id=369835
