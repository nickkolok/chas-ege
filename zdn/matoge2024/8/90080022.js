(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 25);
		let b = slKrome(isPolnKvadr, 2, 25);
		let sign = ['+','-'];

		NAtask.setEvaluationTask({
			expr: ['sqrt((' + [a + 'sqrt(' + b + ')', sl(1,99)].shuffle().join(sign.iz()) + ')^' + 2 + ')',
				a + 'sqrt(' + b + ')'].shuffle().join(sign.iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//90080022
