(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3);

		let angleB = Math.PI / [6, 3].iz();
		let AC = sl(1,50);
		let sinB = angleB.sin();
		let sinA = {n:sl(1,6), d:sl(7,10)};

		let triangle = new Triangle({
			lengths: {
				lengthCA: AC,
				lengthBC: (sinA.n*AC)/(sinB*sinA.d),
			},
			angles: {
				angle: Math.PI - angleB - (sinA.n/sinA.d).asin(),
			},
		});

		genAssertZ1000(triangle.sinA.pow(2));
		genAssert((triangle.sinA-0.5).abs()>0.1, 'Задача теряет смысл с sinA=1/2');
		genAssertZ1000(triangle.lengthBC.pow(2));

		let a = triangle.vertices[0];
		let b = triangle.vertices[1];
		let extension = [a, b].mt_vectorDivisionPoint(3, -1); // точка на продолжении AB за B: AP:PB = 3:(-1)
		triangle.addVertexToConnectionMatrix(extension, 'B');
		let points = autoScale(triangle.vertices);
		let rayEnd = points[3];

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, rayEnd.x, rayEnd.y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.slice(0, letters.length).forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ известно, что $BC=${triangle.lengthBC.pow(2).texsqrtfrac(1)}$, $\\sin A=${triangle.sinA.pow(2).texsqrtfrac(1)}$, внешний угол при вершине $B$ равен $${180 - triangle.angleBInDegrees}^\\circ$. Найдите $AC$.`,
			answers: triangle.lengthCA,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10188
