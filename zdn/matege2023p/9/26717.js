(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 20);
		let b = sl(1, 15);
		let c = sl(1, 20).pm();
		let d = sl(0, 10).pm();
		let l = sl(-20.5, 1, 0.5);
		NAtask.setMinimaxFunctionTask({
			expr: a+'log(x+'+b+')+'+c+'x'+d,
			leftEnd: ''+l,
			rightEnd: '0',
			primaryStep: 0.001,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26717

