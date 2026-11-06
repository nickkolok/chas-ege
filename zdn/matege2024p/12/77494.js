(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 49);
		let b = a * 2;
		let c = sl(1, 99);
		let d = sl(1, 99);
		let sluchSign = sl1();
		let sign = ['+', '-'];
		let interval = ['pi/3', 'pi/4', 'pi/6'];
		NAtask.setMinimaxFunctionTask({
			expr: sign[sluchSign] + a + 'tg(x)' + sign[1 - sluchSign] + b + 'x' + sign.iz() + c + 'pi' + ['/2', ''].iz() +
				sign.iz() + d,
			leftEnd: '-' + interval.iz(),
			rightEnd: interval.iz(),
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//77494 
//77495
