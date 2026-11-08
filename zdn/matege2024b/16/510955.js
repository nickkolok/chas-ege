(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(10, 99);
		let b = sl(1.1, 9.9, 0.1);
		NAtask.setEvaluationTask({
			expr: a + '*10-' + b + '*10^2',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//510955
