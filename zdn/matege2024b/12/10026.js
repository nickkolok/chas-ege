(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3);

		let a = sl(5, 25);
		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 5, 25),
			},
			angles: {
				angle: Math.PI / 2,
			},
		});

		genAssertZ1000(triangle.tgC);

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			let center = {x: points.reduce((a, p) => a + p.x, 0) / points.length, y: points.reduce((a, p) => a + p.y, 0) / points.length};
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			points.forEach((elem, i) => {
				let label = labelPositionAwayFrom(elem, center, 20);
				ctx.fillText(letters[i], label.x, -label.y);
			});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $B$ равен $90^\\circ$, $BC=${triangle.lengthBC}$. Площадь треугольника равна $${triangle.area()}$. Найдите $\\tg C$.`,
			answers: triangle.tgC,
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
// https://base.mathege.ru/clones/?position=16&parent=10026
