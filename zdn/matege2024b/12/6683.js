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

		// Ромб слева, квадрат справа, зазор между ними пропорционален стороне;
		// вся композиция — по центру холста (shiftCoordinate3D вычитает сдвиг, а не прибавляет)
		let side = square.lengthAB;
		let rhombusWidth = Math.max(...rhombus.vertices.map((ver) => ver.x)) - Math.min(...rhombus.vertices.map((ver) => ver.x));
		let gap = 0.4 * side;
		let totalWidth = rhombusWidth + gap + side;
		let rhombusP = rhombus.vertices.map((ver) => shiftCoordinate3D(ver, {
			x: totalWidth / 2 - rhombusWidth / 2
		}));
		let squareP = square.vertices.map((ver) => shiftCoordinate3D(ver, {
			x: -(totalWidth / 2 - side / 2)
		}));

		let points = rhombusP.concat(squareP);

		let connectionMatrix = [
			[1],
			[0, 1],
			[1, 0, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 1, 0, 1],
		];

		points = autoScale(points);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			// Прямой угол квадрата, как на чертеже ФИПИ
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[7].x, points[7].y, points[4].x, points[4].y, points[5].x, points[5].y], 15, true);

		};

		NAtask.setTask({
			text: `Ромб и квадрат имеют ${[`равные`, `одинаковые`].iz()} стороны. Найдите площадь ромба, если его острый угол равен $30^\\circ$, а площадь квадрата равна $${squareArea}$.`,
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
