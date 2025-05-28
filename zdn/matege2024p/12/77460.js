(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30, 0.5).pm();
		let b = sl(1, 30, 0.5);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr1[maxmin] + b + ' x ' + arr2[maxmin] + [' x sqrt(x) ','x^(3/2)'].iz(),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77460

