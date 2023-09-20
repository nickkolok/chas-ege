(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(4);

		letter = letter.map((element) => element.toLowerCase());

		let letterForQuestion = letter.pop();

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();
		let vectorC = generateMatrix(1, 4, 1, 13).iz();

		let coordVect = (V) => [V[2] - V[0], V[3] - V[1]];

		let coordA = coordVect(vectorA);
		let coordB = coordVect(vectorB);
		let coordC = coordVect(vectorC);

		genAssert(coordA.sum(), 'Первый вектор зануляет выражение');

		genAssert(!coordA.equalAr(coordB), 'Вектора A и B совпадают');
		genAssert(!coordA.equalAr(coordC), 'Вектора A и C совпадают');

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();
		let lengthC = coordC.map((elem) => elem.pow(2)).sum();

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];
		let vectors = [coordA.slice(), coordB.slice(), coordC.slice()];
		let rand = sl(0, 2);
		let answ;
		let vectorsView = vectors.slice().map((elem, index) => {
			if (index == rand) {
				let r = sl1();
				answ = elem[r];
				elem[r] = letterForQuestion;
			}
			return '$\\overrightarrow{' + letter[index] + '}(' + elem.join(' ;') + ')$';
		});

		console.log(vectorsView);

		vectors = vectors.map((elem, index) => objUmn(elem, coeffs[index][0] / coeffs[index][1]));

		let scal = objSum(vectors[1], vectors[2]);

		let sk = scal.slice();

		//genAssert(!scal.sum(), 'Cкобка занулилась');

		scal = vectors[0][0] * scal[0] + vectors[0][1] * scal[1];

		genAssertZ1000(scal, 'Нецелое скалярное произведение');



		let condition = (coeffs[0][0].texrndfrac(coeffs[0][1]) + '\\vec{' + letter[0] + '}\\cdot(');
		condition += (coeffs[1][0].texrndfrac(coeffs[1][1]) + '\\vec{' + letter[1] + '}' + '+'.esli(coeffs[2][0] > 0) +
			coeffs[2][0].texrndfrac(coeffs[2][1]) + '\\vec{' + letter[2] + '})=' + scal.ts());

		NAtask.setTask({
			text: 'Даны векторы ' + vectorsView.joinWithConjunction() + '. Найдите $' + letterForQuestion +
				'$, если $' + condition + '$.',
			answers: answ,
			analys: '$(' + coeffs[1][0].texrndfrac(coeffs[1][1]) + '\\vec{' + letter[1] + '}' + '+'.esli(coeffs[2][0] > 0) +
				coeffs[2][0].texrndfrac(coeffs[2][1]) + '\\vec{' + letter[2] + '})=\\{' + sk.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[0] + '}=\\{' + coordA.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[1] + '}=\\{' + coordB.join(' ;') + '\\}$' + '<br>' +
				'$\\overrightarrow{' + letter[2] + '}=\\{' + coordC.join(' ;') + '\\}$',
			author: 'Суматохина Александра',
		});
	}, 100000);
})();
//TODO: НИХРЕНА НЕ ПРАВИЛЬНО СЧИТАЕТ
