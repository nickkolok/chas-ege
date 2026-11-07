(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '10915';
		let preference = ['findABD', 'findABC'];
		let reverse = getSelectedPreferenceFromList(key, preference);
		let letters = latbukv.slice(0, 4);

		let circle = new Circle(new Point(0, 0), 180);

		let A = sl(145, 205);
		let B = sl(235, 300);

		let AB = circle.chordByAngles(A, B, {
			angleInDegrees: true
		});

		let C = sl(-35, 35);
		let D = sl(60, 115);

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

		let angleABC = (A - C) / 2;
		let angleCAD = (D - C) / 2;
		let angleABD = (A - D) / 2;
		let givenAngle = reverse ? 'ABD' : 'ABC';
		let wantedAngle = reverse ? 'ABC' : 'ABD';

		NAtask.setTask({
			text: `Четырёхугольник $ABCD$ вписан в окружность. Угол ${givenAngle}$ равен ${reverse ? angleABD : angleABC}^\\circ$, угол $CAD$ равен $${angleCAD}^\\circ$. Найдите угол ${wantedAngle}$. Ответ дайте в градусах.`,
			answers: reverse ? angleABC : angleABD,
			preference,
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
// 63B321, 5A5BE2, CFA93A, CB8748, 78927F, 4407A7, 51BF93, C74767, 12C334, 546339, DB2C45, 7A7DD0, 66C150, 31FE56, 0140CF, 6B1594, 543585, 0DBAD3, B98255, 39461A
