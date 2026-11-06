(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rhombus = new Rhombus({
			length: 100,
			angles: {
				angle: {
					angleA: slKrome(90, 30, 150)
				},
				angleInDegree: true,
			},
		});

		let points = autoScale(rhombus.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);
			ctx.rotate(-rhombus.angleAInRadians / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);
		};

		NAtask.setTask({
			text: ` Один из углов ромба равен $${rhombus.angleAInDegrees}^\\circ$. Найдите ${rhombus.angleAInDegrees < rhombus.angleBInDegrees ? 'больший' : 'меньший'} угол этого ромба. Ответ дайте в градусах.`,
			answers: rhombus.angleBInDegrees,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356893
