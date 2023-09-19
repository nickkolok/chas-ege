(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(3);
		letter = letter.map((element) => element.toLowerCase());

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();
		let vectorC = generateMatrix(1, 4, 1, 13).iz();

		let check1 = [{
			x: vectorA[0],
			y: vectorA[1]
		}, {
			x: vectorA[2],
			y: vectorA[3]
		}, {
			x: vectorB[0],
			y: vectorB[1]
		}, {
			x: vectorB[2],
			y: vectorB[3]
		}].mt_otrPeres();

		genAssert(!check1, 'Вектора A и B пересекаются');

		let check2 = [{
			x: vectorA[0],
			y: vectorA[1]
		}, {
			x: vectorA[2],
			y: vectorA[3]
		}, {
			x: vectorC[0],
			y: vectorC[1]
		}, {
			x: vectorC[2],
			y: vectorC[3]
		}].mt_otrPeres();

		genAssert(!check2, 'Вектора A и C пересекаются');

		let check3 = [{
			x: vectorB[0],
			y: vectorB[1]
		}, {
			x: vectorB[2],
			y: vectorB[3]
		}, {
			x: vectorC[0],
			y: vectorC[1]
		}, {
			x: vectorC[2],
			y: vectorC[3]
		}].mt_otrPeres();

		genAssert(!check3, 'Вектора B и C пересекаются');

		let coordVect = (V) => [V[2] - V[0], V[3] - V[1]];

		let coordA = coordVect(vectorA);
		let coordB = coordVect(vectorB);
		let coordC = coordVect(vectorC);

		genAssert(!coordA.equalAr(coordB), 'Вектора A и B совпадают');
		genAssert(!coordA.equalAr(coordC), 'Вектора A и C совпадают');

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();
		let lengthC = coordC.map((elem) => elem.pow(2)).sum();

		genAssert(lengthA.sqrt() > 3, 'Вектор A слишком маленький');
		genAssert(lengthB.sqrt() > 3, 'Вектор B слишком маленький');
		genAssert(lengthC.sqrt() > 3, 'Вектор C слишком маленький');

		let vectors = [coordA, coordB, coordC];

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];
		let finalyVector = [0, 0];
		let condition = [];

		for (let i = 0; i < 3; i++) {
			condition.push('' + coeffs[i][0].texrndfrac(coeffs[i][1]) + '\\vec{' + letter[i] + '}');
			finalyVector = objSum(finalyVector, objUmn(vectors[i], coeffs[i][0] / coeffs[i][1]));
		}

		genAssert(finalyVector.production(), 'Слишком простой вектор');
		let answ = finalyVector.map((elem) => elem.pow(2)).sum().sqrt();

		let resultExpr = condition.shuffle().slag().plusminus();

		let paint1 = function(ctx) {
			ctx.translate(-320, 0);

			let scale = 25;

			vectorA = vectorA.map((num) => num * scale);
			vectorB = vectorB.map((num) => num * scale);
			vectorC = vectorC.map((num) => num * scale);
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
			ctx.drawArrow(vectorA[0], vectorA[1], vectorA[2], vectorA[3]);
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawArrow(vectorB[0], vectorB[1], vectorB[2], vectorB[3]);
			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.drawArrow(vectorC[0], vectorC[1], vectorC[2], vectorC[3]);


			ctx.font = "22px liberation_sans";
			ctx.scale(1, -1);
			ctx.signSegmentInMiddle(vectorA[0], -vectorA[1], vectorA[2], -vectorA[3], letter[0] + "⃗", 15, 15);
			ctx.signSegmentInMiddle(vectorB[0], -vectorB[1], vectorB[2], -vectorB[3], letter[1] + "⃗", 15, 15);
			ctx.signSegmentInMiddle(vectorC[0], -vectorC[1], vectorC[2], -vectorC[3], letter[2] + "⃗", 15, 15);

		};

		NAtask.setTask({
			text: 'На координатной плоскости изображены векторы ' + ['$\\overrightarrow{' + letter[0] + '}$',
					'$\\overrightarrow{' + letter[1] + '}$', '$\\overrightarrow{' + letter[2] + '}$'
				].shuffle().joinWithConjunction() +
				'. Найдите длину вектора $' + resultExpr + '$.',
			answers: answ,
			analys: '$' + resultExpr + '=(' + finalyVector[0].ts() + ' ;' + finalyVector[1].ts() + ')$',
			author: 'Суматохина Александра',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
//64485002
