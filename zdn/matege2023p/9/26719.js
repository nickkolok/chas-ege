(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 20);
		let b = sl(1, 15);
		let l = sl(-20.5, 1, 0.5);
		let r = sl(-20.5, 1, 0.5);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin] + 'log(' + b + 'x)+' + arr2[maxmin] + b + 'x+' + a,
			leftEnd: '1/' + b * 2,
			rightEnd: '' + sl(3, 5) + '/' + b * 2,
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26719
