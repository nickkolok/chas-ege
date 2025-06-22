(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 15);

		NAtask.setEvaluationTask({
			expr: '(1/' + a.pm() + '^' + sl(1, 30).pm() + ')*(' + '1/' +
				a.pm() + '^' + sl(1, 30).pm() + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//406567
