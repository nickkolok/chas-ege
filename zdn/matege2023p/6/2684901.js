(function() {
	retryWhileError(function() {
		'use strict';

		let base = sl(2,9);
		let p = sl(1,4).pm();
		let a = slKrome([1,base], 0.1,100,0.1);
		genAssertZ1000(base.pow(p)/a, 'Делиться должно если не нацело, то хотя бы не очень надробно');


		NAtask.setEvaluationTask({
			expr: '' +
				[
					'varlog(' + base + ',' + a + ')',
					'varlog(' + base + ',' + base.pow(p)/a + ')',
				].shuffle().join('+'),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},10000);
})();
// 26849
