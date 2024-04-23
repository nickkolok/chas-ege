(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(5);
		
		let vectorForQuestion = vectorsName.pop();

		let vectA = [sl(-20, 20), sl(-20, 20)];
		let vectB = [slKrome(vectA[0], -20, 20), slKrome(vectA[1], -20, 20)];
		let vectC = [slKrome([vectA[0], vectB[0]], -20, 20), slKrome([vectA[1], vectB[1]], -20, 20)];
		let vectD = [slKrome([vectA[1], vectB[1], vectC[0]], -20, 20), slKrome([vectA[1], vectB[1], vectC[1]], -20, 20)];

		let vectors = [vectA, vectB, vectC, vectD];
		let vectorsView = vectors.map((elem, index) => '$\\vec{' + vectorsName[index] + '} = ( ' + elem.join(';') + ' )$');

		let coeffs = generateMatrix(4, 2, -20, 20);
		let finalyVector = [0, 0];
		let condition = [];

		for (let i = 0; i < vectors.length; i++) {
			condition.push(coeffs[i][0].texfrac(coeffs[i][1]) + '\\vec{' + vectorsName[i] + '}');
			finalyVector = objSum(finalyVector, objUmn(vectors[i], coeffs[i][0] / coeffs[i][1]));
		}

		let question = [
			[
				['первую координату', finalyVector[0]],
				['вторую координату', finalyVector[1]]
			].iz(), ['сумму координат', finalyVector.sum()],
			['произведение координат', finalyVector.production()]
		].iz();
		let finalyVectorView = finalyVector.slice().map((elem) => elem.ts());

		let answ = question.pop();

		genAssertZ1000(finalyVector[0]);
		genAssertZ1000(finalyVector[1]);

		let resultExpr = condition.slag().plusminus();

		NAtask.setTask({
			text: 'Даны векторы ' + vectorsView.joinWithConjunction() + '. ' +
				'Найдите координаты вектора $\\vec{' + vectorForQuestion + '}=' + resultExpr.replace('+-', '-') +
				'$. В ответе запишите ' + question +
				' вектора $\\vec{' + vectorForQuestion + '}$.',
			answers: answ,
			analys: '$' + (resultExpr + '=(' + finalyVectorView.join('; ')).plusminus() + ')$',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
