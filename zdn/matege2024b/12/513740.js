(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rhombus = new Rhombus({
			length: sl(1, 50),
			angles: {
				angle: {
					angleA: 60
				},
				angleInDegree: true,
			},
		});

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ диагонали диагонали являются биссектрисами его углов`,
			questions: [{
				text: `, $AB=${rhombus.lengthAB}$, $AC=${(rhombus.lengthDiagonalAC).pow(2).texsqrt(1)}$. Найдите $BD$.`,
				answers: rhombus.lengthDiagonalBD,
			}, {
				text: ` и равны $${(rhombus.lengthDiagonalAC).pow(2).texsqrt(1)}$ и $${rhombus.lengthDiagonalBD}$. Найдите периметр параллелограмма $ABCD$.`,
				answers: rhombus.perimeter,
			}],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://mathb-ege.sdamgia.ru/test?likes=513740
// https://mathb-ege.sdamgia.ru/problem?id=522678
