(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(2,9);
		let b = slKrome(a,2,9);
		let c1 = sl(2,9);
		let c2 = sl(c1+1,10);
		let c3 = sl(2,9);
		let c4 = sl(c3+1,10);
		genAssert(c1.nod(c2)==1, 'Дробь c1/c2 должна быть несократима');
		genAssert(c3.nod(c4)==1, 'Дробь c3/c4 должна быть несократима');

		let c5 = sl(3,30);

		NAtask.setEvaluationTask({
			expr: '(' + a + '^(' + c1 + '/' + c2 + ') * ' + b + '^(' + c3 + '/' + c4 + '))^('+ (c2 * c4) + ') / (' + (a*b) + '^' + c5 +')',
			authors: ['Николай Авдеев'],
		});
	},100000);
})();
