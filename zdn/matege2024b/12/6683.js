(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rhombus = new Rhombus({
			length: sl(1, 50),
			angles: {
				angle: {
					angleA: Math.PI / 6,
				},
			},
		});

		let square = new Square({
			length: rhombus.lengthAB
		});

		let rhombusP = rhombus.vertices.map((ver) => shiftCoordinate3D(ver, {
			x: square.lengthAB + 1
		}));
		let squareP = square.vertices.map((ver) => shiftCoordinate3D(ver, {
			x: -square.lengthAB + 1
		}));

		let vertex = rhombusP.concat(squareP);

		let connectM = [
			[1],
			[0, 1],
			[1, 0, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 1, 0, 1],
		];

		vertex = autoScale(vertex);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(vertex, connectM);

		};

		NAtask.setTask({
			text: `Ромб и квадрат имеют равные стороны. Найдите площадь ромба, если его острый угол равен $30^\\circ$, а площадь квадрата равна $${square.area()}$.`,
			answers: rhombus.area(),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.multiplyAnswerBySqrt(13);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=6683
