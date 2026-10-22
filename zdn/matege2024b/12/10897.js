(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let circle = new Circle(new Point(0, 0), 180);

		let A = sl(0, 110, 2);
		let PA = circle.pointOnCircle(A, {
			angleInDegrees: true
		});

		let B = sl(130, 230, 2);
		let PB = circle.pointOnCircle(B, {
			angleInDegrees: true
		});

		let C = sl(250, 350, 2);
		let PC = circle.pointOnCircle(C, {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[1],
			[1],
		];

		let points = [PA.vertices[0], PB.vertices[0], PC.vertices[0]];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, 180, 0, 2 * Math.PI);
		};

		NAtask.setTask({
			text: `Найдите вписанный угол, опирающийся на дугу, длина которой равна $${(B-C).abs().texfrac(360)}$ длины окружности. Ответ дайте в градусах.`,
			answers: (B - C).abs() / 2,
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
// https://base.mathege.ru/clones/?position=16&parent=10897
