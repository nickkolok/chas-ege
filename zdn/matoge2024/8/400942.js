(function() {
	retryWhileError(function() {
		'use strict';
		let b = sl(1, 9);
		let a = sl(2, 100);
		let sign = ['+', '-'].shuffle();
		NAtask.setEvaluationTask({
			expr: ['(' + 'sqrt(' + a + ')' + sign[0] + b + ' )^2',
				2 * b + '*sqrt(' + a + ')'].shuffle().join(sign[1]),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//400942
