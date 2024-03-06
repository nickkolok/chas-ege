(function() {
	retryWhileError(function() {
		'use strict';
		let a = -10;
		NAtask.setEvaluationTask({
			expr: '(' + a + ')^' + sl(0, 5) + '+(' + a + ')^' + sl(0, 5) + '+(' + a + ')^' + sl(0, 5),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//511746

