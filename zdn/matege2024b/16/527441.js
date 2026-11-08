(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 19);
		let b = sl(1, 2);
		let c;
		let d = sl(2, 5);
		if (a <= 9) {
			c = sl(1, 2);
		} else {
			c = 0;
		}
		NAtask.setEvaluationTask({
			expr: ['varlog(sqrt(' + Math.pow(a, b) + '),' + Math.pow(a, b + c) + ')', 'varlog(sqrt(' + a + '),' + a + '^' +
				d + ')'
			].iz(),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 527441

