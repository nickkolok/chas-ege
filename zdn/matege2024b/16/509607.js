(function() {
	retryWhileError(function() {
		'use strict';
		let c = sl(2, 20);
		let znak = (1).pm();
		NAtask.setEvaluationTask({
			expr: ['(' + c + '^' + znak * sl(1, 10) + '*' + c + '^' + (-znak) * sl(1, 10) + ')', c + '^' + sl(1, 10).pm()].shuffle()
				.join('/'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//509607

