(function() {
	retryWhileError(function() {
		'use strict';
		let a = slKrome(4, 2, 8);
		let b = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: ['sqrt(' + a + ')', '(' + ['sqrt(' + a + ')', 'sqrt(' + a * b * b + ')'].shuffle().join(['+', '-'].iz()) +')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//383598
