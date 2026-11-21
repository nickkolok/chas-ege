(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rhombus = new Rhombus({
			length: 100,
			angles: {
				angle: {
					angleA: slKrome((x) => (x - 90).abs() <= 5, 30, 150)
				},
				angleInDegree: true,
			},
		});

		let points = autoScale(rhombus.vertices);
		let rotateToDiagonal = sl1();

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			if (rotateToDiagonal) {
				ctx.rotate([rhombus.pointA, rhombus.pointB].mt_arctgUnakl());
			}

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);
		};

		NAtask.setTask({
			text: `Один из углов ромба равен $${rhombus.angleAInDegrees}^\\circ$. Найдите ${rhombus.angleAInDegrees < rhombus.angleBInDegrees ? 'больший' : 'меньший'} угол этого ромба. Ответ дайте в градусах.`,
			answers: rhombus.angleBInDegrees,
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356893
