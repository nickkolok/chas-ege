(function() {
	retryWhileError(function() {
		'use strict';
		let base = [10, sl(2, 9)].iz();
		let a = sl(1, 9.9, 0.1);
		let b = sl(1, 9.9, 0.1);
		let c = sl(1, 9.9, 0.1);
		NAtask.setEvaluationTask({
			expr: ['(' + a + '*' + base + '^' + sl(1, 5).pm() + ')','(' + b + '*' + base + '^' + sl(1, 5).pm() + ')','(' + c + '*' + base + '^' + sl(1, 5).pm() + ')'].iz(sl(2,3)).join('+'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509209

