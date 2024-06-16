(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 20);
		let b = sl(1, 15);
		let c = sl(1, 20).pm();
		let d = sl1();
		let k = sl(0, 10).pm();
		let g = 1;
		if (d == 0) {
			g = sl(2, 5);
			k = 0;
			a = 1;
		}
		let l = sl(-20.5, 1, 0.5);
		NAtask.setMinimaxFunctionTask({
			expr: a + 'log(x+' + b + ')^' + g + '+' + c + 'x+' + k,
			leftEnd: '' + l,
			rightEnd: '0',
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26717
