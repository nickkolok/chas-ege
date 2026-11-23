(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = window.smallLatinLetters.iz(2);

		let vectorA = generateMatrix(1, 4, 1, 13).iz();
		let vectorB = generateMatrix(1, 4, 1, 13).iz();

		let coordA = vectorA.coordVect();
		let coordB = vectorB.coordVect();

		genAssert(!coordA.equalAr(coordB));

		let cos = coordA.veccos(coordB);

		let angle = coordA.vecangleInDegrees(coordB);

		genAssert((cos * 1000).isZ() || angle.isAlmostInteger(), 'Оба значения не подходят для ответа');

		let answ = angle.isAlmostInteger() ? [Math.round(angle), 'угол (в градусах)'] : [cos, 'косинус угла'];

		let question = answ.pop();

		NAtask.setTask({
			text: 'Найдите ' + question + ' между векторами $\\overrightarrow{' + letter[0] + '}$ и $\\overrightarrow{' +
				letter[1] + '}$, если известно, что $\\overrightarrow{' + letter[0] + '}(' + coordA.join('; ') + ')$ и ' +
				'$\\overrightarrow{' + letter[1] + '}(' + coordB.join('; ') + ')$.',
			answers: answ,
			author: 'Суматохина Александра',
		});
	}, 1000);
})();
//2774101

