(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 50);
		let b = sl(1, 300);
		let c = sl(1, 50);
		let arr1 = [' ', '-'];
		let arr2 = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: [arr1.iz() + 'x^3', arr1.iz() + a + 'x^2', arr1.iz() + b + 'x'].iz(sl(2, 3)).join('+') + arr2.iz() + c,
			leftEnd: '-' + sl(1, 9, 0.5),
			rightEnd: '' + sl(1, 9, 0.5),
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
//77438

