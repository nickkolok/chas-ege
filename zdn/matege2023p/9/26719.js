(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 100).pm();
		let b = sl(2, 19);
		let l = sl(-20.5, 1, 0.5);
		let r = sl(-20.5, 1, 0.5);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		let b1 = [3, 4, 5, 7, 11, 13, b * 2].iz();
		let a1 = sl(2, 7);
		if ( b > b1) {
			a1 = 1;
		}
		genAssertIrreducible(a1, b1);
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin] + 'log(' + b + 'x)+' + arr2[maxmin] + b + 'x+' + a,
			leftEnd: '1/' + b * 2,
			rightEnd: '' + a1 + '/' + b1,
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26719

