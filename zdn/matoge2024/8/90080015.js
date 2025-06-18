(function() {
	retryWhileError(function() {
		'use strict';
		let e1 = sl(2, 5);
		let e2 = sl(1, 9);
		let e3 = sl(1, 15);
		let e4 = (e1 * e2) + e3 + sl(1, 6).pm();

		NAtask.setEvaluationTask({
			expr: '(' + ['(a^' + e1 + ')^' + e2, 'a^' + e3].shuffle().join('*') + ')/a^' + e4,
			variables: {a: sl(sl(2, 7), 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080015
