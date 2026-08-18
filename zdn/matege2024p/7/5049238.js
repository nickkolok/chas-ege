(function() {
	retryWhileError(function() {
		'use strict';

		let base = sl(2, 9);
		let outerBase = slKrome(base, 2, 9);
		let pow = sl(2, 3);
		let num = base.pow(pow - 1);
		let den = sl(2, 20);
		genAssertIrreducible(num, den);

		NAtask.setEvaluationTask({
			expr: 'varlog(' + outerBase + ',' + base * den + ')/varlog(' + outerBase + ',' + base + ')' +
				'+varlog(' + base + ',' + num + '/' + den + ')',
			authors: ['Надежда'],
		});
	}, 10000);
})();
//5049238
