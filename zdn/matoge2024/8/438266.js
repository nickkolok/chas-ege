(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 13);
		let b = sl(4, 6, 2);
		NAtask.setEvaluationTask({
			expr: ' sqrt(' + a + '^' + b + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//438266
