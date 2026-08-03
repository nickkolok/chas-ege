(function() {
	retryWhileError(function() {
		'use strict';
		let e1 = sl(2, 9).pm();
		let e2 = sl(1, 9).pm();
		let e3 = -(e1 * e2) + sl(1, 6).pm();

		NAtask.setEvaluationTask({
			expr: ['(a^' + e1 + ')^' + e2, 'a^' + e3].shuffle().join('*'),
			variables: {a: sl(2, 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//311383
