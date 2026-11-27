(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vectorA = generateMatrix(1, 4, 1, 13).iz();

		let coordA = vectorA.coordVect();
		let coordB = [sl(1, 13), sl(1, 13)];

		genAssert(!coordA.equalAr(coordB));

		let lengthB = coordB.veclengthSquared();

		let answ = coordA.scalprod(coordB);

		let cos = coordA.veccos(coordB);

		let angle = coordA.vecangleInDegrees(coordB);

		genAssert(cos.abs() != 1, 'вектора коллинеарны');

		genAssert(angle.isAlmostInteger() && Math.round(angle) !== 90, 'Оба значения не подходят для ответа');
		angle = Math.round(angle);


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

