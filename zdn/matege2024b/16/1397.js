(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: 'divideColon(' + sl(0.01, 0.1, 0.09) + '^' + sl(2, 6) + '*10^' + sl(2, 6) + ',' + sl(2, 9) + '^' + sl(-1, -5) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//1397

