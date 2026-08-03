(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 13);
		let b = sl(2, 6);
		let c = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: '(' + b + 'sqrt(' + a + ')' + ')' + '^2' + '/' + a * c,
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080010
