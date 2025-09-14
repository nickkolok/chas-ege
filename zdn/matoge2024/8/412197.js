(function() {
	retryWhileError(function() {
		'use strict';
		let x = sl(1, 10);
		let y = sl(2, 10);
		let divider = sl(5, 13);
		let dividendA = sl(1, 9);
		let dividendB = sl(1, 9);
		genAssert(dividendA.nod(divider)==1, 'Дробь должна быть несократима');
		genAssert(dividendB.nod(divider)==1, 'Дробь должна быть несократима');
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + x * x + '*a^2' + ['+', '-'].iz() +
				2 * x * y + '*a*b' + '+' + y * y + '*b^2)',
			variables: {a: sl(1, 25) + [1, dividendA + "/"+divider].iz(),
				b: sl(1, 25).pm() + [1, dividendB + "/"+divider].iz()},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412197
