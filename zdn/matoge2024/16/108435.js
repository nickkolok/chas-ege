(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();

		let letters = latbukv.slice(0, 4).concat([``, ``, `O`]);

		let circle = new Circle(new Point(0, 0), sl(10, 50));

		let AB = circle.chordByAngles(60, 120, {
			angleInDegrees: true
		});

		let diam = circle.diameter(0);

		let connectionMatrix = [
			[1],
			[0, 1],
			[1, 0],
			[0],
			[0, 0, 0, 0, 1]
		];

		let points = autoScale([AB.ps, AB.pe, {
			x: AB.pe.x,
			y: 0
		}, {
			x: AB.ps.x,
			y: 0
		}, diam.ps, diam.pe, circle.pc]);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, new Point(0, 0).distanceTo(new Point(points[0].x, points[0].y))[0], 0, 2 * Math.PI);
			ctx.fillKrug(0, 0, 2);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 1) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `Точка $O$ является серединой стороны $CD$ квадрата $ABCD$. Радиус окружности с центром в точке $O$, проходящей через вершину $${[`A`, `B`].iz()}$, равен $${circle.r}$. Найдите площадь квадрата $ABCD$.`,
			answers: circle.r.pow(2)*0.8,
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
// https://3.shkolkovo.online/catalog/2521/108435
