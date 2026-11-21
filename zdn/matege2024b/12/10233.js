(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let circle = new Circle(new Point(0, 0), 170);

		let A = sl(0, 360);
		let PA = circle.pointOnCircle(A, {
			angleInDegrees: true
		});

		let offset = sl(10, 150).pm();
		let angle = offset.abs();
		let B = (A + offset) % 360;
		let PB = circle.pointOnCircle(B, {
			angleInDegrees: true
		});

		let length = sl(10, 100);
		let smallLength = length * angle / 360;
		genAssertZ1000(smallLength);

		let connectionMatrix = [
			[1],
			[1],
		];

		let points = [circle.pc, PA.vertices[0], PB.vertices[0]];

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, 170, 0, 2 * Math.PI);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText([`O`, `A`, `B`][i], elem.x, -elem.y + 25));
		};

		NAtask.setTask({
			text: `На окружности с центром $O$ отмечены точки $A$ и $B$ так, что $\\angle AOB=${angle}^\\circ$. Длина меньшей дуги $AB$ равна $${smallLength}$. Найдите длину большей дуги.`,
			answers: length - smallLength,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10233
