(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(1, 99);
		let c = sl(1, 99);
		let div = [10,100];

		NAtask.setEvaluationTask({
			expr: ['divideColon(' + ['(' + a / div.iz() + ')', '(' + b / div.iz() + ')'].shuffle().join() + ')', 
				'(' + c / div.iz()  + ')'].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//90080024
