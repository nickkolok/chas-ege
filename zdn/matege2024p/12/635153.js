(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 9);
		let b = sl(1, 9);
		let arr1 = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: '1/((cos(x))^2' + arr1.iz() + a + 'cos(x)' + arr1.iz() + b + ')',
			leftEnd: '-pi',
			rightEnd: 'pi',
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//635153

