(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setEvaluationTask({
			expr: 'sqrt(' + sl(1, 19) + '^' + sl(2, 10, 2) + '*' + sl(1, 19) + '^' + sl(2, 10, 2) +
				'*' + sl(1, 19) + '^' + sl(2, 10, 2) + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080019
