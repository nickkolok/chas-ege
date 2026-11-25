(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let angleC = [30, 45, 60, 120, 135, 150].iz();
		let delta = 2 * angleC;

		let letters = om.latbukv.slice(0, 3);

		let circle = new Circle(new Point(0, 0), sl(10, 50));

		let startAngle = sl(-90, 0);
		let AB = circle.chordByAngles(startAngle, startAngle + delta, {
			angleInDegrees: true
		});

		let arcGap = 15; // минимальный угловой зазор между соседними вершинами
		let PC = circle.pointOnCircle(sl(startAngle + delta + arcGap, startAngle + 360 - arcGap), {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[1],
			[1, 1],
		];

		// Крайние точки окружности задают границы всего рисунка.
		let box = circle.box;
		let bounds = [new Point(box.xmin, box.ymin), new Point(box.xmax, box.ymax)];
		let scaled = autoScale([AB.ps, AB.pe, PC.vertices[0]].concat(bounds));
		let points = scaled.slice(0, 3);
		// autoScale возвращает обычные объекты; фабрика окружности принимает Point.
		let scaleCircle = CircleByPoints.fromCenterAndPoint(new Point((scaled[3].x + scaled[4].x) / 2, (scaled[3].y + scaled[4].y) / 2), new Point(points[2].x, points[2].y));

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			scaleCircle.drawOnto(ctx);

			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			points.forEach((point, i) => {
				let label = labelPositionAwayFrom(point, scaleCircle.pc, 20);
				ctx.fillText(letters[i], label.x, -label.y);
			});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $C$ равен $${angleC}^\\circ$, $AB=${AB.length.pow(2).round().texsqrt(1)}$. Найдите радиус окружности, описанной около этого треугольника.`,
			answers: circle.r,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// https://oge.sdamgia.ru/problem?id=450514
// https://ege.sdamgia.ru/problem?id=541815

