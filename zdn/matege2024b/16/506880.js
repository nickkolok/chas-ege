(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 7);
		let b = sl(2, 5);
		let c = a * b * b - sl(1, 7).pm();
		NAtask.setEvaluationTask({
			expr: ['(' + [b + 'sqrt(' + a + ')', 'sqrt(' + c + ')'].shuffle().join('+') + ')', 
			'(' + [b + 'sqrt(' + a + ')','sqrt(' + c + ')'].shuffle().join('-') + ')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 506880

