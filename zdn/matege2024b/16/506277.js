(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 7);
		let b = sl(2, 6);
		let d = sl(9, 10) - a;

		NAtask.setEvaluationTask({
			expr: '(' + b + '^(' + d + 'varlog(' + b + ',' + a + ')))',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 506277

