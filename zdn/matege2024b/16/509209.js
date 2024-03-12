(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9, 0.1);
		let b = sl(2, 9, 0.1);
		let c = sl(2, 9, 0.1);
		NAtask.setEvaluationTask({
			expr: ['(' + a + '*10^' + sl(1, 5).pm() + ')','(' + b + '*10^' + sl(1, 5).pm() + ')','(' + c + '*10^' + sl(1, 5).pm() + ')'].iz(sl(2,3)).join('+'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509209

