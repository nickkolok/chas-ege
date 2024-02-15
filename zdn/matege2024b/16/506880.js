(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 5);
		let b = sl(2, 5);
		let c = a * b * b - sl(1, 7);
		NAtask.setEvaluationTask({
			expr: ' (' + b + 'sqrt(' + a + ')+sqrt(' + c + '))*(' + b + 'sqrt(' + a + ')-sqrt(' + c + '))',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

