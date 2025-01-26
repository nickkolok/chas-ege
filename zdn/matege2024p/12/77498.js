(function() {
	retryWhileError(function() {
		'use strict';
		let a1 = sl(1, 9).pm();
		let a2 = sl(1, 3);
		let b1 = sl(1, 50);
		let b2 = sl(1, 19);
		let c = sl(1, 3);
		let d = sl(1, 99);
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos'];
		genAssert(!c.isPolnKvadr(), 'Корень извлекается');
		genAssert(!a2.isPolnKvadr(), 'Корень извлекается');
		NAtask.setMinimaxFunctionTask({
			expr: [a1, a1 + 'sqrt(' + a2 + ')'].iz() + sincos.iz() + '(x)' + sign.iz() + [a1, b1 + 'sqrt(' + c + ')'].iz() +
				'x' + sign.iz() + [a1 + 'pi/' + b2, 'sqrt(' + c + ')' + 'pi'].iz() + sign.iz() + d,
			leftEnd: '0',
			rightEnd: 'pi/2',
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();

//77498
//77499

