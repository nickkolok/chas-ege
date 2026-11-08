(function() {
	retryWhileError(function() {
		'use strict';
		let b = sl(1, 9);
		let a = sl(2, 100);
		let sign = ['+', '-'].shuffle();
		NAtask.setEvaluationTask({
			expr: ['(' + ['sqrt(' + a + ')',b].shuffle().join(sign[0]) + ' )^2',
				2 * b + 'sqrt(' + a + ')'].shuffle().join(sign[1]),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//400942
