(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = om.latbukv.slice(0, 4);

		let key = '315038';
		let preference1 = ['AC', 'BD']; // какая диагональ
		let preference2 = ['bigger', 'smaller']; // какой угол параллелограмма найти
		let randDiagonal = getSelectedPreferenceFromList(key, preference1);
		let randFind = getSelectedPreferenceFromList(key, preference2);
		let preference3 = ['withoutAngleValues', 'withAngleValues'];
		let randAngleValues = getSelectedPreferenceFromList(key, preference3);

		// Диагональ выходит из вершины V (A для AC, B для BD) и делит угол при ней на α и β.
		// Угол параллелограмма при V равен α + β; около 90° — запрещено (не видно, острый он или тупой).
		let alpha = sl(10, 85);
		let beta = sl(10, 85);
		let angleV = alpha + beta;
		genAssert((angleV - 90).abs() > 5, 'Угол параллелограмма слишком близок к прямому');
		genAssert(angleV <= 160, 'Слишком плоский параллелограмм');

		let angleSmaller = Math.min(angleV, 180 - angleV);
		let angleBigger = 180 - angleSmaller;

		// Стороны из вершины V: первая — вдоль оси x, вторая — под углом α + β.
		// По теореме синусов (треугольник из двух сторон и диагонали) отношение сторон sin β : sin α,
		// тогда диагональ образует с первой стороной угол α, со второй — β.
		let par = new Parallelogram({
			lengths: {lengthAB: 10 * Math.sin(beta * Math.PI / 180), lengthBC: 10 * Math.sin(alpha * Math.PI / 180)},
			angles: {angle: {angleA: randDiagonal ? 180 - angleV : angleV}, angleInDegree: true},
		});
		let indexV = randDiagonal;
		let indexOpposite = randDiagonal + 2;
		par.connectVerticesInConnectionMatrix([indexV, indexOpposite]);
		let points = autoScale(par.vertices, undefined, [], {startX: -165, finishX: 165, startY: -150, finishY: 150, center: true});
		let connectionMatrix = par.connectionMatrix;

		let paint1 = function(ctx) {
			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			// Углы между диагональю и сторонами
			let neighbours = [(indexV + 3) % 4, (indexV + 1) % 4];
			ctx.strokeStyle = om.primaryBrandColors.iz();
			neighbours.forEach((j, i) => ctx.arcBetweenSegments([
				points[j].x, points[j].y, points[indexV].x, points[indexV].y, points[indexOpposite].x, points[indexOpposite].y,
			], 25 + 6 * i));

			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			if (randAngleValues) {
				// Порядок сторон соответствует углам alpha и beta при выбранной вершине.
				let first = randDiagonal == 0 ? 1 : 0;
				let second = randDiagonal == 0 ? 3 : 2;
				[first, second].forEach((j, i) => {
					let v = points[indexV];
					let d = points[indexOpposite];
					let side = points[j];
					let sideLength = [side, v].mt_rasst();
					let direction = new Angle(new Point(side.x, side.y), new Point(v.x, v.y), new Point(d.x, d.y)).bisectorVector;
					let radius = Math.min(sideLength * 0.6, 65 + i * 35);
					ctx.fillText([alpha, beta][i] + '°', v.x + direction.x * radius, -(v.y + direction.y * radius));
				});
			}
			// Подписи — снаружи: от центра через вершину
			points.forEach((elem, i) => {
				let label = labelPositionAwayFrom(elem, {x: 0, y: 0}, 16);
				ctx.fillText(letters[i], label.x, -label.y);
			});
		};

		let diagonal = preference1[randDiagonal];
		NAtask.setTask({
			text: `Диагональ $${diagonal}$ параллелограмма $ABCD$ образует с его сторонами углы, равные $${[alpha, beta].shuffleJoin('^\\circ$ и $')}^\\circ$. Найдите ${[`больший`, `меньший`][randFind]} угол этого параллелограмма. Ответ дайте в градусах.`,
			answers: [angleBigger, angleSmaller][randFind],
			authors: ['Александра Суматохина'],
			preference: [preference1, preference2, preference3],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// https://oge.sdamgia.ru/problem?id=315038
