(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(2);
		letter = letter.map((element) => element.toLowerCase());

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();

		let check = [{
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

		genAssert(!check, 'Вектора пересекаются');

		let coordVect = (V) => [V[2] - V[0], V[3] - V[1]];

		let coordA = coordVect(vectorA);
		let coordB = coordVect(vectorB);

		genAssert(!coordA.equalAr(coordB));

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();

		let scal = coordA[0] * coordB[0] + coordA[1] * coordB[1];

		genAssert(lengthA.sqrt() > 3, 'Вектор A слишком маленький');
		genAssert(lengthB.sqrt() > 3, 'Вектор B слишком маленький');

		let cos = (scal / ((lengthA * lengthB).sqrt()));

		let angle = cos.arccos() * 180 / Math.PI;

		genAssert(cos.abs() != 1, 'вектора коллинеарны');

		genAssert((cos * 1000).isZ() || angle.isZ(), 'Оба значения не подходят для ответа');

		let answ = angle.isZ() ? [angle, 'угол (в градусах)'] : [cos, 'косинус угла'];

		let question = answ.pop();

		let paint1 = function(ctx) {
			ctx.translate(-320, 0);

			let scale = 25;

			vectorA = vectorA.map((num) => num * scale);
			vectorB = vectorB.map((num) => num * scale);
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


			ctx.font = "22px liberation_sans";
			ctx.scale(1, -1);
			ctx.signSegmentInMiddle(vectorA[0], -vectorA[1], vectorA[2], -vectorA[3], letter[0] + "⃗", 15, 15);
			ctx.signSegmentInMiddle(vectorB[0], -vectorB[1], vectorB[2], -vectorB[3], letter[1] + "⃗", 15, 15);

		};

		NAtask.setTask({
			text: 'На координатной плоскости изображены векторы $\\overrightarrow{' + letter[0] + '}$ и $\\overrightarrow{' +
				letter[1] + '}$. Найдите ' + question + ' между векторами $\\overrightarrow{' + letter[0] +
				'}$ и $\\overrightarrow{' +
				letter[1] + '}$.',
			answers: answ,
			analys: '$\\overrightarrow{' + letter[0] + '}=\\{' + coordA.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[1] + '}=\\{' + coordB.join(' ;') + '\\}$',
			author: 'Суматохина Александра',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
