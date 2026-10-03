(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77490";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand].map(elem => Boolean(elem));

		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(0.5,4,0.5).pm() + 'x^2',
				'' +  sl(1,30).pm() + 'x',
				'' +  sl(1,30).pm() + 'ln(x)',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			domain: x => x > 0,
			preference: preference,
		});
	}, 200);
})();
//77490
