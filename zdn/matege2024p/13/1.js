(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 6);
		let b = sl(4, 10, 2);
		let c = a * b * b;
		NAtask.setEvaluationTask({
			expr: (sl(-1, 3, 2) + b) + '/' + b / sl(1, 2) + 'sqrt(' + a + ')' + '*' + 'sqrt(' + c + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

