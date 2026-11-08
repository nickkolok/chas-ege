(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 13);
		let b = sl(3, 5);
		NAtask.setEvaluationTask({
			expr: ' sqrt(' + a*a + '^' + b + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080009
