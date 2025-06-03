(function() {
	retryWhileError(function() {
		'use strict';
		let b = sl(1, 9);
		let a = sl(2, 100);
		let sign = ['+', '-'];
		let sluchSign = sl1();
		NAtask.setEvaluationTask({
			expr: ['(' + 'sqrt(' + a + ')' + sign[sluchSign] + b + ' )^2',
				2 * b + '*sqrt(' + a + ')'].shuffle().join(sign[(sluchSign - 1).abs()]),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//400942
