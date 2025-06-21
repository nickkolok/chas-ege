(function() {
	retryWhileError(function() {
		'use strict';
		let x = sl(1, 10);
		let y = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + x * x + '*a^2' + ['+', '-'].iz() +
				2 * x * y + '*a*b' + '+' + y * y + '*b^2)',
			variables: {a: sl(2, 9),b: sl(2, 9).pm()},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412197
