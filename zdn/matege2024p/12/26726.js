(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 *' +
				'e^(' + ['x', sl(1,20)].joinPlusMinus() + ')',
			authors: ['Николай Авдеев'],
		});
	}, 20);
})();
//26726
