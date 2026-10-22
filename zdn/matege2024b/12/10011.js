(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 3).concat(['M', 'K']);
		let rand = sl1();

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(2, 10),
				lengthCA: sl(2, 10),
			},
		});

		let relation1 = [sl(1, 5), sl(6, 10)].shuffle();
		let relation2 = [sl(1, 5), sl(6, 10)].shuffle();

		let pointM = [triangle.pointA[0], triangle.pointC[0]].mt_segmentDivisionPoint(relation1[0], relation1[1]);
		genAssert((pointM.y - triangle.pointA[0].y).abs() > 1, 'Точки M и A слились');
		genAssert((pointM.y - triangle.pointC[0].y).abs() > 1, 'Точки M и C слились');

		let pointK = [triangle.pointB[0], triangle.pointC[0]].mt_segmentDivisionPoint(relation2[0], relation2[1]);
		genAssert((pointK.y - triangle.pointC[0].y).abs() > 1, 'Точки K и C слились');
		genAssert((pointK.y - triangle.pointB[0].y).abs() > 1, 'Точки K и B слились');

		let triangleSmall = new Triangle({
			points: [pointM, pointK, triangle.pointC[0]]
		});
		
		let answ = triangle.area()/triangleSmall.area();
		genAssertZ1000(answ);

		triangle.addVertexToConnectionMatrix([pointM, pointK], ['E', 'E']);

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

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ на сторонах $AC$ и $BC$ отмечены точки $M$ и $K$ соответственно так, 
			что $${[`A`, `C`][rand]}M:AC=${relation1[rand]}:${relation1.sum()}$, а $${[`B`, `C`][rand]}K:BC=${relation2[rand]}:${relation2.sum()}$. 
			Во сколько раз площадь треугольника $ABC$ больше площади треугольника $MCK$?`,
			answers: answ,
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
// https://base.mathege.ru/clones/?position=16&parent=10011
