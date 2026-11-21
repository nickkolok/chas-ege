(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['legacy', 'fraction', 'division'];
	let variant = getSelectedPreferenceFromList('10000801', preference);
	if (variant) {
		retryWhileError(function () {
			let a = sl(1, 99) / 10;
			let b = sl(1, 99) / 10;
			let p = sl(-7, 7);
			let q = sl(-7, 7);
			let numerator = a + '*10^(' + p + ')';
			let denominator = b + '*10^(' + q + ')';
			let expr = math.parse(variant === 1 ? '(' + numerator + ')/(' + denominator + ')' : 'divideColon(' + numerator + ',' + denominator + ')');
			let answer = expr.evaluate();
			genAssertZ1000(answer * 10);
			genAssert(answer >= 0.0001 && answer < 1000000000);
			NAtask.setTask({text: 'Найдите значение выражения $$' + expr.toTex().allDecimalsToStandard(true) + '$$', answers: answer.toFixedLess(4), preference});
		}, 10000);
		return;
	}
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 9);
		let b = a * sl(2, 9) * 0.1;
		NAtask.setEvaluationTask({
			expr: '(' + b + '*10^' + sl(1, 5) + ')/(' + a + '*10^' + sl(-5, -1) + ')',
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//10000801

