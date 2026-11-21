(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		const rect = new Rectangle({
			lengths: {
				lengthAB: sl(1, 50),
				lengthBC: sl(1, 50),
			},
			supplementary: {
				calculateDiagonals: true,
			},
		});

		genAssertAlmostInteger(rect.lengthDiagonalAC, 'Диагональ не целая');

		NAtask.setTask({
			text: `Обе диагонали параллелограмма равны $${rect.lengthDiagonalAC}$. Одна из сторон параллелограмма равна $${rect.lengthAB}$. Найдите сторону параллелограмма, соседнюю с данной.`,
			answers: rect.lengthBC,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=11856
