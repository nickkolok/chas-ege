(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4);

		let side = sl(1, 7);
		let trp = new Trapezoid({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: side,
				lengthCD: sl(2, 4),
				lengthDA: side,
			}
		});

		trp.connectVerticesInConnectionMatrix([
			[1, 3],
		]);

		let angleDBA = new Angle(trp.pointD, trp.pointB, trp.pointA).angleInDegrees.ceil();
		let angleDBC = new Angle(trp.pointD, trp.pointB, trp.pointC).angleInDegrees.ceil();

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В трапеции $ABCD$ известно, что $DA=BC$, $\\angle DBA=${angleDBA}^{\\circ}$ и $\\angle DBC = ${angleDBC}^{\\circ}$. Найдите угол $ADB$. Ответ дайте в градусах.`,
			answers: 180 - 2 * angleDBA - angleDBC,
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
// https://mathb-ege.sdamgia.ru/problem?id=510126
