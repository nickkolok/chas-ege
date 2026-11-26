(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const a = sl(3, 50);
		const b = sl(1, 100);
		const direction = (1).pm();
		const rootSign = (1).pm();
		const isMinimum = direction * rootSign > 0;
		NAtask.setMinimaxFunctionTask({
			expr: direction * a + 'tan(x) - ' + direction * 2 * a + 'x + ' +
				direction * rootSign * a / 2 + ' pi + ' + b,
			leftEnd: rootSign > 0 ? '0' : '-pi/3',
			rightEnd: rootSign > 0 ? 'pi/3' : '0',
			primaryStep: Math.PI / 12,
			secondaryStep: Math.PI / 1200,
			forbidMinY: !isMinimum,
			forbidMaxY: isMinimum,
			authors: ['Алендарь Сергей', 'Николай Авдеев'],
		});
	}, 100);
})();
// 26704
