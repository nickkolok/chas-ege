(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1.1, 9.9, 0.1);
		let b = sl(2, 9);
		let znak = (1).pm();
		NAtask.setEvaluationTask({
			expr: ['forceBrackets(' + b + '*10^' + znak * sl(1, 9) + ')', 'forceBrackets(' + a + '*10^' + znak * sl(-9, -1) + ')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//510193
