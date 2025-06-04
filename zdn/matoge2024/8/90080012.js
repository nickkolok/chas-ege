(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 10);
		let power = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: 'sqrt((' + [ch * ch, 'a^' + (power + sl(2, 6, 2))].shuffle().join('*') + ')/a^' + power + ')',
			variables: {a: sl(sl(2, 7), 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080012
