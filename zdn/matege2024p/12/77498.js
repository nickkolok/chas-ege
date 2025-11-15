(function() {
	retryWhileError(function() {
		'use strict';
		let a1 = sl(1, 9, 0.5);
		let a2 = a1 * sl(2, 18);
		let a3 = slKrome(5, 2, 6);
		let b2 = sl(1, 19);
		let c = slKrome(5, 2, 6);
		let d = sl(1, 99);
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos'];

		genAssert(!c.isPolnKvadr(), 'Корень извлекается');
		genAssert(!a2.isPolnKvadr(), 'Корень извлекается');

		NAtask.setMinimaxFunctionTask({
			expr: [
				[
					a1,
					a2 + 'sqrt(' + a3 + ')'
				].iz() + sincos.iz() + '(x)', 
				[
					a2,
					a2 + ['sqrt(' + c + ')', ''].iz()
				].iz() + 'x'
			].shuffle().join(sign.iz()) + sign.iz() + a1 + ['sqrt(' + c + ')', ''].iz() + 'pi' + [sign.iz() + d, ''].iz(),
			leftEnd: '0',
			rightEnd: 'pi/2',
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//77498
//77499
