(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 6);
		let b = sl(3, 10);
		let c = a * b * b;
		let d=1,e=1;
		if (sl1()) {
		    d = sl(2, 15);
		} else {
		    e = sl(2, 15);
		}
		NAtask.setEvaluationTask({
			expr: d + 'sqrt(' + c + ')' + '/' + e + 'sqrt(' + a + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
// 509590 509770

