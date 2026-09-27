(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77486";
		let preference1 = ['positive_pow', 'negative_pow'];
		let preference2 = ['maximum', 'minimum'];
		let preference3 = ['even_power', 'odd_power'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let rand3 = getSelectedPreferenceFromList(key, preference3);

		let pow = sl(2, 30, 2) * [1, -1][rand1] + [0, 1][rand3];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];
		let b = sl(1,30).pm();

		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,30).pm() + 'x',
				'ln((x +' + b +')^' + pow + ')',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2, preference3],
			domain: x => x > - b
		});
	}, 200);
})();
//77486
