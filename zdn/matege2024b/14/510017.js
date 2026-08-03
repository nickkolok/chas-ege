(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(1, 99);
		let c = sl(1, 99);
		let div = [10,100];

		NAtask.setEvaluationTask({
			expr: [ ['(',''].iz() + ['(' + a / div.iz() + ')', '(' + b / div.iz() + ')'].shuffle().join(['+','-'].iz()) + [')',''].iz(), 
				'(' + c / div.iz()  + ')'].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//510017
