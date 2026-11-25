(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 50);
		let b = sl(1, 300);
		let c = sl(1, 50);
		let arr1 = [' ', '-'];
		let arr2 = ['+', '-'];
		let key = "77438";
		let func = [arr1.iz() + 'x^3', arr1.iz() + a + 'x^2', arr1.iz() + b + 'x']
		func = getListedPreference(key, [{
			preference: 'cubic',
			preferenceValue: [arr1.iz() + 'x^3', arr1.iz() + b + 'x'].shuffle(),
		}, {
			preference: 'cubic_and_quadratic',
			preferenceValue: [arr1.iz() + 'x^3', arr1.iz() + a + 'x^2', arr1.iz() + b + 'x'].shuffle(),
		}], func.iz(sl(2, 3)));

		NAtask.setMinimaxFunctionTask({
			expr: func.join('+') + arr2.iz() + c,
			leftEnd: '-' + sl(1, 9, 0.5),
			rightEnd: '' + sl(1, 9, 0.5),
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY: getListedPreference(key, {
				preference: 'maximum',
				preferenceValue: true,
			},false),
			forbidMaxY: getListedPreference(key, {
				preference: 'minimum',
				preferenceValue: true,
			}, false),
		});
	}, 10);
})();
//77438
