(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: 'sqrt((' + ['y^' + sl(2, 10, 2), 'x^' + sl(2, 10, 2), '1/'+ch * ch].shuffle().join('*') + '))',
			variables: {x: sl(sl(2, 7), 9),y: sl(sl(2, 7), 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412189
