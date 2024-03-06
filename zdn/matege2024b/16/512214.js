(function() {
	retryWhileError(function() {
		'use strict';
		let a = -1;
		NAtask.setEvaluationTask({
			expr: sl(2, 99) + '*(' + a + ')^' + sl(1, 9) + '+' + sl(2, 99) + '*(' + a + ')^' + sl(1, 9),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//512214

