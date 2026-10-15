(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = om.latbukv.iz(4);

		letter = letter.map((element) => element.toLowerCase());

		let letterForQuestion = letter.pop();


		let coordA = generateMatrix(1, 2, 1, 13).iz();
		let coordB = generateMatrix(1, 2, 1, 13).iz();
		let coordC = generateMatrix(1, 2, 1, 13).iz();

		genAssert(coordA.sum(), 'Первый вектор зануляет выражение');

		genAssert(!coordA.equalAr(coordB), 'Вектора A и B совпадают');
		genAssert(!coordA.equalAr(coordC), 'Вектора A и C совпадают');

		let coeffs = [
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
			[sl(1, 10).pm(), sl(2, 20)],
		];
		let vectors = [coordA.slice(), coordB.slice(), coordC.slice()];
		let rand = sl(0, 2);
		let answ;
		let vectorsView = vectors.copyAr().map((elem, index) => {
			if (index == rand) {
				let r = sl1();
				answ = elem[r];
				elem[r] = letterForQuestion;
			}
			return '$\\overrightarrow{' + letter[index] + '}(' + elem.join(' ;') + ')$';
		});


		vectors = vectors.map((elem, index) => objUmn(elem, coeffs[index][0] / coeffs[index][1]));

		let scal =(coordA,coordB)=> coordA[0] * coordB[0] + coordA[1] * coordB[1];
		
		let finalVector = objSum(vectors[1],vectors[2]);
		genAssert(!finalVector.sum(), 'Cкобка занулилась');
		
		finalVector = scal(finalVector,vectors[0]);

		genAssertZ1000(finalVector, 'Нецелое скалярное произведение');

		let vec = (l) => '\\vec{' + l + '}';

		let condition =
			coeffs[0][0].texrndfrac(coeffs[0][1]) + vec(letter[0]) + '\\cdot(' +
			coeffs[1][0].texrndfrac(coeffs[1][1]) + vec(letter[1]) + '+'.esli(coeffs[2][0] > 0) +
			coeffs[2][0].texrndfrac(coeffs[2][1]) + vec(letter[2]) + ')=' + finalVector.ts();

		NAtask.setTask({
			text: 'Даны векторы ' + vectorsView.joinWithConjunction() + '. Найдите $' + letterForQuestion +
				'$, если $' +
				condition.plusminus().
			replace(/\(\s*1\s*(?=\\vec)/g, '(').
			replace(/\+\s*1\s*(?=\\vec)/g, '+').
			replace(/\-\s*1\s*(?=\\vec)/g, '-').
			replace(/\{\-1\}\s*(?=\\vec)/g, '-') +
			'$.',
			answers: answ,
			analys: //'$(' + coeffs[1][0].texrndfrac(coeffs[1][1]) + '\\vec{' + letter[1] + '}' + '+'.esli(coeffs[2][0] > 0) +'$'+
				//coeffs[2][0].texrndfrac(coeffs[2][1]) + '\\vec{' + letter[2] + '})=(' + sk.join(' ;') + ')$' + '<br>' +
				'$\\overrightarrow{' + letter[0] + '}=(' + coordA.join(' ;') + ')$' + '<br>' +
				'$\\overrightarrow{' + letter[1] + '}=(' + coordB.join(' ;') + ')$' + '<br>' +
				'$\\overrightarrow{' + letter[2] + '}=(' + coordC.join(' ;') + ')$',
			author: 'Суматохина Александра',
		});
	}, 100000);
})();

