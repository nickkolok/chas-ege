(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(1, 5);
		let b = sl(-50, 50);
		let c = sl(-50, 50);
		let d = sl(1, 20);
		let sign = ['-', '+'].iz();

		let intervalStart = d - sl(1, 15, 0.5);
		let intervalEnd = d + sl(1, 15, 0.5);

		NAtask.setMinimaxFunctionTask({
			expr: '(' + a + 'x^2 + ' + b + 'x + ' + c + ')*e^(' + [['x', d].shuffle().join('-'), 'x'].iz() + ')',
			leftEnd: intervalStart + '',
			rightEnd: intervalEnd + '',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});

	}, 10000);
})();

//77478
//77479
