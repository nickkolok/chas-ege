(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = c + sl(1, 2);
		let e = c - sl(1, 2);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: '' + '(' + a + 'x' + arr1[sl1()] + b + ')' + 'e^(' + arr1[sl1()] + 'x' + arr2[sl1()] + c + ')',
			leftEnd: '' + e,
			rightEnd: '' + d,
			primaryStep: 1 / 6,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//26691

