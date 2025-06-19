(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 25);
		let b = sl(1, 25);

		NAtask.setEvaluationTask({
			expr: 'sqrt((' + [a + 'sqrt(' + b + ')', 'sl(1,99)'].shuffle().join('-') + ')^' + 2 + ')+' + a + 'sqrt(' + b + ')',
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080022
