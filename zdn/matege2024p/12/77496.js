(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 49);
		let b = Math.abs(a) + sl(1, 49);
		let c = sl(1, 99);
		let sluchSign = sl1();
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos'];
		NAtask.setMinimaxFunctionTask({
			expr: sign[sluchSign] + a + sincos.iz() + '(x)' + sign[1 - sluchSign] + b + 'x' + sign.iz() + c,
			leftEnd: '0',
			rightEnd: ['pi/6', 'pi/4', 'pi/3', 'pi/2', '2pi/3', '3pi/4', '5pi/6', '3pi/2'].iz(),
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

//77496
//77497
