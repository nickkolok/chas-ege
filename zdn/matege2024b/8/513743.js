(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513743';
		let preference = ['findTrue'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let name = om.maleNames.iz() + ' ' + ['Сергеевич', 'Иванович', 'Николаевич', 'Валерьевич', 'Петрович', 'Александрович', 'Юрьевич', 'Михайлович', 'Евгеньевич', 'Васильевич'].iz();
		let transport = ['на велосипеде', 'на самокате', 'на мотоцикле'].iz();
		let badWeather1 = sklonlxkand(['дождь', 'ливень', 'гроза'].iz());
		let badWeather2 = sklonlxkand(['снег', 'метель', 'град'].iz());
		let specialDay = sklonlxkand(['четвергам', 'понедельникам', 'пятницам'].iz());
		let specialClothing = sklonlxkand(['парадный костюм', 'строгий костюм', 'деловой костюм'].iz());

		let correct = [
			`Сегодня ${name} приехал на работу ${transport}, значит, сегодня нет ${badWeather1.rod}.`,
			`Каждый раз, когда на улице идёт ${badWeather2.nom}, ${name} добирается до работы не ${transport}.`
		];
		
		let wrong = [
			`Каждый раз, когда в течение дня будет ясно, ${name} едет на работу ${transport}.`,
			`Каждый раз, когда ${name} добирается до работы не ${transport}, он одет в ${specialClothing.acc}.`
		];

		chas2.task.setTask({
			text: `${name} часто ездит на работу ${transport}. Он не ездит ${transport} в те дни, когда идёт ${badWeather1.nom} или ${badWeather2.nom}, а также по ${specialDay.dat}, когда надевает ${specialClothing.acc}. Выберите утверждения, которые верны при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.`,
			answers: correct,
			wrongAnswers: wrong,
			preference: preference,
		});
		AtoB2(2, 2);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513743
// Номер: FFFB0D
