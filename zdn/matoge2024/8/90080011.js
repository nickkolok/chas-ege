(function() {
	retryWhileError(function() {
		'use strict';
		let b = slKrome(4, 3, 8);
		let a = sl(5, 81);
		NAtask.setEvaluationTask({
			expr: ['(' + 'sqrt(' + a + ')' + '+'+ 'sqrt(' + b + ')' + ' )', '(' + 'sqrt(' + a + ')' + '-'+ 'sqrt(' + b + ')' + ')'].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080011
