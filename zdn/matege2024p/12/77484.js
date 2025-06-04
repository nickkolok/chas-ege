(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99).pm();
		let b = a + sl(1, 5);
		let sign = ['+', '-'].iz();
		NAtask.setMinimaxFunctionTask({
			expr: sign + '(x + ' + b + ')^2*e^(' + a + '-x)',
			leftEnd: (-a - sl(0.5, 2, 0.5)) + '',
			rightEnd: (-a + sl(0.5, 2, 0.5)) + '',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

//77484 
//77485
