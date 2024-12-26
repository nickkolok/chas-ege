(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "348610";
		let variant = getListedPreference(key, [{
			preference: 'A',
			preferenceValue: 0,
		}, {
			preference: 'B',
			preferenceValue: 1,
		}, {
			preference: 'C',
			preferenceValue: 2,
		}], sl(0, 2));
		
		let letters = latbukv.slice(0, 4);
		let angleDano = letters.slice(0, 3);
		let centralAngle = angleDano.splice(variant, 1)[0];
		let angleFind = [angleDano.iz(), centralAngle, letters[3]].randomReverse().join('');
		angleDano.splice(1, 0, centralAngle);
		
		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(5, 10),
			},
			angles: {
				angle: sl(30, 80),
				angleInDegree: true
			},
			supplementary: {
				calculateBisectors: true,
			}
		});
		genAssert(![triangle.lengthAB.round(), triangle.lengthBC.round(), triangle.lengthCA.round()].hasDubl(), 'Все стороны треугольника должны быть разными');

		let valueAngle = [triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees][variant];
		triangle.addVertex([triangle.bisectorEndPointA, triangle.bisectorEndPointB, triangle.bisectorEndPointC][variant], ['A', 'B', 'C'][variant]);

		let points = autoScale(triangle.vertices);

		let pointsAngle = points.slice(0, 3);
		let pointCentralAngle = pointsAngle.splice(variant, 1)[0];

		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([pointsAngle[0].x, pointsAngle[0].y, pointCentralAngle.x, pointCentralAngle.y, points[3].x, points[3].y], 30);
			ctx.arcBetweenSegments([pointsAngle[1].x, pointsAngle[1].y, pointCentralAngle.x, pointCentralAngle.y, points[3].x, points[3].y], 35);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ известно, что $${angleDano.randomReverse().join('')} = ${valueAngle.ceil()}^{\\circ}$, $${centralAngle + letters[3]}$ – биссектриса. 
			Найдите угол $${angleFind}$. Ответ дайте в градусах.`,
			answers: valueAngle.ceil() / 2,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//348610 349879 353494 348774 349409 350310 350338 350828 351790 351886 352063 355412 355438 369503 369535 369681 369711 355386 401238 401667 402010 402313 402335 402674 403250 403298 403422 404277 404335
