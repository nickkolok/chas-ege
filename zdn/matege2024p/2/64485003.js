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

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];
		let vectors = [coordA, coordB, coordC];
		vectors = vectors.map((elem, index) => objUmn(elem, coeffs[index][0] / coeffs[index][1]));

		let answ = objSum(vectors[1], vectors[2]);

		answ = vectors[0][0] * answ[0] + vectors[0][1] * answ[1];

		genAssertZ1000(answ, 'Нецелое скалярное произведение');


		let condition = (coeffs[0][0].texrndfrac(coeffs[0][1]) + '\\vec{' + letter[0] + '}\\cdot(');
		condition += (coeffs[1][0].texrndfrac(coeffs[1][1]) + '\\vec{' + letter[1] + '}' + '+'.esli(coeffs[2][0] > 0) +
			coeffs[2][0].texrndfrac(coeffs[2][1]) + '\\vec{' + letter[2] + '})');

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
				'. Найдите скалярное произведение $' + condition + '$.',
			answers: answ,
			analys: '$\\overrightarrow{' + letter[0] + '}=\\{' + coordA.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[1] + '}=\\{' + coordB.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[2] + '}=\\{' + coordC.join(' ;') + '\\}$',
			author: 'Суматохина Александра',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
