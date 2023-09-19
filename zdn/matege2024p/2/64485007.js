(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(4);

		let vectA = [sl(-10, 10), sl(-10, 10)];
		let vectB = [slKrome(vectA[0], -10, 10), slKrome(vectA[1], -10, 10)];
		let vectC = [slKrome([vectA[0], vectB[0]], -10, 10), slKrome([vectA[1], vectB[1]], -10, 10)];
		let vectD = [slKrome([vectA[1], vectB[1], vectC[0]], -10, 10), slKrome([vectA[1], vectB[1], vectC[1]], -10, 10)];

		let vectors = [vectA, vectB, vectC, vectD];
		let vectorsView = vectors.map((elem, index) => '$\\vec{' + vectorsName[index] + '} = ( ' + elem.join(';') + ' )$');


		let coeffs = generateMatrix(4, 2, -10, 10);
		let vectorsCopy = vectors.slice().map((elem, i) => objUmn(elem, coeffs[i][0] / coeffs[i][1]));
		let subVector1, subVector2;
		let condition = [];

		subVector1 = objSum(vectorsCopy[0], vectorsCopy[1]);
		subVector2 = objSum(vectorsCopy[2], vectorsCopy[3]);
		let answ = subVector1[0] * subVector2[0] + subVector1[1] * subVector2[1];
		genAssertZ1000(answ, 'Кривой ответ');

		for (let i = 0; i < vectors.length; i++) {
			condition.push(coeffs[i][0].texfrac(coeffs[i][1]) + '\\vec{' + vectorsName[i] + '}');
		}

		let resultExpr = '(' + condition.slice(0, 2).slag().plusminus() + ')\\cdot(' + condition.slice(2, 4).slag().plusminus() +
			')';

		NAtask.setTask({
			text: 'Даны векторы ' + vectorsView.shuffle().joinWithConjunction() + '. ' +
				'Найдите скалярное произведение $' + resultExpr +
				'$.',
			answers: answ,
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
