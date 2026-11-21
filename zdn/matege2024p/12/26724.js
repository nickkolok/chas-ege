(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		NAtask.setLocalExtremumTask({
			expr: '(' + sl(1,10) + 'x^2 - ' + a + 'x +' + a + ')e^(x + ' + sl(-30,30) + ')' ,
			authors: ['Николай Авдеев'],
		});
	}, 20);
})();
//26724
