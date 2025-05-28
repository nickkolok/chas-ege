(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 9, 2);
		let b = sl(2, 8, 2);
		let c = sl(3, 9, 2);
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + a*c + ')'+ '*' + 'sqrt(' + a*b + '*' + c + ')' ,
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//90080008
