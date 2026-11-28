(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '348610';
		let preference = ['A', 'B', 'C']; // из какой вершины проведена биссектриса
		let variant = getSelectedPreferenceFromList(key, preference);

		let letters = om.latbukv.slice(0, 4);
		let angleGiven = letters.slice(0, 3);
		let centralAngle = angleGiven.splice(variant, 1)[0];
		let angleFind = [angleGiven.iz(), centralAngle, letters[3]].randomReverse().join('');
		angleGiven.splice(1, 0, centralAngle);

		let angleA = sl(20, 80);
		let angleB = sl(20, 80);
		let angleC = 180 - angleA - angleB;
		let triangle = new Triangle({
			lengths: {
				lengthAB: 10 * Math.sin(angleC * Math.PI / 180),
				lengthBC: 10 * Math.sin(angleA * Math.PI / 180),
			},
			angles: {
				angle: angleB,
				angleInDegree: true
			},
			supplementary: {
				calculateBisectors: true,
			}
		});
		genAssert(!triangle.isIsosceles(), 'Все стороны треугольника должны быть разными');

		let valueAngle = [angleA, angleB, angleC][variant];
		triangle.addVertexToConnectionMatrix(Object.values(triangle.bisectorEndPoints)[variant], ['A', 'B', 'C'][variant]);

		// Поле чуть уже холста, чтобы подписи вершин не обрезались у края
		let points = autoScale(triangle.vertices, undefined, [], {
			startX: -165,
			finishX: 165,
			startY: -160,
			finishY: 160,
		});

		let pointsAngle = points.slice(0, 3);
		let pointCentralAngle = pointsAngle.splice(variant, 1)[0];

		let paint1 = function (ctx) {
			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			pointsAngle.forEach(p => ctx.arcBetweenSegments([p.x, p.y, pointCentralAngle.x, pointCentralAngle.y, points[3].x, points[3].y], 30));

			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			// Подписи вершин — наружу от центра треугольника,
			// подпись основания биссектрисы — за стороной, на продолжении биссектрисы
			let center = {
				x: (points[0].x + points[1].x + points[2].x) / 3,
				y: (points[0].y + points[1].y + points[2].y) / 3,
			};
			points.forEach((elem, i) => {
				let from = (i < 3) ? center : pointCentralAngle;
				let label = labelPositionAwayFrom(elem, from, 18);
				ctx.fillText(letters[i], label.x, -label.y);
			});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ известно, что $\\angle ${angleGiven.randomReverse().join('')} = ${valueAngle}^{\\circ}$, $${centralAngle + letters[3]}$ — биссектриса. Найдите угол $${angleFind}$. Ответ дайте в градусах.`,
			answers: valueAngle / 2,
			preference: [preference],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//348610 349879 353494 348774 349409 350310 350338 350828 351790 351886 352063 355412 355438 369503 369535 369681 369711 355386 401238 401667 402010 402313 402335 402674 403250 403298 403422 404277 404335
