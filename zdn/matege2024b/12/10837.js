(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		let circle = new Circle(new Point(0, 0), 180);

		let AB = circle.diameter(0, {
			angleInDegrees: true
		});

		let D = sl(30, 160);
		let C = -slKrome(D, 30, 160);

		let CD = circle.chordByAngles(C, D, {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[1],
			[0, 1],
			[0, 1, 1],
		];

		let points = [AB.pe, AB.ps, CD.ps, CD.pe];

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
			text: `На окружности по разные стороны от диаметра $AB$ отмечены точки $D$ и $C$. Известно, что $DBA = ${0.5*(180-D)}^\\circ$ . Найдите угол $DCB$. Ответ дайте в градусах.`,
			answers: D / 2,
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
// https://base.mathege.ru/clones/?position=16&parent=10837
