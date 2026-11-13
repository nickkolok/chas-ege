(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['commonBase', 'relatedBases', 'productBase'];
	let variant = getSelectedPreferenceFromList('508353', preference);
	if (variant) {
		retryWhileError(function () {
			let base = sl(2, 9);
			let other = slKrome(base, 2, 9);
			let a = sl(2, 10);
			let b = sl(2, 10);
			let k = sl(-4, 4);
			let expr;
			if (variant === 1) {
				let p = sl(2, 3);
				let q = sl(1, 3);
				expr = (base ** p) + '^' + a + '/' + (base ** q) + '^' + b;
				if (sl1()) {
					let exponent = p * a - q * b - k;
					genAssert(exponent !== 0 && exponent !== 1);
					expr += '/' + base + '^(' + exponent + ')';
				}
			} else {
				genAssert(a > 2 && a + k !== 0 && a + k !== 1);
				expr = (base * other) + '^' + a + '/(' + base + '^' + (a + k) + '*' + other + '^' + (a - 1) + ')';
			}
			NAtask.setEvaluationTask({expr, preference});
		}, 10000);
		return;
	}
	retryWhileError(function() {
		'use strict';
		let c = sl(2, 9);
		NAtask.setEvaluationTask({
			expr: ['(' + c + '^' + sl(1, 9).pm() + ')' + '^' + sl(2, 5).pm(), c + '^' + sl(-15, -2)].shuffle().join('/'),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
			preference,
		});
	}, 10000);
})();
//508353

