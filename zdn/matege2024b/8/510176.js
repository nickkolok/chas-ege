(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510176';
		let preference1 = ['findTrue', 'findFalse'];
		let preference2 = ['gas', 'elevator'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let randTask = getSelectedPreferenceFromList(key, preference2);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let limit = [12,5][randTask];
		let limitText = limit + 1;

		let correct = [
			`Если в доме `+ ['установлены газовые плиты', 'не установлен лифт'][randTask] + `, то в этом доме менее ${limitText} этажей.`,
			`Если в доме ` + ['установлены газовые плиты', 'не установлен лифт'][randTask] + `, то в нём не более ${limit} этажей.`,
			`Дома с ${limitText} и более этажами имеют `+ ['электрические плиты', 'лифт'][randTask] + `.`,
			['Газовые плиты возможны', 'Отсутсвие лифта возможно'][randTask] + `только в домах до ${limit} этажей включительно.`
		];
		let wrong = [
			`Если в доме ` + ['установлены газовые плиты', 'не установлен лифт'][randTask] + `, то в этом доме более ${limitText} этажей.`,
			`Если в доме больше ${limit + sl(2,8)} этажей, то в нём ` + ['установлены газовые плиты', 'не установлен лифт'][randTask] + `.`,
			`В доме с ${limit} этажами обязательно ` + [' газовые плиты', 'нет лифта'][randTask] + `.`,
			['Электрические плиты бывают', 'Наличие лифта бывает'][randTask] + ` только в домах выше ${limit + sl(2,10)} этажей.`
		];

		NAtask.setTask({
			text: `В жилых домах, в которых больше ${limit} этажей, ` + ['установлены электрические плиты вместо газовых', 'установлен лифт'][randTask] + `. Выберите утверждения, которые `+(rand ? 'неверны' : 'верны') +` при приведённом условии.`+
			` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			
			preference: [preference1, preference2],
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510176
