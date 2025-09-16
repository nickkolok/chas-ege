(function() {
	retryWhileError(function() {
		'use strict';
		let x = sl(1, 10);
		let y = sl(2, 10);
		let divider = sl(5, 13);
		let dividendA = sl(1, 81);
		let dividendB = sl(1, 81);
		genAssert(dividendA!=dividendB, 'a не должен равняться b');
		genAssertIrreducible(dividendA, divider, 'Дробь должна быть несократима');
		genAssertIrreducible(dividendB, divider, 'Дробь должна быть несократима');
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + x * x + '*a^2' + ['+', '-'].iz() +
				2 * x * y + '*a*b' + '+' + y * y + '*b^2)',
			variables: {a: [dividendA, dividendA + "/"+divider].iz(),
				b: [dividendB, dividendB + "/"+divider].iz()},
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//412197
