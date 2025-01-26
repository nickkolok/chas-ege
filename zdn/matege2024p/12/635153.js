(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20, 2);
		let b = sl(1, 25);
		let sign = ['+', '-'];
		let triangleSideRatios = ['sin', 'cos', 'tg', 'ctg'].iz();
		let start = ['-2pi', '-pi', '-pi/2', '-pi/3', '-pi/4', '0'].iz();
		let end = ['2pi', 'pi', 'pi/2', 'pi/3', 'pi/4', '0'].iz();
		NAtask.setMinimaxFunctionTask({
			expr: '1/((' + triangleSideRatios + '(x))^2' + sign.iz() +
				a + triangleSideRatios + '(x)' + sign.iz() + b + ')',
			leftEnd: start,
			rightEnd: end,
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			forbidAnalys: true,
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();

//635153


