(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 10);
		let b = sl(3, 9);
		let c = a * b * b;
		NAtask.setEvaluationTask({
			expr: slKrome(b, 1, 5) + '/' + b + ['sqrt(' + a + ')', 'sqrt(' + c + ')'].shuffle().join('*'),
			//shuffleMultipliers: true,// Потому как первый множитель должен быть первым!
			randomUnaryMinus: true,
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 506508
