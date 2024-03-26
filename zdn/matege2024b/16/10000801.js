(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		let b = a * sl(2, 9) * 0.1;
		NAtask.setEvaluationTask({
			expr: '(' + b + '*10^' + sl(1, 5) + ')/(' + a + '*10^' + sl(-5, -1) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//10000801

