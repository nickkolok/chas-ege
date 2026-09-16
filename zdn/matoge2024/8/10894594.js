(function() {
	retryWhileError(function() {
		'use strict';
		
		// Параметры: a ± √b в знаменателях
		let a = sl(2, 10);
		let b = sl(2, 50);
		
		// Проверяем, что b не является полным квадратом
		genAssert(!isPolnKvadr(b), 'b не квадрат');

		// Создаём знаменатели с перемешанными слагаемыми и случайными знаками
		let denomTerms = [a, 'sqrt(' + b + ')'].shuffle();
		
		let denom1 = ['', '-'].iz() + denomTerms.join(['+', '-'].iz());
		let denom2 = ['', '-'].iz() + denomTerms.join(['+', '-'].iz());
		
		// Выражение с полностью случайными знаками и порядком
		NAtask.setEvaluationTask({
			expr: [
				'1/(' + denom1 + ')',
				'1/(' + denom2 + ')'
			].shuffle().join(['+', '-'].iz()),
			authors: ['Николай Авдеев'],
			forbiddenAnswers: [0],
		});
	}, 1000);
})();
// 0xA63D02 = 10894594
// https://oge.fipi.ru/bank/questions.php?proj=DE0E276E497AB3784C3FC4CC20248DC0&search=1&qid=A63D02
// Обновление 26.02.2026 г.
