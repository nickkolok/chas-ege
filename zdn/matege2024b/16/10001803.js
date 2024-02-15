(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 19);
		let b = sl(2, 9);
		let d = sl(2, 9);


		NAtask.setEvaluationTask({
			expr: '(varlog(' + b + ',' + a + '^' + d * sl(1, 9) + '))/(' + d + '(varlog(' + b + ',' + a + ')))',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

