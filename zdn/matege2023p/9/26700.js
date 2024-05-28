(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20, 2);
		let b = sl(1, 100);
		let c = sl(1, 50);
		let arr1 = ['+', '-'];
		let arr2 = ['sin', 'cos'];
		let maxmin1 = sl1();
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: a + arr2.iz() + '(x)' + arr1.iz() + b + 'x/pi' + arr1.iz() + c,
			leftEnd: ['-2pi/3', '-5pi/6'].iz(),
			rightEnd: '0',
			primaryStep: 0.1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//26700

