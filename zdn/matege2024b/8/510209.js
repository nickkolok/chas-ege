(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510209';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let pairs = [
			{ sn1: '«ВКонтакте»', sn2_prep: '«Одноклассниках»', sn2_gen: '«Одноклассников»' },
			{ sn1: '«Телеграм»', sn2_prep: '«ВКонтакте»', sn2_gen: '«ВКонтакте»' },
			{ sn1: '«Инстаграм»', sn2_prep: '«Телеграм»', sn2_gen: '«Телеграма»' }
		].iz();

		let groups = [
			{ nom_pl: 'школьники из Твери', nom_sg: 'школьник из Твери', gen_pl: 'школьников из Твери' },
			{ nom_pl: 'студенты из Москвы', nom_sg: 'студент из Москвы', gen_pl: 'студентов из Москвы' },
			{ nom_pl: 'учителя из Казани', nom_sg: 'учитель из Казани', gen_pl: 'учителей из Казани' },
			{ nom_pl: 'врачи из Самары', nom_sg: 'врач из Самары', gen_pl: 'врачей из Самары' }
		].iz();

		let correct = [
			`Среди ${groups.gen_pl} есть те, кто зарегистрирован в ${pairs.sn1}.`,
			`Хотя бы один из зарегистрированных в ${pairs.sn2_prep} является ${groups.nom_sg}.`,
			`Некоторые из зарегистрированных в ${pairs.sn1} — это ${groups.nom_pl}.`,
			`Существует ${groups.nom_sg}, который зарегистрирован в ${pairs.sn1}.`
		];
		
		let wrong = [
			`Все ${groups.nom_pl} не зарегистрированы ни в ${pairs.sn1}, ни в ${pairs.sn2_prep}.`,
			`Среди ${groups.gen_pl} нет тех, кто зарегистрирован в ${pairs.sn1}.`,
			`Ни один ${groups.nom_sg} не зарегистрирован в ${pairs.sn2_prep}.`,
			`Все зарегистрированные в ${pairs.sn2_prep} не являются ${groups.nom_pl}.`
		];

		NAtask.setTask({
			text: `Среди тех, кто зарегистрирован в ${pairs.sn1}, есть ${groups.nom_pl}. Среди ${groups.gen_pl} есть те, кто зарегистрирован в ${pairs.sn2_prep}. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510209
