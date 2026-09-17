(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 45);
		let sign = ['', '-'].iz();
		let r1 = sl(0.5, 5, 0.5);
		let r2 = sl(0.5, 5, 0.5);

		let center = -a + [-1, -0.5, 0.5, 1].iz();

		let leftEnd = (center - r1).toFixed(1);
		let rightEnd = (center + r2).toFixed(1);

		NAtask.setMinimaxFunctionTask({
			expr: sign + '(' + ['x', a].shuffle().join('+') + ')^2*e^(' + '-' + [a, 'x'].shuffle().join('-') + ')',
			leftEnd: leftEnd,
			rightEnd: rightEnd,
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77484
