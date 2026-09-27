(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(2, 100);
		let b = slKrome(a, 2, 100);

		NAtask.setEvaluationTask({
			expr: '1/(1/' + a + ' + 1/' + b + ')',
			authors: ['Николай Авдеев'],
		});
	}, 1000);
})();
// 0xD39BF5 = 13868021
// https://oge.fipi.ru/bank/questions.php?proj=DE0E276E497AB3784C3FC4CC20248DC0&search=1&qid=D39BF5
// Обновление 26.02.2026 г.
