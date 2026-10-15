(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4).concat('E');

		const rect = new Rectangle({
			lengths: {
				lengthAB: sl(7, 10),
				lengthBC: sl(2, 6)
			}
		});

		rect.addVertexToConnectionMatrix({
			x: rect.pointD.x + rect.lengthDA,
			y: rect.pointD.y
		}, 'E');

		let ED = [rect.vertices[1], rect.vertices[4]].mt_rasst();
		genAssert(ED.isAlmostInteger(), 'ED не целая');

		rect.connectVerticesInConnectionMatrix(
			[
				[0, 4],
				[1, 4]
			]
		);

		let points = autoScale(rect.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rect.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `На стороне $DC$ прямоугольника $ABCD$, у которого $AB=${rect.lengthAB}$ и $AD = ${rect.lengthDA}$ , отмечена точка $E$ так, что треугольник $ADE$ равнобедренный. Найдите $EB$.`,
			answers: ED,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=1845
