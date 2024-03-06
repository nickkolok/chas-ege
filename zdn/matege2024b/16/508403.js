(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: a + '^' + sl(1, 9).pm() + '*(' + a + '^' + sl(1, 9).pm() + '/' + a + '^' + sl(1, 9).pm() + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//508403

