(function() {
	retryWhileError(function() {
		let a = sluchch(1, 10).pm();
		let c = sluchch(1, 40).pm();
		let b = (a + c).pm();
		let v = b ** 2 - 4 * a * c;
		let d = (-b + Math.sqrt(v)) / (2 * a);
		let e = -(b + Math.sqrt(v)) / (2 * a);
		genAssert(v >= 0, 'Подкоренное выражение не может быть отрицательным');
		genAssert(b != 0, 'Нужно два решения');
		genAssertZ1000(d, 'Корень не должен быть слишком дробным');
		genAssertZ1000(e, 'Корень не должен быть слишком дробным');
		NAtask.setEquationTask({
			parts: [a + 'x^2+' + b + 'x+' + c, 0],
			roots: [d, e],
			handleMultipleRoots: 'randomExceptList',
		});
	}, 20);
})();
//VeronikaKit
//РешуОГЭ 311438
