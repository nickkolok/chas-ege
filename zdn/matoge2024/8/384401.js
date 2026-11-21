(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		let b = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: [a*b + '^' + sl(2, 15) ,'(' + a + '^' + sl(2, 15) + '*' + b + '^' + sl(2, 15) + ')'].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//384401
