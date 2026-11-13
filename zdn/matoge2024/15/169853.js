(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Сторона и высота к ней задаются напрямую (как в ФИПИ — целые числа);
		// ограничение на их отношение — только ради читаемого чертежа
		let side = sl(2, 40);
		let height = sl(2, 40);
		genAssert(height.mzhd(side / 5, side * 4), 'Высота несоразмерна стороне — плохой чертёж');

		// Сторона горизонтальна, вершина — над ней на высоте height,
		// основание высоты — внутри стороны (на 15…85% её длины)
		let foot = side * sl(15, 85) / 100 - side / 2;
		let apex = { x: foot, y: height / 2 };
		// Вершины: два конца стороны, вершина над ней и основание высоты
		// (букв на чертеже нет, поэтому порядок вершин ни на что не влияет)
		let vertices = [
			{ x: -side / 2, y: -height / 2 },
			{ x: side / 2, y: -height / 2 },
			apex,
			{ x: foot, y: -height / 2 },
		];

		let connectionMatrix = [
			[1],
			[1, 1],
			[0, 0, 1],
		];

		let points = autoScale(vertices);

		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[3].x, points[3].y, points[0].x, points[0].y], 15, true);
		};

		NAtask.setTask({
			text: `Сторона треугольника равна $${side}$, а высота, проведённая к этой стороне, равна $${height}$. Найдите площадь этого треугольника.`,
			answers: side * height / 2,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(/*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
})();
//169853 349889 349907 350059 350178 350704 350773 350912 351364 351999 352436 436856 193883 193913 193943 193973 402020 402032 402133 402221 402596 402644 402734 403003 403372 403645

