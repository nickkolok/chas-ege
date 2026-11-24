(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 96);
		let left = a - sl(0.5, 5, 0.5);
		let right = a + sl(0.5, 5, 0.5);
		let sign = [' ', '-'].iz();
		NAtask.setMinimaxFunctionTask({
			expr: sign + '(' + ['x', a].shuffle().join('-') + ')^2*e^(' + ['x', a].shuffle().join('-') + ')',
			leftEnd: left + '',
			rightEnd: right + '',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77482
