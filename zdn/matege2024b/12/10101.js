(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3);

		let circle = new Circle(new Point(0, 0), sl(5, 50));

		let PA = circle.pointOnCircle(180, {
			angleInDegrees: true
		});

		let PB = circle.pointOnCircle(0, {
			angleInDegrees: true
		});

		let PC = circle.pointOnCircle(60, {
			angleInDegrees: true
		});

		let AC = PA.distanceTo(PC)[0];
		genAssertZ1000(AC.pow(2));
		genAssertZ1000(PB.distanceTo(PC)[0]);

		let connectionMatrix = [
			[1],
			[1, 1],
		];

		let points = [PA.vertices[0], PB.vertices[0], PC.vertices[0]];
		points = autoScale(points);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, points[1].x, 0, 2 * Math.PI);

			ctx.strokeStyle = om.primaryBrandColors[1];

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: ` На окружности радиуса $${circle.r}$ отмечена точка $C$. Отрезок АВ – диаметр окружности, $AC = ${AC.pow(2).texsqrt(1)}$. Найдите $BC$.`,
			answers: PB.distanceTo(PC)[0],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10101
