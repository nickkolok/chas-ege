(function() {
	retryWhileError(function() {
		'use strict';
		let a1 = sl(1, 9, 0.5).pm();
		let a2 = a1 * sl(2, 6);
		let a3 = slKrome(5, 1, 6);
		let b2 = sl(1, 19);
		let c = slKrome(5, 1, 6);
		let d = sl(1, 99);
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos'];
		NAtask.setMinimaxFunctionTask({
			expr: [a1, a2 * sl(2, 3) + ['sqrt(' + a3 + ')', ''].iz()].iz() + sincos.iz() + 
				'(x)' + sign.iz() + [a2, a2 + ['sqrt(' + c + ')', ''].iz()].iz() + 
				'x' + sign.iz() + a1 + ['sqrt(' + c + ')', ''].iz() + 'pi' + [sign.iz() + d, ''].iz(),
			leftEnd: '0',
			rightEnd: 'pi/2',
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

//77498
//77499

