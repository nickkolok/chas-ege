(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 8);
		let b = slKrome(a, 2, 8)
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + a + '^' + sl(2, 6, 2) + '*' + b + '^' + sl(2, 6, 2) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 509212

