(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: 'forceBrackets(' + [0.01, 0.1].iz() + ')^' + sl(2, 6) + '*' +
				'divideColon(10^' + sl(2, 6) + ',' +
				sl(2, 9) + ' ^ ' + sl(-1, -5) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509707

