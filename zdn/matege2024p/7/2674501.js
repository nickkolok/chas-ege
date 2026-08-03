(function() {
	retryWhileError(function() {
		'use strict';
		let num = sl(2, 5).pow(sl(1, 5));
		let pow1 = sl(2, 20);
		let pow2 = slKrome(pow1, 2, 20);
		let pow3 = slKrome([pow1, pow2], 2, 20);
		NAtask.setEvaluationTask({
			expr: ['(nthRoot(' + num + ',' + pow1 + ')' , 'nthRoot(' + num + ',' + pow2 + ')',num].shuffle().join('*')+')/nthRoot(' + num + ',' + pow3 + ')',
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 10000);
})();
//2674501
