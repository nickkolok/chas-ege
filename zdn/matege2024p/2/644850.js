(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(3);

		let vectA = [sl(-20, 20), sl(-20, 20)];
		let vectB = [slKrome(vectA[0], -20, 20), slKrome(vectA[1], -20, 20)];
		let vectC = [slKrome([vectA[0], vectB[0]], -20, 20), slKrome([vectA[0], vectB[0]], -20, 20)];

		let vectors = [vectA, vectB, vectC];

		let por = [(1).pm(), (2).pm(), (3).pm()].shuffle();
		let finalyVector = [0, 0];
		let condition = [];

		for (let i = 0; i < 3; i++) {
			condition.push('-'.esli(por[i] < 0) + '\\vec{' + vectorsName[por[i].abs() - 1] + '}');
			if (por[i] > 0)
				finalyVector = objSum(vectors[por[i].abs() - 1], finalyVector);
			else
				finalyVector = objSubtraction(vectors[por[i].abs() - 1], finalyVector);
		}

		genAssert(finalyVector.production(), 'Слишком простой вектор');
		let answ = finalyVector.map((elem) => elem.pow(2)).sum().sqrt();


		NAtask.setTask({
			text: 'Даны векторы $\\vec{' + vectorsName[0] + '} = ( ' + vectA.join(';') + ' )$, $\\vec{' + vectorsName[1] +
				'} = ( ' +
				vectB.join(';') +
				')$ и $\\vec{' + vectorsName[2] + '} = ( ' + vectC.join(';') + ' )$. ' +
				'Найдите длину вектора $' + condition.shuffle().slag().plusminus() + '$.',
			answers: answ.sqrt(),
			analys: '$' + condition.shuffle().slag().plusminus() + '=(' + finalyVector.join('; ') + ')$',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
