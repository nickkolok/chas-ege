(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		var a = [2, 4, 5, 8, 10, 20, 25, 50, 100].iz();
		var c = [2, 4, 5, 8, 10, 20, 25, 50, 100].iz();
		var b = sluchch(1, 9).pm();
		let root = (1 - b * c) / (a * c);
		genAssertAlmostInteger(root * 100)

		chas2.task.setEquationTask({
			parts: [c, '\\frac{' + 1 + '}{' + a + 'x+' + b + '}'],
			roots: root,
			enablePartsSubtraction: 1,
		});
	});
})();

//77384
//Белозоров Никита
