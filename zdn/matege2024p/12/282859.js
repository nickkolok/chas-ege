(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 ' +
				'(' + ['x', sl(1,20)].joinPlusMinus() + ') + ' +
				sl(0,20).pm(),
			authors: ['Николай Авдеев'],
		});
	}, 20);
})();
//282859
