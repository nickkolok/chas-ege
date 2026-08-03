(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		let b = sl(1, 9).pm();
		let c = slKrome([b, 0, 1, -1], -9, 9);
		let d = slKrome([b, c, 0, 1, -1], -9, 9);
		NAtask.setEvaluationTask({
			expr: [a + '^' + b, '(' + a + '^' + c + '/' + a + '^' + d + ')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//508403

