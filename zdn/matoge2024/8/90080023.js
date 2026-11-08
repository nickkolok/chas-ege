(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: '(' + 
				[a + ['^' + sl(2, 9).pm(),''].iz() , a + '^' + sl(2, 9).pm()].shuffle().join('*') + ')^' +
				sl(2, 9).pm() + '/(' + 
				[a + '^' + sl(2, 9).pm() , a + ['^' + sl(2, 9).pm(),''].iz()].shuffle().join('*') + ')^' +
				sl(2, 9).pm(),
				forbiddenAnswers: [1],
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080023
