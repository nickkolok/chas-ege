(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 19);
		let b = sl(2, 19);
		let c = sl(2, 19);
		let d = sl(2, 19);
		NAtask.setEvaluationTask({
			 expr: a + ' sqrt(' + b + ') *' + c + ' sqrt(' + d + ') * sqrt(' + b*d + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 137285
