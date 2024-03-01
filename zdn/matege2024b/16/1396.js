(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1.1, 1.9, 0.1) * sl(1, 5);
		let b = sl(2, 9);
		var v = sl1();
		var znak = (v ? 1 : (-1));
		NAtask.setEvaluationTask({
			expr: ['(' + b + '*10^' + znak * sl(1, 9) + ')', '(' + a + '*10^' + znak * sl(-9, -1) + ')'].shuffle().join('*'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//1396

