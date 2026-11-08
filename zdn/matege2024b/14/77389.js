(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(2, 99);
		let wholeNumA = sl(1, 9);
		let c = sl(1, 99);
		let d = sl(2, 99);
		let wholeNumC = sl(1, 9);
		let e = sl(1, 99);
		let f = sl(2, 99);
		let wholeNumE = sl(1, 9);
		let div = [10, 100];

		genAssertIrreducible(a, b);
		genAssertIrreducible(c, d);
		genAssertIrreducible(e, f);

		NAtask.setEvaluationTask({
			expr: 'divideColon(' + [
				'(' +
					[
						[
							'mixed(' + wholeNumA + ',' + a + ',' + b + ')',
							a + '/' + b,
							sl(1, 999) / div.iz()
						].iz(),
						[
							'mixed(' + wholeNumC + ',' + c + ',' + d + ')',
							c + '/' + d
						].iz()
					].shuffle().join(['+', '-'].iz()) +
				')',
				[
						'mixed(' + wholeNumE + ',' + e + ',' + f + ')',
						e + '/' + f,
						sl(1, 999) / div.iz()
				].iz()
			].shuffle().join() + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//77389
