(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(1,89) + 90 * sl(-3,3);
		let b = a.pm() + 90 * sl(1,3).pm();
		let fn = ['sin','cos'].iz() + 'degpow';

		NAtask.setEvaluationTask({
			expr: '' + sl(10,100).pm() + '/(' +
				['sin','cos'].iz() + 'degpow' + '(' + a + ',2)' +
				(['+','-'].iz() + sl(1,100)).esli(sl(5)) +
				'+' + ['sin','cos'].iz() + 'degpow' + '(' + b + ',2)' +
			')',
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},10000);
})();
// 26772 26773 26774 503310
