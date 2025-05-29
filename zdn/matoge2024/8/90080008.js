(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 9);
		let b = sl(2, 8);
		let c = sl(3, 9);
		NAtask.setEvaluationTask({
			expr: ['sqrt(' + a * c + ')', 'sqrt(' + [a * b, c].shuffle().join('*') + ')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080008
