(function() {
	retryWhileError(function() {
		'use strict';
		let c = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: ['(' + c + '^' + sl(1, 9).pm() + ')' + '^' + sl(2, 5).pm(), c + '^' + sl(-15, -2)].shuffle().join('/'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//508353

