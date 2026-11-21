(function() {
	retryWhileError(function() {
		'use strict';
		let a = slKrome(10, 2, 16);
		NAtask.setEvaluationTask({
			expr: [a + '^' + sl(2, 10), a.pow(sl(2, 4))].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080016
