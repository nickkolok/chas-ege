(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['legacy', 'largeAnswer'];
	let variant = getSelectedPreferenceFromList('511746', preference);
	if (variant) {
		let expr = math.parse('(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5));
		NAtask.setTask({text: 'Найдите значение выражения $$' + expr.toTex().allDecimalsToStandard(true) + '$$', answers: expr.evaluate(), preference});
		return;
	}
	retryWhileError(function() {
		'use strict';
		NAtask.setEvaluationTask({
			expr: '(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5) + '+(-10)^' + sl(0, 5),
			//forbiddenAnswers: [0],
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();
//511746

