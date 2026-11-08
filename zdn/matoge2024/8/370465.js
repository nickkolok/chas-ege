(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 25);
		let b = sl(1, 25);

		NAtask.setEvaluationTask({
			expr: ['1/(' + [a, 'sqrt(' + b + ')'].shuffle().join('+') + ')', '1/(' + 
				[a, 'sqrt(' + b + ')'].shuffle().join('-') + ')'].shuffle().join(['+','-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//370465
