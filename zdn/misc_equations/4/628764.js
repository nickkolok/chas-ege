(function() {
	retryWhileError(function() {
		'use strict';

		var b = sluchch(1, 9).pm();
		var a = sluchch(1, 9).pm();
		var k = sluchch(1, 9).pm();
		var c = (1).pm();

		var sqrtD = (4 * (a - c * k * b) + b * b).sqrt();
		genAssertZ1000(sqrtD, "Корень из дискриминанта не извлекается");

		var x = [];

		var x1 = (b - 2 * c * k - sqrtD) / 2;
		genAssertZ1000(x1, "Один из корней очень нецелый");
		x.pushIf(x1, k + c * x1 >= 0 && a + b * x1 >= 0);

		var x2 = (b - 2 * c * k + sqrtD) / 2;
		genAssertZ1000(x2, "Один из корней очень нецелый");
		x.pushIf(x2, k + c * x2 >= 0 && a + b * x2 >= 0 && x1 != x2);

		genAssertNonempty(x, "А корней-то и нет!");

		chas2.task.setAdditiveEquationTask({
			parts: ['\\sqrt{' + [a, b + 'x'].slag0() + '}', -k, -c + 'x'],
			roots: x,
			enablePartsSubtraction: 1,
			handleMultipleRoots: 'randomExceptList',
			forceMultipleRoots: sl(4),
		});

	});
})();
// 628738 628764
//Сергей Алендарь
