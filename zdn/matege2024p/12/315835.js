(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 9);
		let b = sl(1, 50);
		let c = sl(1, 100);
		let d = sl(1, 100);
		let arr1 = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: a + 'x^5' + arr1.iz() + b + 'x^3' + [arr1.iz() + c + 'x', arr1.iz() + d].iz(),
			leftEnd: '-' + sl(4, 20),
			rightEnd: '' + sl(0, 2).pm(),
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
//315835

