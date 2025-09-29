(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(2, 99);
		let c = sl(1, 99);
		let d = sl(2, 99);
		let e = sl(1, 99);
		let f = sl(2, 99);
		genAssert(a.nod(b) == 1, 'Дробь a/b должна быть несократима');
		genAssert(c.nod(d) == 1, 'Дробь c/d должна быть несократима');
		genAssert(e.nod(f) == 1, 'Дробь e/f должна быть несократима');

		NAtask.setEvaluationTask({
			expr: ['divideColon(' + ['(' + a + '/' + b + ')', '(' + e + '/' + f + ')'].shuffle().join() + ')', 
				'(' + c + '/' + d + ')'].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//510310
