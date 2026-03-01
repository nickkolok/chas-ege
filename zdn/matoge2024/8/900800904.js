(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 10);
		NAtask.setEvaluationTask({
			expr: 'sqrt((b^' + sl(2, 10, 2) + ')/('  + ch * ch + 'b^' + sl(2, 10, 2) + '))',
			variables: {b: sl(2, 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//900800904
