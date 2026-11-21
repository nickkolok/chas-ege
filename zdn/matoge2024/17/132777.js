(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(5, 20);
		let a = sl(5, 20);

		const trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: side,
				lengthCD: slKrome(a, 5, 20),
				lengthDA: side,
			},
		});
		
		let angleA = trp.angleAInDegrees.round();

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);
		};

		NAtask.setTask({
			text: `Сумма двух углов равнобедренной трапеции равна $${2*angleA}^\\circ$. Найдите ${[`больший`, `меньший`][Number(trp.angleAInDegrees>trp.angleDInDegrees)]} угол трапеции. Ответ дайте в градусах.`,
			answers: 180 - angleA,
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=132777
