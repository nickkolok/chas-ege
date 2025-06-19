(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);

		NAtask.setEvaluationTask({
			expr: a + '^' + sl(1, 9) + '/(' + Math.pow(a, sl(2, 4)) + ')^' + sl(1, 5),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//401158
