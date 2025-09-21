(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(0.5,4,0.5).pm() + 'x^2',
				'' +  sl(1,30).pm() + 'x',
				'' +  sl(1,30).pm() + 'ln(x)',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//77490
