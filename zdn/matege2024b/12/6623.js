(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);
		let angleDano = letters.slice(0, 3);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(5, 10),
			},
			angles: {
				angle: sl(30, 80),
				angleInDegree: true
			},
			supplementary: {
				calculateBisectors: true,
			}
		});

		let angleA = triangle.angleAInDegrees.ceil();
		let angleB = triangle.angleBInDegrees.ceil();
		let angleC = 180 - angleA - angleB;

		triangle.addVertexToConnectionMatrix(triangle.bisectorAEndPoint, 'A');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[0].x, points[0].y, points[3].x, points[3].y], 30);
			ctx.arcBetweenSegments([points[1].x, points[1].y, points[0].x, points[0].y, points[3].x, points[3].y], 35);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ проведена биссектриса $AD$, угол $ADC$ равен $${180 - angleA/2 - angleC}^\\circ$, 
			угол $ABC$ равен $${angleB}^\\circ$. Найдите угол $ACB$. Ответ дайте в градусах.`,
			answers: angleC,
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
//https://base.mathege.ru/clones/?position=16&parent=6623
