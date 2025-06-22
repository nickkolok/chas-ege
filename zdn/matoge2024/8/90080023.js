(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);

		NAtask.setEvaluationTask({
			expr: '(' + a + '^' + sl(1, 9).pm() + '*' + a + '^' + sl(1, 9).pm() + ')^' + sl(1, 9).pm() + '/(' + a + '^' +
				sl(1, 9).pm() + '*' + a + '^' + sl(1, 9).pm() + ')^' + sl(1, 9).pm(),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080023
