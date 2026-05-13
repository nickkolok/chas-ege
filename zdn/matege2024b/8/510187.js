(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510187';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let city = window.latbukv.iz();
		let minH = sl(160, 180);
		let maxH = sl(minH + 5, 210);
		let randSport = sl(1, 3);
		let sportMan = sklonlxkand(['футболист', 'теннисист', 'волейболист', 'баскетболист',])[randSport];
		let typeSport = ['футбольн', 'теннисн', 'волейбольн', 'баскетбольн'][randSport];

		let correct = [
			`В ${typeSport}ой команде города ${city} нет игроков с ростом ${minH - sl(1,10)} см.`,
			`Рост любого ${sportMan.re} этой команды меньше ${maxH} см.`,
			`Минимальный рост ${sportMan.re} превышает ${minH - sl(1,10)} см.`,
			`Разница между максимальным и минимальным ростом меньше ${maxH - minH + sl(1, 4)} см.`
		];
		let wrong = [
			`Существует футболист ростом ${maxH + sl(1, 10)} см.`,
			`Все игроки имеют рост строго между ${minH + sl(1,10)} и ${maxH - sl(1,10)} см.`,
			`Разница в росте любых двух игроков превышает ${maxH - minH + sl(6, 12)} см.`,
			`Найдётся игрок ростом ${minH - 10} см.`,
		];

		NAtask.setTask({
			text: `Перед ${typeSport}ым турниром измерили рост игроков ${typeSport}ой команды города ${city}.` +
				` Оказалось, что рост каждого из ${sportMan.rm} этой команды больше ${minH} см и меньше ${maxH} см. ` +
				`Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. ` +
				`В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ` +
				`Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510187
