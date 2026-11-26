(function() {
	retryWhileError(function() {
		'use strict';
		const v = getSelectedPreferenceFromList('77455', ['pow', 'sqrt']);
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,5) + ['x^(3/2)', 'x sqrt(x)'][v],
				sl(1,20) + 'x',
				sl(0,100)
			].joinPlusMinus(),
			preference: [['pow', 'sqrt']],
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//77455
