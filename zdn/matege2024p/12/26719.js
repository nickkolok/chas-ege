(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26719";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand].map(elem => Boolean(elem));

		let a = sl(1, 100).pm();
		let b = sl(2, 19);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		let b1 = [3, 4, 5, 7, 11, 13, b * 2].iz();
		let a1 = sl(2, 7);
		if ( b > b1) {
			a1 = 1;
		}
		genAssertIrreducible(a1, b1);
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin] + 'log(' + b + 'x)+' + arr2[maxmin] + b + 'x+' + a,
			leftEnd: '1/' + b * 2,
			rightEnd: '' + a1 + '/' + b1,
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			domain: x => x > 0,
			preference: preference,
		});
	}, 1000);
})();
//26719

