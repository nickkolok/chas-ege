(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 13);
		let b = sl(2, 6);
		let c = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: a * c + '/' + '(' + b + 'sqrt(' + a + ')' + ')' + '^2',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 514504

