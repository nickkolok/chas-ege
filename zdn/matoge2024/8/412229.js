(function() {
	retryWhileError(function() {
		'use strict';
		
		let sqrt_a = sl(2, 9);
		let sqrt_b = sl(2, 9);

		NAtask.setEvaluationTask({
			expr: ['sqrt(' + sqrt_a*sqrt_a + 'a^'+sl(1,9)+')', 'sqrt(' + sqrt_b*sqrt_b + 'b^'+sl(1,9)+')'].shuffle().join('*') +
			'/(sqrt(' + ['a^'+sl(1,9), 'b^'+sl(1,9)].shuffle().join('') + '))',
			variables: {a: sl(2, 9),b: sl(2, 9)},
			rulesBeforePrinting: [{ l: 'n^1', r: 'n' }],
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412229
