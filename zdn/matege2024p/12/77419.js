(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr: '' + sl(1,9) + 'x^3 - ' + sl(1,1000) + 'x + ' + sl(1,1000),
			authors: ['Николай Авдеев'],
		});
	}, 2000);
})();
//77419
