(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = window.smallLatinLetters.iz(3);

		let coordVectorA = generateMatrix(1, 4, 1, 13).iz();
		let coordVectorB = generateMatrix(1, 4, 1, 13).iz();
		let coordVectorC = generateMatrix(1, 4, 1, 13).iz();

		genAssert(![{
			x: coordVectorA[0],
			y: coordVectorA[1]
		}, {
			x: coordVectorA[2],
			y: coordVectorA[3]
		}, {
			x: coordVectorB[0],
			y: coordVectorB[1]
		}, {
			x: coordVectorB[2],
			y: coordVectorB[3]
		}].mt_otrPeres(), 'Вектора A и B пересекаются');
		genAssert(![{
			x: coordVectorA[0],
			y: coordVectorA[1]
		}, {
			x: coordVectorA[2],
			y: coordVectorA[3]
		}, {
			x: coordVectorC[0],
			y: coordVectorC[1]
		}, {
			x: coordVectorC[2],
			y: coordVectorC[3]
		}].mt_otrPeres(), 'Вектора A и C пересекаются');
		genAssert(![{
			x: coordVectorB[0],
			y: coordVectorB[1]
		}, {
			x: coordVectorB[2],
			y: coordVectorB[3]
		}, {
			x: coordVectorC[0],
			y: coordVectorC[1]
		}, {
			x: coordVectorC[2],
			y: coordVectorC[3]
		}].mt_otrPeres(), 'Вектора B и C пересекаются');

		//Вычисление координат векторов
		let vectorA = math.matrix(math.subtract([coordVectorA[2], coordVectorA[3]], [coordVectorA[0], coordVectorA[1]]));
		let vectorB = math.matrix(math.subtract([coordVectorB[2], coordVectorB[3]], [coordVectorB[0], coordVectorB[1]]));
		let vectorC = math.matrix(math.subtract([coordVectorC[2], coordVectorC[3]], [coordVectorC[0], coordVectorC[1]]));

		let midA = coordinatesMiddleOfSegment(...coordVectorA);
		let midB = coordinatesMiddleOfSegment(...coordVectorB);
		let midC = coordinatesMiddleOfSegment(...coordVectorC);

		let dist = ([x1, y1], [x2, y2]) => Math.hypot(x1 - x2, y1 - y2);

		let distAB = dist(midA, midB);
		genAssert(distAB > 3, 'Векторы A и B слиплись');

		let distBC = dist(midB, midC);
		genAssert(distBC > 3, 'Векторы C и B слиплись');

		let distCA = dist(midC, midA);
		genAssert(distCA > 3, 'Векторы A и C слиплись');

		// Проверка совпадения векторов
		genAssert(!math.deepEqual(vectorA, vectorB), 'Вектора A и B совпадают');
		genAssert(!math.deepEqual(vectorA, vectorC), 'Вектора A и C совпадают');
		genAssert(!math.deepEqual(vectorB, vectorC), 'Вектора B и C совпадают');

		// Проверка длин векторов
		genAssert(math.norm(vectorA) > 3, 'Вектор A слишком маленький');
		genAssert(math.norm(vectorB) > 3, 'Вектор B слишком маленький');
		genAssert(math.norm(vectorC) > 3, 'Вектор C слишком маленький');

		// Создание коэффициентов
		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];

		let vectors = [vectorA, vectorB, vectorC].map((elem, index) =>
			math.multiply(elem, coeffs[index][0] / coeffs[index][1])
		);

		// Вычисление скалярного произведения
		let answ = math.multiply(vectors[0], math.add(vectors[1], vectors[2]));
		genAssertZ1000(answ, 'Нецелое скалярное произведение');

		let frac = (coeff1, coeff2) => (coeff1 / coeff2).abs() == 1 ? (coeff1 / coeff2) > 0 ? '' : '-' : coeff1.texrndfrac(coeff2);

		let condition = (frac(coeffs[0][0], coeffs[0][1]) + '\\vec{' + letter[0] + '}\\cdot(') + frac(coeffs[1][0], coeffs[1][1]) + '\\vec{' + letter[1] + '}' + '+'.esli(coeffs[2][0] > 0) + frac(coeffs[2][0], coeffs[2][1]) +'\\vec{' + letter[2] + '})';

		let paint1 = function(ctx) {
			ctx.translate(-320, 0);

			let scale = 25;

			coordVectorA = coordVectorA.map((num) => num * scale);
			coordVectorB = coordVectorB.map((num) => num * scale);
			coordVectorC = coordVectorC.map((num) => num * scale);

			let h = 700;
			let w = 700;
			//Оси координат
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 16,
			}, 25);

			ctx.scale(1, -1);
			ctx.lineWidth = 3;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawArrow(coordVectorA[0], coordVectorA[1], coordVectorA[2], coordVectorA[3]);
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawArrow(coordVectorB[0], coordVectorB[1], coordVectorB[2], coordVectorB[3]);
			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.drawArrow(coordVectorC[0], coordVectorC[1], coordVectorC[2], coordVectorC[3]);

			ctx.font = "22px liberation_sans";
			ctx.scale(1, -1);
			ctx.signSegmentInMiddle(coordVectorA[0], -coordVectorA[1], coordVectorA[2], -coordVectorA[3], letter[0] + "⃗",
				15, 15);
			ctx.signSegmentInMiddle(coordVectorB[0], -coordVectorB[1], coordVectorB[2], -coordVectorB[3], letter[1] + "⃗",
				15, 15);
			ctx.signSegmentInMiddle(coordVectorC[0], -coordVectorC[1], coordVectorC[2], -coordVectorC[3], letter[2] + "⃗",
				15, 15);
		};

		NAtask.setTask({
			text: 'На координатной плоскости изображены векторы ' + letter.map(elem => '$\\vec{' + elem + '}$').shuffle().joinWithConjunction() +
				'. Найдите скалярное произведение $' + condition + '$.',
			answers: answ,
			analys: '$\\vec{' + letter[0] + '}=\\{' + vectorA.toArray().join(' ;') + '\\}$' + '<br>' +
				'$\\vec{' + letter[1] + '}=\\{' + vectorB.toArray().join(' ;') + '\\}$' + '<br>' +
				'$\\vec{' + letter[2] + '}=\\{' + vectorC.toArray().join(' ;') + '\\}$',
			author: 'Суматохина Александра',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
