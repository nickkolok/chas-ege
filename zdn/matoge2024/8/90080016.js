(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 15);
		NAtask.setEvaluationTask({
			expr: [a + '^' + sl(1, 10), a.pow(sl(2, 5))].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080016
