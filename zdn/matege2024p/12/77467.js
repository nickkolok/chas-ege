(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20);

		NAtask.setLocalExtremumTask({
			expr: ['-',''].iz() + '(' + ['x', '(x^2 + ' + a*a + ')'].shuffleJoin('/') + ')',
			extremums: [-a, a],
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	}, 2);
})();
//77467
