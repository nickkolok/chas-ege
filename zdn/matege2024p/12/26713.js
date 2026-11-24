(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', a].joinPlusMinus() + ') *' +
				'e^(' + ['x', a].joinPlusMinus() + ')',
			authors: ['Николай Авдеев'],
		});
	}, 20);
})();
//26713
