(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		const rect = new Rectangle({
			lengths: {
				lengthAB: sl(1,50),
				lengthBC: sl(1,50),
			},
			supplementary: {
				calculateDiagonals: true
			}
		});
		
		genAssert(rect.lengthDiagonalAC.isAlmostInteger(), 'Диагональ не целая');

		NAtask.setTask({
			text: `Обе диагонали параллелограмма равны $${rect.lengthDiagonalAC}$. Одна из сторон параллелограмма равна $${rect.lengthAB}$. Найдите сторону параллелограмма, соседнюю с данной.`,
			answers: rect.lengthBC,
			authors: ['Александра Суматохина'],
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=11856
