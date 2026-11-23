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
