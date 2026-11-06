(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorA = generateMatrix(1, 4, 1, 13).iz();

		let coordVect = (V) => [V[2] - V[0], V[3] - V[1]];

		let coordA = coordVect(vectorA);
		let coordB = [sl(1, 13),sl(1, 13)];

		genAssert(!coordA.equalAr(coordB));

		let lengthA = coordA.map((elem) => elem.pow(2)).sum();
		let lengthB = coordB.map((elem) => elem.pow(2)).sum();

		let answ = coordA[0] * coordB[0] + coordA[1] * coordB[1];

		let cos = (answ / ((lengthA * lengthB).sqrt()));

		let angle = cos.arccos() * 180 / Math.PI;

		genAssert(cos.abs() != 1, 'вектора коллинеарны');

		genAssert(angle.isZ() && angle != 90, 'Оба значения не подходят для ответа');


		NAtask.setTask({
			text: 'Даны точки $A (' + vectorA[0] + '; ' + vectorA[1] + ')$ и $B (' + vectorA[2] + '; ' + vectorA[3] +
				')$. Найдите скалярное произведение векторов $\\overrightarrow{AB}$ и $\\overrightarrow{CB}$, ' +
				'если $BC = ' + lengthB.texsqrt(sl1()) + '$, $\\angle{CBA} = ' + angle + '^\\circ$.',
			answers: answ,
			author: 'Суматохина Александра',
			analys: '$('+coordA.join(';')+')$'+'<br>'+
			'$('+coordB.join(';')+')$',
		});
		NAtask.modifiers.variativeABC();
	}, 1000);
})();
