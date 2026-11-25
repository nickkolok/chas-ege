(function() {
	retryWhileError(function() {
		'use strict';
		let b = slKrome(isPolnKvadr, 2, 25);
		let a = sl(5, 81);
		NAtask.setEvaluationTask({
			expr: ['(' + ['sqrt(' + a + ')', 'sqrt(' + b + ')'].shuffle().join('+') + ' )', '(' + ['sqrt(' + a + ')',
				'sqrt(' + b + ')'].shuffle().join('-') + ')'].shuffle().join(' '),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080011
