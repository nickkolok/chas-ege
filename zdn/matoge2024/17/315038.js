(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 4);

		let key = '315038';
		let preference1 = ['AC', 'BD']; // какая диагональ
		let preference2 = ['bigger', 'smaller']; // какой угол параллелограмма найти
		let randDiagonal = getSelectedPreferenceFromList(key, preference1);
		let randFind = getSelectedPreferenceFromList(key, preference2);

		// Диагональ выходит из вершины V (A для AC, B для BD) и делит угол при ней на α и β.
		// Угол параллелограмма при V равен α + β; около 90° — запрещено (не видно, острый он или тупой).
		let alpha = sl(10, 85);
		let beta = sl(10, 85);
		let angleV = alpha + beta;
		genAssert((angleV - 90).abs() > 4, 'Угол параллелограмма слишком близок к прямому');
		genAssert(angleV <= 160, 'Слишком плоский параллелограмм');

		let angleSmaller = Math.min(angleV, 180 - angleV);
		let angleBigger = 180 - angleSmaller;

		// Стороны из вершины V: первая — вдоль оси x, вторая — под углом α + β.
		// По теореме синусов (треугольник из двух сторон и диагонали) отношение сторон sin β : sin α,
		// тогда диагональ образует с первой стороной угол α, со второй — β.
		let angleVRad = angleV * Math.PI / 180;
		let side1 = { x: Math.sin(beta * Math.PI / 180), y: 0 };
		let side2 = { x: Math.sin(alpha * Math.PI / 180) * Math.cos(angleVRad), y: Math.sin(alpha * Math.PI / 180) * Math.sin(angleVRad) };
		let pV = { x: 0, y: 0 };
		let pS1 = side1;
		let pOpposite = { x: side1.x + side2.x, y: side1.y + side2.y };
		let pS2 = side2;

		// Вершины A, B, C, D по порядку обхода; диагональ — из V в противоположную вершину
		let vertices = randDiagonal === 0 ?
			[pV, pS1, pOpposite, pS2] : // V = A: AB — первая сторона, AD — вторая, диагональ AC
			[pS1, pV, pS2, pOpposite]; // V = B: BA — первая сторона, BC — вторая, диагональ BD
		let indexV = randDiagonal;
		let indexOpposite = randDiagonal + 2;

		// Центрируем по габаритам и уменьшаем: autoScale масштабирует относительно начала координат
		let xs = vertices.map((p) => p.x);
		let ys = vertices.map((p) => p.y);
		let centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
		let centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
		let size = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
		let points = autoScale(vertices.map((p) => ({ x: (p.x - centerX) / size * 10, y: (p.y - centerY) / size * 10 })), undefined, [], {
			startX: -165, finishX: 165, startY: -150, finishY: 150,
		});

		let connectionMatrix = [
			[1],
			[0, 1],
			[1, 0, 1],
		];
		connectionMatrix[indexOpposite - 1][indexV] = 1;

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);

			// Углы между диагональю и сторонами
			let neighbours = [(indexV + 3) % 4, (indexV + 1) % 4];
			ctx.strokeStyle = om.primaryBrandColors.iz();
			neighbours.forEach((j, i) => ctx.arcBetweenSegments([
				points[j].x, points[j].y, points[indexV].x, points[indexV].y, points[indexOpposite].x, points[indexOpposite].y,
			], 25 + 6 * i));

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			// Подписи — снаружи: от центра через вершину
			points.forEach((elem, i) => {
				let len = Math.hypot(elem.x, elem.y);
				ctx.fillText(letters[i], elem.x + elem.x / len * 16, -(elem.y + elem.y / len * 16));
			});
		};

		let diagonal = [`AC`, `BD`][randDiagonal];
		NAtask.setTask({
			text: `Диагональ $${diagonal}$ параллелограмма $ABCD$ образует с его сторонами углы, равные $${[alpha, beta].shuffleJoin('^\\circ$ и $')}^\\circ$. Найдите ${[`больший`, `меньший`][randFind]} угол этого параллелограмма. Ответ дайте в градусах.`,
			answers: [angleBigger, angleSmaller][randFind],
			authors: ['Александра Суматохина'],
			preference: [preference1, preference2],
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
