(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99).pm();
		let b = sl(1, 99).pm();
		let c = sl(2, 99);
		let d = sl(1, 99);
		let e = sl(2, 99);
		let f = sl(2, 99);
		let div = [10, 100];
		genAssertIrreducible(a, c);
		genAssertIrreducible(b, f);

		NAtask.setEvaluationTask({
			expr: ['divideColon(' + ['(' + a + '/' + c + ')', '(' + [b + '/' + f, b / div.iz()].iz() +
				')'].shuffle().join() + ')', [d + '/' + e, d / div.iz()].iz()].shuffle().join(['+', '-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//506993
