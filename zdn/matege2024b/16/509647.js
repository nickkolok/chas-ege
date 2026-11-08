(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		let b = slKrome([a], 2, 9);
		let c = slKrome([a, b], 2, 9);
		NAtask.setEvaluationTask({
			expr: a + '*' + c + '^' + sl(2, 5) + '+' + b + '*' + c + '^' + sl(2, 5),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509647
