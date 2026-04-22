(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510176';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let limit = sl(10, 20);
		let limitText = limit + 1;

		let correct = [
			`Если в доме установлены газовые плиты, то в этом доме менее ${limitText} этажей.`,
			`Если в доме установлены газовые плиты, то в нём не более ${limit} этажей.`,
			`Дома с ${limitText} и более этажами имеют электрические плиты.`,
			`Газовые плиты возможны только в домах до ${limit} этажей включительно.`
		];
		let wrong = [
			`Если в доме установлены газовые плиты, то в этом доме более ${limitText} этажей.`,
			`Если в доме больше ${limit + sl(2,8)} этажей, то в нём установлены газовые плиты.`,
			`В доме с ${limit} этажами обязательно газовые плиты.`,
			`Электрические плиты бывают только в домах выше ${limit + sl(2,10)} этажей.`
		];

		NAtask.setTask({
			text: `В жилых домах, в которых больше ${limit} этажей, установлены электрические плиты вместо газовых. Выберите утверждения, которые `+(rand ? 'неверны' : 'верны') +` при приведённом условии.`+
			` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510176
