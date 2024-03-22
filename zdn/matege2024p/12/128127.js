(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30);
		let b = sl(1, 30);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = [' ', '-'];
		let maxmin1 = sl(0, 1);
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr2[maxmin1] + b + ' x ' + arr2[maxmin1] + ' x sqrt(x) ',
			leftEnd: '' + c,
			rightEnd: '' + d,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
//128127

