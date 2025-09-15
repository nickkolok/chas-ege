(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 9);
		let e1 = sl(2, 10, 2);
		let e2 = sl(2, 10, 2);

		NAtask.setEvaluationTask({
			expr: 'sqrt(' + ch * ch/ + [100, 1].iz() + [ 'a^' + e1, 'b^' + e2].shuffle().join('') + ')',
			variables: {a: sl(sl(2, 7), 9),b: sl(sl(2, 7), 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080020
