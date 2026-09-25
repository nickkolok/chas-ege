(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		const rect = new Rectangle({
			lengths: {
				lengthAB: sl(1, 50),
				lengthBC: sl(1, 50),
			},
			supplementary: {
				calculateDiagonals: true
			}
		});

		genAssert(rect.lengthDiagonalAC.isAlmostInteger(), 'Диагональ не целая');

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ известно, что $AB=${rect.lengthAB}$, $AC=BD=${rect.lengthDiagonalAC}$. Найдите площадь параллелограмма`,
			answers: rect.area(),
			authors: ['Александра Суматохина'],
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506418
