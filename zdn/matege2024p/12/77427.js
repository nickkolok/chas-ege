(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setLocalExtremumTask({
			expr:
				// TODO: Do something with 1x
				'' /*+ ['',sl(2,4).pm()].iz()*/ + 'x^3 ' +
				['+','-'].iz() + sl(1,100) + 'x^2 ' +
				['+','-'].iz() + sl(1,100) + 'x ' +
				['+','-'].iz() + sl(1,1000),
			authors: ['Николай Авдеев'],
		});
	}, 2000);
})();
//77427
