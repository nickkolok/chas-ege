(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(2);
		letter = letter.map((element) => element.toLowerCase());

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();

		let coordVect = (V) => [V[2] - V[0], V[3] - V[1]];

		let coordA = coordVect(vectorA);
		let coordB = coordVect(vectorB);

		genAssert(!coordA.equalAr(coordB));

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();

		let scal = coordA[0] * coordB[0] + coordA[1] * coordB[1];

		let cos = (scal / ((lengthA * lengthB).sqrt()));

		let angle = cos.arccos() * 180 / Math.PI;

		genAssert((cos * 1000).isZ() || angle.isZ(), 'Оба значения не подходят для ответа');

		let answ = angle.isZ() ? [angle, 'угол (в градусах)'] : [cos, 'косинус угла'];

		let question = answ.pop();

		NAtask.setTask({
			text: 'Найдите ' + question + ' между векторами $\\overrightarrow{' + letter[0] + '}$ и $\\overrightarrow{' +
				letter[1] + '}$, если известно, что  $\\overrightarrow{' + letter[0] + '}(' + coordA.join(' ;') + ')$ и ' +
				'$\\overrightarrow{' + letter[1] + '}(' + coordB.join(' ;') + ')$.',
			answers: answ,
			author: 'Суматохина Александра',
		});
	}, 1000);
})();
//2774101
