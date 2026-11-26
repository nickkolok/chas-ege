(function() {
	retryWhileError(function() {
		'use strict';
		const preference = ['pow', 'sqrt'];
		const v = getSelectedPreferenceFromList('77455', preference);
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,5) + ['x^(3/2)', 'x sqrt(x)'][v],
				sl(1,20) + 'x',
				sl(0,100)
			].joinPlusMinus(),
			preference: [preference],
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//77455
