(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 9, 0.5);
		let b = sl(1, 100);
		let arr1 = ['+', '-'];
		let arr2 = [' ', '-'];
		let maxmin1 = sl(0, 1);
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: '' + arr2[maxmin1] + (a * 2) + 'tan(x)' + arr1[maxmin2] + (a * 4) + 'x' + arr1[maxmin1] + a + 'pi' + arr1[
				maxmin2] + b,
			leftEnd: '-pi/3',
			rightEnd: 'pi/3',
			primaryStep: 0.001,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
