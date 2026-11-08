(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(2, 99);
		let c = sl(1, 99);
		let d = sl(2, 99);
		let e = sl(1, 99);
		let f = sl(2, 99);
		genAssertIrreducible(a, b);
		genAssertIrreducible(c, d);
		genAssertIrreducible(e, f);
		
		NAtask.setEvaluationTask({
			expr: ['divideColon(' + a + '/' + b + ',' + c + '/' + d + ')',
				'(' + e + '/' + f + ')'].shuffle().join(['+','-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//510997
