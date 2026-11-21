(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: [
				'(' + [0.01, 0.1].iz() + '^' + sl(2, 5) + '/' + '10^' + sl(-1, -5) + ')',
				'10^' + sl(2, 6)
				].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//512907

