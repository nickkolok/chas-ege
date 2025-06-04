(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: 'sqrt((' + [ch * ch, 'x^' + sl(2, 10, 2)].shuffle().join('*') + ')/y^' + sl(2, 10, 2) + ')',
			variables: {x: sl(sl(2, 7), 9), y: sl(sl(2, 7), 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080013
