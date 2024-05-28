(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 50);
		let b = sl(1, 100);
		let c = sl(1,50);
		let arr1 = ['+', '-'];
		let maxmin1 = sl1();
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin1] + a + 'tan(x)' + arr1[maxmin2] + a+ 'x' + ['',arr1.iz()+c+'pi'].iz() + arr1.iz() + b, //пропускает часть с pi, так как из-за неё лиюо возникает ошибка либо не загружается
			leftEnd: ['0','-pi/4'].iz(),
			rightEnd: ['0','pi/4'].iz(),
			primaryStep: 0.00001,
			secondaryStep: 0.000001,
			authors: ['Алендарь Сергей'],
		});
	}, 10);
})();
//26704

