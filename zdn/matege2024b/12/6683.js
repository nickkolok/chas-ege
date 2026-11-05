(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Площадь квадрата — полный квадрат (как в большинстве задач ФИПИ)
		// или любое целое число (в ФИПИ есть и 34); сторона нужна только для чертежа
		let squareArea = [sl(1, 50).sqr(), sl(1, 2500)].iz();
		let rhombus = new Rhombus({
			length: squareArea.sqrt(),
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
			text: `Ромб и квадрат имеют равные стороны. Найдите площадь ромба, если его острый угол равен $30^\\circ$, а площадь квадрата равна $${squareArea}$.`,
			answers: squareArea / 2,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=6683
