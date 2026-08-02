(function() {
	retryWhileError(function() {
		'use strict';
		let num_sqrt_x = sl(1, 9);
		let num_sqrt_y = sl(1, 9);
		let den_coef = sl(1, 18);

		let expr = ['sqrt(' + num_sqrt_x + 'x)', 'sqrt(' + num_sqrt_y + 'y)'].shuffle().join('*') +
			'/(sqrt(' + [den_coef, 'x', 'y'].shuffle().join('*') + '))';
		let variables = {x: sl(sl(2, 7), 9),y: sl(sl(2, 7), 9)};
		NAtask.setEvaluationTask({
			expr: expr,
			variables: variables,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//900800925
