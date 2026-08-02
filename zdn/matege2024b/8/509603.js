(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509603';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let teacherSurname = sklonlxkand(['Дмитриевич', 'Петрович', 'Иванович', 'Сидоров', 'Попов', 'Горбунов', 'Рябов', 'Нечаев', 'Морозов'].iz());
		let teacherName = sklonlxkand(om.maleNames.iz());
		let subject = ['физике', 'математике', 'химии', 'русскому языку', 'географии', 'биологии', 'обществознанию', 'истории'].iz();
		let activity = ['лабораторную работу', 'контрольную', 'эксперимент'].iz();

		let correct = [
			`Если телефон ${teacherName.re} ${teacherSurname.re} включён, значит, он не ведёт урок по ${subject}.`,
			`Если ${teacherName.ie} ${teacherSurname.ie} проводит на уроке ${activity} по ${subject}, значит, его телефон выключен.`,
			`Во время урока телефон всегда выключен.`,
			`Выключенный телефон — необходимое условие проведения урока.`
		];
		let wrong = [
			`Если телефон ${teacherName.re} ${teacherSurname.re} выключён, значит, он не ведёт урок по ${subject}.`,
			`Если ${teacherName.ie} ${teacherSurname.ie} ведёт урок по ${subject}, значит, его телефон включён.`,
			`Телефон может быть включён во время урока.`,
			`${teacherName.ie} ${teacherSurname.ie} никогда не выключает телефон.`
		];

		NAtask.setTask({
			text: `Когда учитель по ${subject}, ${teacherName.ie} ${teacherSurname.ie}, ведёт урок, он обязательно отключает свой телефон. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + `
			при приведённом условии. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509603
