(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['commonBase', 'relatedBases', 'productBase'];
	let variant = getSelectedPreferenceFromList('508353', preference);
	if (variant) {
		retryWhileError(function () {
			let base = sl(2, 12);
			let other = slKrome(base, 2, 12);
			let a = variant === 2 ? slKrome([0, 1], -24, 24) : sl(2, 24);
			let b = variant === 2 ? slKrome([0, 1], -24, 24) : sl(2, 24);
			let c = slKrome([0, 1], -24, 24);
			let expr;
			if (variant === 1) {
				let p = sl(1, 6);
				let q = sl(1, 6);
				let r = sl(1, 6);
				expr = (base ** p) + '^' + a + '/' + (base ** q) + '^' + b;
				if (sl1()) {
					let divisor = (base ** r) + '^(' + c + ')';
					expr = sl1() ? 'divideColon(' + expr + ',' + divisor + ')' : expr + '/' + divisor;
				}
			} else {
				let powers = base + '^' + a + '*' + other + '^' + b;
				let product = (base * other) + '^(' + c + ')';
				expr = sl1() ? powers + '/' + product : product + '/(' + powers + ')';
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

