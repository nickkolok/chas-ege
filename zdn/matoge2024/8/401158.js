(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);

		NAtask.setEvaluationTask({
			expr: [a + '^' + sl(2, 9), '(' + a.pow(sl(1, 4)) + ')^' + sl(2, 5)].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//401158
