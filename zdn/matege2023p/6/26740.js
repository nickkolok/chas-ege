(function() {
	retryWhileError(function() {
		'use strict';

		let base = sl(2,9);
		let a = base.pow(sl(1,9));
		let b = base.pow(sl(1,9));
		genAssert(a !== b, 'Основания степеней не должны совпадать');
		genAssert(a < 200 && b < 200, 'Числа не должны быть слишком большими');
		let c1 = sl(2,9);
		let c2 = sl(c1+1,10);
		genAssertIrreducible(c1, c2);
		let c3 = sl(2,9);
		let c4 = sl(c3+1,10);
		genAssertIrreducible(c3, c4);

		NAtask.setEvaluationTask({
			expr: '' + a + '^(' + c1 + '/' + c2 + ') * ' + b + '^(' + c3 + '/' + c4 + ')',
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},10000000);
})();
