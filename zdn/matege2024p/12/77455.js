(function() {
	retryWhileError(function() {
		'use strict';
		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'];
		if (nabor.preferences && "77455" in nabor.preferences){
			xsqrtx = [xsqrtx[nabor.preferences["77455"]]];
		}
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,5) + xsqrtx.iz(),
				sl(1,20) + 'x',
				sl(0,100)
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
		});
	}, 200);
})();
//77455
