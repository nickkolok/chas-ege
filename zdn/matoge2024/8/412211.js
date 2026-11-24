(function() {
	retryWhileError(function() {
		'use strict';
		let e1 = sl(2, 9);
		let e2 = sl(2, 9);
		let e3 = e1 * e2;
		let e4 = e3 + sl(1,6);

		NAtask.setEvaluationTask({
			expr: '(' + ['(b^' + e1 + ')^' + e2, 'a^' + e4].shuffle().join('*') + ')/(a*b)^' + e3,
			variables: {a: sl(2, 9), b: "sqrt(" + sl(2, 9) + ")"},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412211
