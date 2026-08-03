(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,30).pm() + 'x',
				'ln(x +' + sl(1,30).pm() +')',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//26722
