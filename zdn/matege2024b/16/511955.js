(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1.1, 9.9, 0.1);
		let b = slKrome([a], 1.1, 9.9, 0.1)
		NAtask.setEvaluationTask({
			expr: ['(' + a + '*10^2)', '(' + b + '*10^3)'].shuffle().join('+'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//511955
