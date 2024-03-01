(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setEvaluationTask({
			expr: 'a^sl(4,21) * divideColon(a^' + sl(4,21).pm() + ',a^sl(4,21))',
			variables: {a : sl(sl(2,7),9)}, // Смещаемся от вечных двоек
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	}, 100);
})();
//412184
