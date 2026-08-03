(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1.1, 1.9, 0.1);
		let b = sl(2, 9);
		let c = a * b * b;
		NAtask.setEvaluationTask({
			expr: 'divideColon(' + (a * b) + '*10^' + sl(1, 3) + ',  ' + a + '*10^' + sl(-3, -1) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//1395

