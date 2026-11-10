(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = om.latbukv.slice(0, 3).concat(['M', 'K']);
		let rand = sl1();

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(2, 10),
				lengthCA: sl(2, 10),
			},
		});
		// Без почти плоских треугольников: на них точки M, K и подписи сливаются с вершинами
		genAssert(triangle.minAngleInDegrees() >= 25,
			'Слишком острый угол треугольника — плохой чертёж');

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

		// Треугольники ABC и MCK имеют общий угол C, поэтому отношение площадей равно (AC/MC)·(BC/KC);
		// MC и KC — части relation1[1] и relation2[1] (см. mt_segmentDivisionPoint)
		let answ = relation1.sum() / relation1[1] * relation2.sum() / relation2[1];
		genAssertZ1000(answ);

		triangle.addVertexToConnectionMatrix([pointM, pointK], ['E', 'E']);

		triangle.connectVerticesInConnectionMatrix([3, 4]);

		// Поле чуть уже холста, чтобы подписи не обрезались у края
		let points = autoScale(triangle.vertices, undefined, [], {
			startX: -165,
			finishX: 165,
			startY: -160,
			finishY: 160,
		});

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			// Подписи вершин — наружу от центра треугольника,
			// подписи точек M (на AC) и K (на BC) — наружу по нормали к своей стороне
			let center = {
				x: (points[0].x + points[1].x + points[2].x) / 3,
				y: (points[0].y + points[1].y + points[2].y) / 3,
			};
			let sideOf = { 3: [0, 2], 4: [1, 2] };
			points.forEach((elem, i) => {
				let label = sideOf[i] ?
					labelPositionOutsideSegment(elem, points[sideOf[i][0]], points[sideOf[i][1]], center, 18) :
					labelPositionAwayFrom(elem, center, 18);
				ctx.fillText(letters[i], label.x, -label.y);
			});
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
