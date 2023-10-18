(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,30);
		let b = sl(1,100);

		NAtask.setMinimaxFunctionTask({
			expr: '' + (a*6) + 'cos(x) + ' + (a*3) + ' sqrt(3) x - ' + a + ' sqrt(3) pi + ' + b,
			leftEnd: '0',
			rightEnd: 'pi/2',
			authors: ['Николай Авдеев'],
		});
	},10);
})();
//26692
