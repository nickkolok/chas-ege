(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: '(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//511746

