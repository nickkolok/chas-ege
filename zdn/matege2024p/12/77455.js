(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,5) + ['x^(3/2)', 'x sqrt(x)'].iz(),
				sl(1,20) + 'x',
				sl(0,100)
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//77455
