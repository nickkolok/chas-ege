(function() {
	retryWhileError(function() {
		'use strict';

		let taskType = ['наименьшее', 'наибольшее'].iz();

		let a = sl(1, 5);
		let b = sl(-50, 50);
		let c = sl(-50, 50);
		let d = sl(1, 20);
		let sign = ['-', '+'].iz();

		let intervalStart = sl(-20, 20);
		let intervalEnd = intervalStart + sl(1, 5);

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
