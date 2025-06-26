(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 10);
		let b = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: ['(' + a + '*' + b + ')^' + sl(1, 9) ,'(' + a + '^' + sl(1, 9) + '*' + b + '^' + sl(1, 9) + ')'].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080017
