(function() {
	retryWhileError(function() {
		'use strict';

		let angle1 = [30,45,60,120,135,150].iz().pm();
		let angle2 = [30,45,60,120,135,150].iz().pm();

		NAtask.setEvaluationTask({
			expr: [sl(2, 50)+'sqrt('+sl(2,3)+')'.esli(sl1()), 'cosdeg(' + (angle1 + 180 * sl(1, 2).pm()) + ')', 'sindeg(' + (angle2 + 180 * sl(1, 2).pm()) + ')'].shuffle().join(
				'*'),
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 100000);
})();
//7741402
