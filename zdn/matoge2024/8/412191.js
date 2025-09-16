(function() {
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: 'sqrt(' + [ '(-a)^'+sl(2, 10,2) ,'a^'+ sl(2, 10,2) ].shuffle().join('*')+')',
			variables: {a: sl(2, 9)},
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412191
