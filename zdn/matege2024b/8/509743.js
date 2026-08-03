(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509743';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let teams = sluchiz(om.strany.re,4);

		let correct = [
			`Сборная ${teams[2]} завоевала меньше медалей, чем сборная ${teams[0]}.`,
			`Сборная ${teams[1]} завоевала больше медалей, чем сборная ${teams[2]}.`,
			`Сборная ${teams[0]} завоевала больше медалей, чем сборная ${teams[3]}.`,
			`Медалей у ${teams[0]} > ${teams[1]} > ${teams[2]}, и ${teams[0]} > ${teams[3]}.`
		];
		let wrong = [
			`Сборная ${teams[1]} завоевала больше медалей, чем каждая из остальных трёх сборных.`,
			`Среди названных сборных есть три, завоевавшие равное количество медалей.`,
			`Из названных сборных команда ${teams[2]} заняла второе место по числу медалей.`,
			`Сборная ${teams[3]} завоевала больше медалей, чем ${teams[1]}.`
		];

		NAtask.setTask({
			text: `На зимней Олимпиаде сборная ${teams[0]} завоевала медалей больше, чем сборная ${teams[1]}, сборная ${teams[2]} — меньше, чем сборная ${teams[1]}, а сборная ${teams[3]} — меньше, чем сборная ${teams[0]}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509743
