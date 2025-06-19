(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 15).pm();
		let b = sl(2, 15).pm();
		let c = sl(2, 15).pm();

		NAtask.setEvaluationTask({
			expr: 'sqrt('+ [a*b, b*c, c*a].shuffle().join('*') +')',
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//337700
