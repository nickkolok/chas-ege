(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '12176147'; 
		let preference = [
			'trueStatements',   // показывать верные
			'falseStatements',  // показывать неверные
			'mixedTrue',        // выбрать 1–2 верных
			'mixedFalse'        // выбрать 1–2 неверных
		];
		let rand = getSelectedPreferenceFromList(key, preference);

		let seekTrue = (rand === 0 || rand === 2);
		let nCorrect = (rand === 2 || rand === 3) ? sl(1, 2) : 2;
		let nWrong = 4 - nCorrect;

		let statements = [
			'Если владелец карты имеет постоянную скидку, то установленный лимит им достигнут.',
			'Если владелец карты не имеет скидки, то установленный лимит им уже достигнут.',
			'Если у покупателя есть дисконтная карта, то ему обязательно предоставят скидку на его покупки.',
			'Если у покупателя есть карта, но нет скидки на покупки, то установленный лимит ещё не достигнут.'
		];

		let trueIndices = [0, 3];
		let falseIndices = [1, 2];

		let correct = trueIndices.map(i => statements[i]);
		let wrong = falseIndices.map(i => statements[i]);

		if (rand === 2) {
			correct = chas2.utils.sample(correct, nCorrect);
			wrong = chas2.utils.sample(wrong, nWrong);
		} else if (rand === 3) {
			wrong = chas2.utils.sample(wrong, nCorrect);
			correct = chas2.utils.sample(correct, nWrong);
			[correct, wrong] = [wrong, correct];
			seekTrue = false;
		}

		NAtask.setTask({
			text: 'Совершая покупки, владелец дисконтной карты накапливает баллы. Когда сумма баллов достигает установленного лимита, он получает постоянную скидку. ' +
				'Выберите одно или несколько утверждений, которые ' + (seekTrue ? 'верны' : 'неверны') + ' при приведённом условии. ' +
				'В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ' +
				'Если ответов несколько, записывайте их номера в порядке возрастания.',
			answers: seekTrue ? correct : wrong,
			wrongAnswers: seekTrue ? wrong : correct,
			preference: preference,
		});

		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
//12176147
//zer00player
