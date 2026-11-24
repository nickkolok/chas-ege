(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(3);
		letter = letter.map((element) => element.toLowerCase());

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();
		let vectorC = generateMatrix(1, 4, 1, 13).iz();

		genAssert(!segmentIntersectionCount(...vectorA, ...vectorB), 'Вектора A и B пересекаются');
		genAssert(!segmentIntersectionCount(...vectorA, ...vectorC), 'Вектора A и C пересекаются');
		genAssert(!segmentIntersectionCount(...vectorB, ...vectorC), 'Вектора B и C пересекаются');

		let coordA = vectorA.coordVect();
		let coordB = vectorB.coordVect();
		let coordC = vectorC.coordVect();

		genAssert(!coordA.equalAr(coordB), 'Вектора A и B совпадают');
		genAssert(!coordA.equalAr(coordC), 'Вектора A и C совпадают');
		genAssert(!coordB.equalAr(coordC), 'Вектора B и C совпадают');

		genAssert(coordA.veclength() > 3, 'Вектор A слишком маленький');
		genAssert(coordB.veclength() > 3, 'Вектор B слишком маленький');
		genAssert(coordC.veclength() > 3, 'Вектор C слишком маленький');

		let vectors = [coordA, coordB, coordC];

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];
		let finalVector = [0, 0];
		let condition = [];

		for (let i = 0; i < 3; i++) {
			condition.push('' + coeffs[i][0].texrndfrac(coeffs[i][1]) + '\\vec{' + letter[i] + '}');
			finalVector = objSum(finalVector, objUmn(vectors[i], coeffs[i][0] / coeffs[i][1]));
		}

		genAssertZ1000(finalVector[0]);
		genAssertZ1000(finalVector[1]);
		genAssert(finalVector.production(), 'Слишком простой вектор');
		let answ = finalVector.veclength();

		let resultExpr = condition.shuffle().slag().plusminus();

		const scale = 25;
		const scaledVectors = [vectorA, vectorB, vectorC].map(vector => vector.map(value => value * scale));
		let paint1 = function(ctx) {
			ctx.translate(-320, 0);

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
			}, scale);

			ctx.scale(1, -1);

			ctx.lineWidth = 3;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawArrow(scaledVectors[0][0], scaledVectors[0][1], scaledVectors[0][2], scaledVectors[0][3]);
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawArrow(scaledVectors[1][0], scaledVectors[1][1], scaledVectors[1][2], scaledVectors[1][3]);
			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.drawArrow(scaledVectors[2][0], scaledVectors[2][1], scaledVectors[2][2], scaledVectors[2][3]);


			ctx.font = '22px liberation_sans';
			ctx.scale(1, -1);
			ctx.signSegmentInMiddle(scaledVectors[0][0], -scaledVectors[0][1], scaledVectors[0][2], -scaledVectors[0][3], letter[0] + "⃗", 15, 15);
			ctx.signSegmentInMiddle(scaledVectors[1][0], -scaledVectors[1][1], scaledVectors[1][2], -scaledVectors[1][3], letter[1] + "⃗", 15, 15);
			ctx.signSegmentInMiddle(scaledVectors[2][0], -scaledVectors[2][1], scaledVectors[2][2], -scaledVectors[2][3], letter[2] + "⃗", 15, 15);

		};

		NAtask.setTask({
			text: 'На координатной плоскости изображены векторы ' + ['$\\overrightarrow{' + letter[0] + '}$',
					'$\\overrightarrow{' + letter[1] + '}$', '$\\overrightarrow{' + letter[2] + '}$'
				].shuffle().joinWithConjunction() +
				'. Найдите длину вектора $' + resultExpr + '$.',
			answers: answ,
			analys: '$' + resultExpr + '=(' + finalVector[0].ts() + '; ' + finalVector[1].ts() + ')$',
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
