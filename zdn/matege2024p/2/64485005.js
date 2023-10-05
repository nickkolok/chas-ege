(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(3);

		let vectA = [sl(-20, 20), sl(-20, 20)];
		let vectB = [slKrome(vectA[0], -20, 20), slKrome(vectA[1], -20, 20)];

		let vectors = [vectA, vectB];

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];
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
			].iz(), ['сумму координат', finalyVector.sum()], ['произведение координат', finalyVector.production()]
		].iz();
		let finalyVectorView = finalyVector.slice().map((elem) => elem.ts());

		let answ = question.pop();

		genAssertZ1000(finalyVector[0]);
		genAssertZ1000(finalyVector[1]);

		let resultExpr = condition.shuffle().slag().plusminus();

		NAtask.setTask({
			text: 'Даны векторы $\\vec{' + vectorsName[0] + '} = ( ' + vectA.join(';') + ' )$, $\\vec{' + vectorsName[1] +
				'} = ( ' + vectB.join(';') + ')$. ' +
				'Найдите координаты вектора $\\vec{' + vectorsName[2] + '}=' + resultExpr.replace('+-', '-') + '$. В ответе запишите ' + question +
				' вектора $\\vec{' + vectorsName[2] + '}$.',
			answers: answ,
			analys: '$' + (resultExpr + '=(' + finalyVectorView.join('; ')).plusminus() + ')$',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
