(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 20);
		let b = sl(1, 15);
		let c = sl(1, 20).pm();
		let l = sl(-20.5, 1, 0.5);
		let arr1 = ['+', '-'];
		let maxmin1 = sl1();
		NAtask.setMinimaxFunctionTask({
			expr: arr1[sl1()]+'log('+b+'x)+'+c+'x+'+a,
			leftEnd: ''+l,
			rightEnd: '0',
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//26719

