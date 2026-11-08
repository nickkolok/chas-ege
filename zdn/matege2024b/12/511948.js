(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4).concat(['M', 'K']);

		let par = new Parallelogram({
			lengths: {
				lengthAB: sl(1, 50),
				lengthBC: sl(1, 50),
			},
			angles: {
				angle: {
					angleA: Math.PI / [3, 3 / 2].iz(),
				},
			},
			supplementary: {
				calculateDiagonals: true,
			}
		});
		
		let answ = par.lengthDiagonalBD / 3;
		genAssertAlmostInteger(answ, 'Диагональ не целая');

		let middleCD = {
			x: par.pointD.x + par.lengthAB / 2,
			y: par.pointD.y
		};

		par.addVertexToConnectionMatrix(middleCD, 'A');

		par.connectVerticesInConnectionMatrix([1, 3]);

		let intersectPoint = [par.pointB, par.pointD, par.pointA, middleCD].mt_coordinatesOfIntersectionOfTwoSegments();
		par.addVertexToConnectionMatrix(intersectPoint, 'E');

		let points = autoScale(par.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.strokeInMiddleOfSegment(points[3].x, points[3].y, points[4].x, points[4].y, 7, 2);
			ctx.strokeInMiddleOfSegment(points[2].x, points[2].y, points[4].x, points[4].y, 7, 2);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ отмечена точка $M$ – середина стороны $DC$. Отрезки $BD$ и $AM$ пересекаются в точке $K$. Найдите длину отрезка $DK$, если $BD=${par.lengthDiagonalBD}$.`,
			answers: answ,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);

})();
// https://mathb-ege.sdamgia.ru/problem?id=511948
