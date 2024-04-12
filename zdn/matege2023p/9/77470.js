(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 30) * * 2;
		let d = sl(-15, 15);
		let e = d + sl(3, 30);
		NAtask.setMinimaxFunctionTask({
			expr: '(x^2+' + a + ')/x',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 1,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
//77470

