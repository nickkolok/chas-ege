(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		let circle = new Circle(new Point(0, 0), 180);

		let A = slKrome(180, 136, 224);
		let B = slKrome(270, 226, 314);

		let AB = circle.chordByAngles(A, B, {
			angleInDegrees: true
		});

		let C = sl(1, 45).pm();
		let D = sl(45, 134);

		let CD = circle.chordByAngles(C, D, {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[1],
			[1, 1],
			[1, 1, 1],
		];

		let points = [AB.ps, AB.pe, CD.ps, CD.pe];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, 180, 0, 2 * Math.PI);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 3) ? 20 : -5)));
		};

		NAtask.setTask({
			text: `Четырёхугольник $ABCD$ вписан в окружность. Угол $ABC$ равен $${0.5*(A-C)}^\\circ$, угол $CAD$ равен $${0.5*(D-C)}^\\circ$. Найдите угол $ABD$. Ответ дайте в градусах.`,
			answers: 0.5 * (A - D),
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
// https://base.mathege.ru/clones/?position=16&parent=10915

