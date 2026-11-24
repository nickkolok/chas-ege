(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '11856';
		// Как названа искомая сторона: «другую сторону» или «сторону, соседнюю с данной» (в ФИПИ есть обе)
		let preference = ['other', 'adjacent'];
		let rand = getSelectedPreferenceFromList(key, preference);

		const rect = new Rectangle({
			lengths: {
				lengthAB: sl(1, 60),
				lengthBC: sl(1, 60),
			},
			supplementary: {
				calculateDiagonals: true,
			},
		});

		genAssertAlmostInteger(rect.lengthDiagonalAC, 'Диагональ не целая');

		NAtask.setTask({
			text: `Обе диагонали параллелограмма равны $${rect.lengthDiagonalAC}$. Одна из сторон параллелограмма равна $${rect.lengthAB}$. Найдите ${['другую сторону параллелограмма', 'сторону параллелограмма, соседнюю с данной'][rand]}.`,
			answers: rect.lengthBC,
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=11856

