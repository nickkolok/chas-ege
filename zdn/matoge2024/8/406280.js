(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 19);
		let b = sl(2, 9);
		let c = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + a * b + ')' + '*' + 'sqrt(' + a + ')' + '/' + 'sqrt(' + b * c + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//406280
