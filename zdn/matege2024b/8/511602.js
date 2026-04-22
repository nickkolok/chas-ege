(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511602';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let female = sklonlxkand(om.femaleNames.iz(2));
		let male = sklonlxkand(om.maleNames.iz(2));

		let correct = [
			`В доме ${female[0].re} доме больше этажей, чем в доме ${male[1].re}.`,
			`${female[1].ie} живёт в доме выше, чем ${male[1].ie}.`,
			`${female[0].re} живёт в самом высоком доме.`,
			`${male[1].ie} живёт в самом малоэтажном доме.`
		];
		let wrong = [
			`Дом ${male[1].re} самый малоэтажный среди перечисленных четырёх.`,
			`В доме ${male[0].re} меньше этажей, чем в доме ${male[1].re}.`,
			`Среди этих четырёх домов есть три с одинаковым количеством этажей.`,
			`${male[0].re} живёт в самом высоком доме.`
		];

		NAtask.setTask({
			text: `В доме ${female[0].re} больше этажей, чем в доме ${male[0].re}, в доме ${male[1].re} меньше этажей, чем в доме ${male[0].re}, а в доме ${female[1].re} больше этажей, чем в доме ${male[1].re}.` +
				` Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.` +
				` Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=511602
