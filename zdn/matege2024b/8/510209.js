(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510209';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let pairs =['МыЧат', 'ЧайЧат', 'Одногруппники', 'ФотоЧат', 'Болтушка' ].iz(2);

		let people = sklonlxkand(['школьник','ученик','ученица','учитель','преподаватель','преподавательница',].iz());
		let town =['Твери','Казани','Волгограда','Астрахани','Ярославля','Ростова','Воронежа','Липецка','Уфы','Сатарова'].iz();
		let group = ' из ' + town;
		let rod = people.rod;
		let last = ['', 'a'][rod];

		let correct = [
			`Среди ${people.rm + group} есть те, кто зарегистрирован в «${pairs[0]}».`,
			`Хотя бы один из зарегистрированных в «${pairs[1]}» является ${people.te + group}.`,
			`Некоторые из зарегистрированных в «${pairs[0]}» — это ${people.im + group}.`.replace('учители', 'учителя'),
			`Существует ${people.ie + group}, котор${['ый','ая'][rod]} зарегистрирован${last} в «${pairs[0]}».`
		];
		
		let wrong = [
			`Все ${people.im + group} не зарегистрированы ни в «${pairs[0]}», ни в «${pairs[1]}».`,
			`Среди ${people.rm + group} нет ${['тех', 'той'][rod]}, кто зарегистрирован${last} в «${pairs[0]}».`,
			`Ни ${['один', 'одна'][rod]} ${people.ie + group} не зарегистрирован${last} в «${pairs[1]}».`,
			`Все зарегистрированные в «${pairs[1]}» не являются ${people.tm + group}.`
		];

		NAtask.setTask({
			text: `Среди тех, кто зарегистрирован в «${pairs[0]}», есть ${people.im + group}. Среди ${people.rm + group} есть те, кто зарегистрирован в «${pairs[1]}». Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510209
