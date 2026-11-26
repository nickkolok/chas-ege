(function() {
	retryWhileError(function() {
		'use strict';
		const preference = ['pow', 'sqrt'];
		const v = getSelectedPreferenceFromList('77460', preference);
		let a = sl(1, 30, 0.5).pm();
		let b = sl(1, 30, 0.5);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr1[maxmin] + b + ' x ' + arr2[maxmin] + [' x^(3/2)', ' x sqrt(x)'][v],
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 1,
			secondaryStep: 0.001,
			preference: [preference],
			authors: ['Алендарь Сергей'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 10000);
})();
//77460

