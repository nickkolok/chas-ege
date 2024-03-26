(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: 'forceBrackets(0.1)^' + sl(2, 6) + '*10^' + sl(2, 6) + '*' + sl(2, 9) + '^' + sl(2, 6),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//10000001

