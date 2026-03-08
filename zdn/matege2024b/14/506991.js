(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 50);
		let b = [a + sl(1, 49), sl(1, 99)];
		let wholeNumA = sl(1, 9);
		let c = sl(1, 50);
		let d = [c + sl(1, 49), sl(1, 99)];
		let wholeNumC = sl(1, 9);
		let e = sl(1, 50);
		let f = [e + sl(1, 49), sl(1, 99)];
		let wholeNumE = sl(1, 9);
		let div = [10, 100];

		genAssertIrreducible(a, b[0]);
		genAssertIrreducible(c, d[0]);
		genAssertIrreducible(e, f[0]);
		genAssertIrreducible(a, b[1]);
		genAssertIrreducible(c, d[1]);
		genAssertIrreducible(e, f[1]);

		NAtask.setEvaluationTask({
			expr: [
				'(' + [
					'mixed(' + wholeNumA + ',' + a + ',' + b[0] + ')',
					a + '/' + b[1],
					sl(1, 999) / div.iz()
				].iz() + ')' + ['+', '-'].iz() +
				'(' + [
					'mixed(' + wholeNumC + ',' + c + ',' + d[0] + ')',
					c + '/' + d[1]
				].iz() + ')', ['(', 'forceBrackets(' + '-'].iz() + [
					'mixed(' + wholeNumE + ',' + e + ',' + f[0] + ')',
					e + '/' + f[1],
					sl(1, 999) / div.iz()
				].iz() + ')'
			].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//506991

