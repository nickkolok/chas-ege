(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 15);
		let b = sl(2, 15);
		let c = sl(2, 15);

		NAtask.setEvaluationTask({
			expr: 'sqrt(' + [a, b + '^' + sl(2, 10, 2)].shuffle().join('*') + ')*' +
				'sqrt(' + [a, c + '^' + sl(2, 10, 2)].shuffle().join('*') + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//337339
