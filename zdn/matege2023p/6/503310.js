(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(1,89) + 90 * sl(-3,3);
		let b = a + 90 * sl(1,3).pm();
		let fn = ['sin','cos'].iz() + 'degpow';

		NAtask.setEvaluationTask({
			expr: '' + sl(10,100).pm() + '/(' +
				fn + '(' + a + ',2)' + ['+','-'].iz() + sl(1,100) + '+' + fn + '(' + b + ',2)' +
			')',
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},10000);
})();
// 503310
