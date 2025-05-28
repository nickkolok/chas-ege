(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20);
		let b = sl(1, 15);
		let k = sl(-10, 10);
		let c = a;
		if (sl1()) {
			k = 0;
			a = 1;
		}
		let l = -b - 1 - sl(0, 1.5, 0.5);
		let arr1 = ['+', '-'];
		arr1.shuffle();
		NAtask.setMinimaxFunctionTask({
			expr: arr1[0] + [a + 'log(x+' + b + ')', 'log((x+' + b + ')^' + c + ')'].iz() + '+' + arr1[1] + c + 'x+' + k,
			leftEnd: '' + l,
			rightEnd: '0',
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();

//26717
