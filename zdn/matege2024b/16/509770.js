(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 6);
		let b = sl(3, 10);
		let c = a * b * b;
		let d = sl(1, 9, 2);
		let e = 1;
		if (d == 1) e = sl(2, 15);
		NAtask.setEvaluationTask({
			expr: d + 'sqrt(' + c + ')' + '/' + e + 'sqrt(' + a + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

