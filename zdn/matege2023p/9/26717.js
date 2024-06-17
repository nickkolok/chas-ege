
(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 20);
		let b = sl(1, 15);
		let c = a;
		let d = sl1();
		let k = sl(0, 10).pm();
		let g = 1;
		if (d == 0) {
			g = sl(2, 9);
			k = 0;
			a = 1;
			c = g;
		}
		let l = -b-1-sl(0, 1.5, 0.5);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin]+a + 'log(x+' + b + ')^' + g + '+'+arr2[maxmin] + c + 'x+' + k,
			leftEnd: '' +l,
			rightEnd: '0',
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26717
