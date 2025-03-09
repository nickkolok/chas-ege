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
		genAssert(!c.isPolnKvadr(), 'Корень извлекается');
		genAssert(!a2.isPolnKvadr(), 'Корень извлекается');
		NAtask.setMinimaxFunctionTask({
<<<<<<< HEAD
			expr: [a1, a2 * sl(2, 3) + ['sqrt(' + a3 + ')', ''].iz()].iz() + sincos.iz() + 
				'(x)' + sign.iz() + [a2, a2 + ['sqrt(' + c + ')', ''].iz()].iz() + 
				'x' + sign.iz() + a1 + ['sqrt(' + c + ')', ''].iz() + 'pi' + [sign.iz() + d, ''].iz(),
=======
			expr: [a1, a1 + 'sqrt(' + a2 + ')'].iz() + sincos.iz() + '(x)' + sign.iz() + [a1, b1 + 'sqrt(' + c + ')'].iz() +
				'x' + sign.iz() + [a1 + 'pi/' + b2, 'sqrt(' + c + ')' + 'pi'].iz() + sign.iz() + d,
>>>>>>> 369f33997482ea3e62407c02ec1ac8d86d627a89
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

