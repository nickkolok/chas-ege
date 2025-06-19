(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 15);
		let b = sl(1, 15);
		NAtask.setEvaluationTask({
			expr: ['(' + [a, 'sqrt(' + b + ')'].shuffle().join('+') + ')^2',
				'(' + [a, 'sqrt(' + b + ')'].shuffle().join(
				'-') + ')^2'].shuffle().join('+'),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//401984
