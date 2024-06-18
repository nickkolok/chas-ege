(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 100);
		let b = sl(1, 100);
		let c = sl(1, 100);
		let arr1 = ['+', '-'];
		let arr2 = ['sin', 'cos'];
		let maxmin1 = sl1();
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin1] + a + arr2.iz() + '(x)' + arr1.iz() + b + 'x' + arr1.iz() + c,
			leftEnd: ['-pi/2', '-3pi/2', '0'].iz(),
			rightEnd: ['pi/2', '3pi/2', '0'].iz(),
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//26695

