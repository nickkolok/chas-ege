(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3).concat(['K', 'M']);
		let rand = sl1();

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(2, 10),
				lengthCA: sl(2, 10),
			},
			supplementary: {
				calculateMedians: true
			}
		});
		
		genAssertZ1000(triangle.area());

		let relation = [sl(1, 5), sl(6, 10)].shuffle();

		let pointK = [triangle.pointA[0], triangle.pointC[0]].mt_segmentDivisionPoint(relation[0], relation[1]);
		genAssert((pointK.y - triangle.pointA[0].y).abs() > 1, 'Точки M и A слились');
		genAssert((pointK.y - triangle.pointC[0].y).abs() > 1, 'Точки M и C слились');

		let triangleSmall = new Triangle({
			points: [pointK, triangle.medianCEndPoint, triangle.pointA[0]]
		});
		
		genAssertZ1000(triangleSmall.area());

		triangle.addVertexToConnectionMatrix([pointK, triangle.medianCEndPoint], ['E', 'C']);
		triangle.connectVerticesInConnectionMatrix([3, 4]);

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
			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[4].x, points[4].y, 7);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[4].x, points[4].y, 7);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2 && i != 3) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ проведена медиана $CM$, на стороне $AC$ взята точка $K$ так, что $${[`A`,`C`][rand]}K = ${relation[rand].texfrac(relation.sum())} AC$.
			Площадь треугольника $AMK$ равна $${triangleSmall.area()}$. Найдите площадь треугольника $ABC$`,
			answers: triangle.area(),
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
// https://base.mathege.ru/clones/?position=16&parent=10168
