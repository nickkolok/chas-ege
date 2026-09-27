(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(1, 99);
		let c = sl(2, 99);
		let d = sl(1, 99);
		let e = sl(2, 99);
		let f = sl(2, 99);
		let div = [10, 100];
		genAssertIrreducible(a, c);
		genAssertIrreducible(b, f);

		NAtask.setEvaluationTask({
			expr: [['(' + a + '/' + c + ')', '(' + [b + '/' + f, b / div.iz()].iz() +
				')'].shuffle().join('*'), [d + '/' + e, d / div.iz()].iz()].shuffle().join(['+', '-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509208
