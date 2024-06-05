(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(1,89) + 90 * sl(-3,3);
		let b = (a + 90 * sl(1,3).pm()).pm();
		let fn = ['sindeg','cosdeg','tgdeg','ctgdeg'].iz();

		NAtask.setEvaluationTask({
			expr: '' + sl(10,100).pm() + '/(' +
				fn + '(' + a + ')' + ['+','-'].iz() + sl(1,100) + '+' + fn + '(' + b + ')' +
			')',
			askAboutFraction: true,
			authors: ['Николай Авдеев'],
		});
	},10000);
})();
//
