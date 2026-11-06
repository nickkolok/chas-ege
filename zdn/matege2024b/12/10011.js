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

		// Точка делит сторону на части relation[0] и relation[1]; в условии — отношение части ко всей стороне.
		// Части взаимно просты, чтобы отношение было несократимым (в т. ч. 1:2 при равных частях 1 и 1)
		// В задачах ФИПИ на одной из сторон всегда середина (1:2) — часто так и здесь
		// (вероятность 1/3 до отбраковки; случайные пары отбраковываются чаще, поэтому итоговая доля выше)
		let relation1 = [[1, 1], [sl(1, 12), sl(1, 12)], [sl(1, 12), sl(1, 12)]].iz();
		let relation2 = [sl(1, 12), sl(1, 12)];
		genAssertIrreducible(relation1[0], relation1[1], 'Отношение на стороне AC сократимо');
		genAssertIrreducible(relation2[0], relation2[1], 'Отношение на стороне BC сократимо');
		// Меньшая часть — не меньше 1/14 стороны, чтобы точка не сливалась с вершиной на чертеже
		genAssert(relation1.sum() <= 14 && relation2.sum() <= 14, 'Точка слишком близко к вершине');

		let pointM = [triangle.pointA[0], triangle.pointC[0]].mt_segmentDivisionPoint(relation1[0], relation1[1]);
		let pointK = [triangle.pointB[0], triangle.pointC[0]].mt_segmentDivisionPoint(relation2[0], relation2[1]);

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
			text: `В треугольнике $ABC$ на сторонах $AC$ и $BC$ отмечены точки $M$ и $K$ соответственно так, ` +
				`что $${[`A`, `C`][rand]}M:AC=${relation1[rand]}:${relation1.sum()}$, а $${[`B`, `C`][rand]}K:BC=${relation2[rand]}:${relation2.sum()}$. ` +
				`Во сколько раз площадь треугольника $ABC$ больше площади треугольника $MCK$?`,
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
