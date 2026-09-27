(function() {
	retryWhileError(function() {
		'use strict';
		let ch = sl(2, 10);
		let p = sl(2, 15);
		NAtask.setEvaluationTask({
			expr: 'sqrt((b^' + p + ')/('  + ch * ch + 'b^' + slKrome(p, 2, 15) + '))',
			variables: {b: sl(2, 9)},
			forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//900800904
