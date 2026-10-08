(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 2).concat(`O`);
		let circle = new Circle(new Point(0, 0), 170);

		let A = sl(0, 360);
		let PA = circle.pointOnCircle(A, {
			angleInDegrees: true
		});

		let B = (A + sl(10, 150).pm()) % 360;
		let PB = circle.pointOnCircle(B, {
			angleInDegrees: true
		});

		let length = sl(10, 100);
		let smallLength = length * (A - B).abs() / 360;
		genAssertZ1000(smallLength);

		let connectionMatrix = [
			[1],
			[1],
		];

		let points = [circle.pc, PA.vertices[0], PB.vertices[0]];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, 170, 0, 2 * Math.PI);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText([`O`, `A`, `B`][i], elem.x, -elem.y + 25));
		};

		NAtask.setTask({
			text: `На окружности с центром $O$ отмечены точки $A$ и $B$ так, что $\\angle AOB=${(A-B).abs()}^\\circ$. Длина меньшей дуги $AB$ равна $${smallLength}$. Найдите длину большей дуги.`,
			answers: length - smallLength,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10233
