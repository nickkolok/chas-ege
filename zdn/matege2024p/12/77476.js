(function() {
	retryWhileError(function() {
		'use strict';

		let taskType = ['наименьшее', 'наибольшее'].iz();

		let a = sl(0, 20); 
		let b = sl(0, 20); 

		let intervalStart = sl(-10, 10);
		let intervalEnd = intervalStart + sl(1, 25);

		NAtask.setMinimaxFunctionTask({
			expr: '(' + [a, 'x'].shuffle().join('-') + ')*e^(' + [b, 'x'].shuffle().join('-') + ')',
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

