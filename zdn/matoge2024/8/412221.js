(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setEvaluationTask({
			expr: ['(' + 'sqrt(' + sl(1, 49) + ')*sqrt(' + sl(1, 49) + ')' + ')^2', sl(1, 99)].shuffle().join(['+', '-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412221
