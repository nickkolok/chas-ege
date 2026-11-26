(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const a = sl(1, 30);
		const b = sl(1, 100);
		NAtask.setMinimaxFunctionTask({
			expr: a * 6 + 'cos(x) + ' + a * 3 + ' sqrt(3) x - ' + a + ' sqrt(3) pi + ' + b,
			leftEnd: ['0', 'pi/6', 'pi/4'].iz(),
			rightEnd: ['pi/3', 'pi/2'].iz(),
			primaryStep: Math.PI / 12,
			secondaryStep: Math.PI / 1200,
			forbidMinY: true,
			authors: ['Николай Авдеев'],
		});
	}, 100);
})();
// 26692
