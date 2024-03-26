(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: sl(2, 99) + '*(-1)^' + sl(0, 9).pm() + '+' + sl(2, 99) + '*(-1)^' + sl(0, 9).pm(),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//512214

