(function() {
	retryWhileError(function() {
		'use strict';
		let a1 = sl(1, 45, 0.5);
		let a2 = a1 * sl(1, 2);
		let a3 = sl(2, 3);
		let b2 = sl(1, 45);
		let c = sl(2, 3);
		let d = sl(1, 99);
		let sign = ['+', '-'];
		let sincos = ['sin', 'cos'];

		NAtask.setMinimaxFunctionTask({
			expr: [
				[
					a1,
					a1 + 'sqrt(' + a3 + ')'
				].iz() + sincos.iz() + '(x)', [
					a2,
					a2 + ['sqrt(' + c + ')', ''].iz()
				].iz() + 'x'
			].shuffle().join(sign.iz()) + sign.iz() + a1 + ['sqrt(' + c + ')', ''].iz() + 'pi' + [sign.iz() + d, ''].iz(),
			leftEnd: '0',
			rightEnd: 'pi/2',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//77498
//77499

