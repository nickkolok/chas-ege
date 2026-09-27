(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: '1/' + '(' + ['1/' + ['1', sl(2, 99)].iz(), '1/' + sl(1, 99)].shuffle().join(['+', '-'].iz()) + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//506647
