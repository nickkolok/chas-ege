(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(3);

		let vectA = [sl(-20, 20), sl(-20, 20)];
		let vectB = [slKrome(vectA[0], -20, 20), slKrome(vectA[1], -20, 20)];
		let vectC = [slKrome([vectA[0], vectB[0]], -20, 20), slKrome([vectA[0], vectB[0]], -20, 20)];

		let vectors = [vectA, vectB, vectC];

		let coeffs = [sl(1,3).pm(), sl(1,3).pm(), sl(1,3).pm()];
		let finalyVector = [0, 0];
		let condition = [];

		for (let i = 0; i < 3; i++) {
			condition.push('' + coeffs[i] + '\\vec{' + vectorsName[i] + '}');
			finalyVector = objSum(finalyVector, objUmn(vectors[i], coeffs[i]));
		}

		genAssert(finalyVector.production(), 'Слишком простой вектор');
		let answ = finalyVector.map((elem) => elem.pow(2)).sum().sqrt();

		let resultExpr = condition.shuffle().slag().plusminus();

		NAtask.setTask({
			text: 'Даны векторы $\\vec{' + vectorsName[0] + '} = ( ' + vectA.join(';') + ' )$, $\\vec{' + vectorsName[1] +
				'} = ( ' +
				vectB.join(';') +
				')$ и $\\vec{' + vectorsName[2] + '} = ( ' + vectC.join(';') + ' )$. ' +
				'Найдите длину вектора $' + resultExpr + '$.',
			answers: answ,
			analys: '$' +resultExpr + '=(' + finalyVector.join('; ') + ')$',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
