(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "356180";
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

		let leftOrRightAngle = getListedPreference(key, [{
			preference: 'left',
			preferenceValue: 0,
		}, {
			preference: 'right',
			preferenceValue: 1,
		},], sl1());

		const offset = leftOrRightAngle === 0 ? 1 : 2;

		let letters = latbukv.slice(0, 4);
		let angleDano = [
			letters[variant],
			letters[(variant + offset) % 3],
			letters[(variant + 3 - offset) % 3]
		];

		const angleQuestion = [
			letters[(variant + offset) % 3],
			letters[variant],
			letters[3]
		];

		let centralAngle = angleDano.slice().splice(0, 1)[0];

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(5, 10),
				lengthCA: sl(5, 10),
			},
			supplementary: {
				calculateHeights: true,
			}
		});
		genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
			'Все стороны треугольника должны быть разными');

		[triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees].forEach(angle => genAssert(angle < 80, 'Треугольник не остроугольный'));

		let valueAngle = [triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees][variant].ceil();
		triangle.addVertex([triangle.heightEndPointA, triangle.heightEndPointB, triangle.heightEndPointC][variant], ['A', 'B', 'C'][variant]);

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
			ctx.arcBetweenSegments([pointCentralAngle.x, pointCentralAngle.y, points[3].x, points[3].y, pointsAngle[0].x, pointsAngle[0].y], 15, true);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В остроугольном треугольнике $ABC$ проведена высота $${[centralAngle, letters[3]].shuffleJoin()}$, 
			$\\angle ${angleDano.randomReverse().join('')} = ${valueAngle}^{\\circ}$. 
			Найдите угол $${angleQuestion.randomReverse().join('')}$. Ответ дайте в градусах.`,
			answers: 90 - valueAngle,
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
// 356180 383606 356181 356182 356183 356184 356185 356186 356187 356188 356189 401251 401509 402121 402815 403115 403192 403361 403745 403976 404003
