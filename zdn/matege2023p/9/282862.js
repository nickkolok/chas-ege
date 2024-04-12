(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30);
		let b = sl(1, 30);
		let c = sl(-15, 15, 0.5);
		let d = c + sl(3, 30, 0.5);
		let arr = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: '(x' + arr.iz() + a + ')^2(' + ' x ' + arr.iz() + b + ')' + arr.iz() + sl(1, 10),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 0.1,
			secondaryStep: 1,
			authors: ['Алендарь Сергей'],
		});
	}, 100);
})();
//282862

