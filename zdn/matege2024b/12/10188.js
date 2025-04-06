(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3).concat('H');

		let a = sl(1, 50);
		let triangle = new Triangle({
			lengths: {
				lengthCA: a,
				lengthBC: slKrome(a, 1, 50),
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		genAssertZ1000(triangle.sinA.pow(2));
		genAssert((triangle.sinB - (0.75).sqrt()).abs() < 0.1 || (triangle.sinB - 0.5).abs() < 0.1, 'Угол B не равен 30');

		let points = autoScale(triangle.vertices, {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
		}, triangle.vertices, {
			startX: -180,
			finishX: 120,
			startY: -160,
			finishY: 160,
			step: 0.1,
			maxScale: 100
		});

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);
			ctx.drawLine(points[1].x, points[1].y, 160, points[1].y);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, 160, points[1].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: ` В треугольнике $ABC$ известно, что $BC=${triangle.lengthAB.pow(2).texsqrt(1)}$, $\\sin A=${triangle.sinA.pow(2).texsqrtfrac(1)}$, внешний угол при вершине $B$ равен $${[`150 `, `120 `][(triangle.sinB - 0.5).abs() < 0.1? 0: 1]}^\\circ$. Найдите $AC$.`,
			answers: triangle.lengthCA,
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
// https://base.mathege.ru/clones/?position=16&parent=10188
