(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 14);
		let b = a * a;
		let d = sl(-15, 15);
		let e = sl(3, 30);
		NAtask.setMinimaxFunctionTask({
			expr: '(x^2+' + b + ')/x',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 0.1,
			primaryStep: 0.01,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77470

