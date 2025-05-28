(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20, 2);
		let b = sl(1, 50);
		let l = sl(-5, 0);
		let r = l + sl(2, 5);
		let arr1 = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: 'e^(2x)-' + a + 'e^x' + arr1.iz() + b,
			leftEnd: '' + l,
			rightEnd: '' + r,
			primaryStep: 1,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//315127

