(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 49);
		let b = Math.abs(a) + sl(1, 49);
		let c = sl(1, 99);
		let sluchSign = sl1();
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos', 'tg', 'ctg'];
		let interval = ['pi/6', 'pi/4', 'pi/3', 'pi/2', '2pi/3', '3pi/4', '5pi/6', '7pi/6', '5pi/4', '4pi/3', '3pi/2', '5pi/3', '7pi/4', '11pi/6'];
		NAtask.setMinimaxFunctionTask({
			expr: sign[sluchSign] + a + sincos.iz() + '(x)' + sign[1 - sluchSign] + b + 'x' + sign.iz() + c,
			leftEnd: [['', '-'].iz() + interval.iz(), '0'].iz(),
			rightEnd: [interval.iz(), '0'].iz(),
			primaryStep: 0.001,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

//77496
//77497
