(function() {
	retryWhileError(function() {
		'use strict';
		let b = sl(3, 9);
		let a = sl(5, 81);
		NAtask.setEvaluationTask({
			expr: '(' + 'sqrt(' + a + ')' + '+' +b+' ) * (' + 'sqrt(' + a + ')' + '-' +b+' ) ',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//369495
