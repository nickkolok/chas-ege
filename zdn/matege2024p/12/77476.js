(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(0, 20);
		let b = sl(0, 20);
		let sign = ['-', '+'].iz();

		let intervalStart = b - sl(1, 15, 0.5);
		let intervalEnd = b + sl(1, 15, 0.5);;

		NAtask.setMinimaxFunctionTask({
			expr: sign + ['(' + [a, 'x'].shuffle().join('-') + ')', 'e^(' + [b, 'x'].shuffle().join('-') + ')'].shuffle().join('*'),
			leftEnd: intervalStart + '',
			rightEnd: intervalEnd + '',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});

	}, 10000);
})();

//77475
//77476
//77477
