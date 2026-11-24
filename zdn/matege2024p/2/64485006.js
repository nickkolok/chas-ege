(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorsName = window.smallLatinLetters.iz(5);
		
		let vectorForQuestion = vectorsName.pop();

		let vectA = math.matrix([sl(-20, 20), sl(-20, 20)]);
		let vectB = math.matrix([sl(-20, 20), sl(-20, 20)]);
		let vectC = math.matrix([sl(-20, 20), sl(-20, 20)]);
		let vectD = math.matrix([sl(-20, 20), sl(-20, 20)]);

		let vectors = [vectA, vectB, vectC, vectD];
		let vectorsView = vectors.map((elem, index) => '$\\vec{' + vectorsName[index] + '} = ( ' + elem.toArray().join(';') + ' )$');

		let coeffs = generateMatrix(4, 2, 1, 20).map(c1=>c1.map(c2=>c2.pm()));
		let finalVector = math.zeros(2);  
		let condition = [];

		for (let i = 0; i < vectors.length; i++) {
			condition.push(coeffs[i][0].texfrac(coeffs[i][1]) + '\\vec{' + vectorsName[i] + '}');
			finalVector = math.add(finalVector, math.multiply(vectors[i], coeffs[i][0] / coeffs[i][1]));
		}

		genAssertZ1000(finalVector.subset(math.index(0)));
		genAssertZ1000(finalVector.subset(math.index(1)));

		let resultExpr = condition.shuffle().slag().plusminus();

		NAtask.setTask({
			text: 'Даны векторы ' + vectorsView.joinWithConjunction() + '. ' +
				'Найдите координаты вектора $\\vec{' + vectorForQuestion + '}=' + resultExpr.replace('+-', '-') +
				'$. В ответе запишите ',
				questions:[
					{
						text: 'первую координату',
						answers: finalVector.subset(math.index(0)),
					},{
						text: 'вторую координату',
						answers: finalVector.subset(math.index(1)),
					},{
						text: 'сумму координат',
						answers: math.sum(finalVector),
					},{
						text: 'произведение координат',
						answers: math.prod(finalVector),
					},
					],
				postquestion: ' вектора $\\vec{' + vectorForQuestion + '}$.',
			
			analys: '$' + (resultExpr + '=(' + finalVector.toArray().join('; ')).plusminus() + ')$',
		});
	}, 1000);
	NAtask.modifiers.allDecimalsToStandard();
})();
