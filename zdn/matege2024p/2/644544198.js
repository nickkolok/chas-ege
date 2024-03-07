(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letter = window.smallLatinLetters.iz(3);

		let coordA = [sl(-20, 20), sl(-20, 20)];
		let coordB = [slKrome(coordA[0], -20, 20), slKrome(coordA[1], -20, 20)];

		let vectors = [coordA, coordB];

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)]
		];

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();

		let scal = coordA[0] * coordB[0] + coordA[1] * coordB[1];

		let finalyVector = [0, 0];
		let condition = [];

		for (let i = 0; i < vectors.length; i++) {
			condition.push(coeffs[i][0].texfrac(coeffs[i][1]) + '\\vec{' + letter[i] + '}');
			finalyVector = objSum(finalyVector, objUmn(vectors[i], coeffs[i][0] / coeffs[i][1]));
		}

		genAssertZ1000(finalyVector[0]);
		genAssertZ1000(finalyVector[1]);

		let finalyVectorView = finalyVector.slice().map((elem) => elem.ts());

		let question = ['длину вектора', finalyVector.map((elem) => elem.pow(2)).sum().sqrt()];
		
		let answ = question.pop();

		let resultExpr = condition.shuffle().slag().plusminus();

		NAtask.setTask({
			text: 'Длины векторов $\\vec{' + letter[0] + '}$ и $\\vec{' + letter[1] + '}$ равны соответственно $' +
				lengthA.texsqrt(sl1()) + '$ и $' + lengthB.texsqrt(sl1()) + '$, ' +
				'а их скалярное произведение равно $' + scal + '$. ' +
				'Найдите ' + question + ' $\\vec{' + letter[2] + '}$, если $\\vec{' + letter[2] + '}=' + resultExpr +
				'$.',
			answers: answ,
			analys: '$\\vec{' + letter[2] + '}=\\{' + (finalyVectorView.join('; ')).plusminus() + '\\}$' + '<br>' +
				'$\\vec{' + letter[0] + '}=\\{' + coordA.join(' ;') + '\\}$' + '<br>' +
				'$\\vec{' + letter[1] + '}=\\{' + coordB.join(' ;') + '\\}$',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
//644544198
