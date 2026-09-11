(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 96);
		let b = a + sl(1, 3);
		let left = b - sl(0.5, 5, 0.5);
		let right = b + sl(0.5, 5, 0.5);
		let sign = [' ', '-'].iz();
		NAtask.setMinimaxFunctionTask({
			expr: sign + '(' + ['x', b].shuffle().join('-') + ')^2*e^(' + ['x', a].shuffle().join('-') + ')',
			leftEnd: left + '',
			rightEnd: right + '',
			forbiddenAnswers: [0, '-0'],
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77483
