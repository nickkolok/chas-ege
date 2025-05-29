(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 13, 2);
		let b = sl(2, 6, 2);
		NAtask.setEvaluationTask({
			expr: ' sqrt(' + a + '^' + b + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//438266
