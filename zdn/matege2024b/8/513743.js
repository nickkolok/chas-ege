(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513743';
		let preference1 = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let preference2 = ['vacation', 'driveToWork'];
		let randTask = getSelectedPreferenceFromList(key, preference2);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;
		let spotName = sklonlxkand(['фестиваль', 'пляж', 'рынок', 'рыбалка', 'сафари', 'скалодром'].iz(2));
		let days = sl(7, 14);
		let spotA = sl(1, 3);
		let spotB = sl(2, 5);
		let minBoth = 0;
		let maxBoth = Math.min(spotA, spotB);
		let minNone = days - (spotA + spotB - minBoth);
		let name = om.maleNames.iz();
		let surname = ['Сергеевич', 'Иванович', 'Николаевич', 'Валерьевич', 'Петрович', 'Александрович', 'Юрьевич', 'Михайлович', 'Евгеньевич', 'Васильевич', 'Валентинович', 'Никитич', 'Антонович', 'Кириллович', 'Борисович', 'Викторович', 'Владимирович', 'Фёдорович', 'Егорович',].iz();
		let fullName = `${name} ${surname}`;

		let transport = sklonlxkand(['велосипед', 'самокат', 'мотоцикл', 'моноколесо', 'скейтборд', 'электровелосипед', 'мопед', 'мотороллер'].iz(2));
		let badWeather = sklonlxkand(['дождь', 'ливень', 'гроза', 'град', 'метель', 'шквал', 'гололёд', 'туман', 'буря', 'гололедица'].iz(2));
		let specialDay = sklonlxkand(['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'].iz());
		let specialClothing = ['парадный', 'строгий', 'деловой', 'праздничный', 'торжественный',].iz();

		let task = [`${fullName} был в отпуске ${chislitlx(days, 'день', '$')}  и каждый день ходил куда-нибудь гулять. ${chislitlx(spotA, 'раз', '$')} он ходил на ${spotName[0].ve} и ${chislitlx(spotB, 'раз', '$')} ходил на ${spotName[1].ve} ` +
			`(за день ${fullName} мог сходить и на ${spotName[0].ve}, и на ${spotName[1].ve}, а мог никуда не ходить, но дважды в день в одно и то же место не ходил).`,
		`${fullName} часто ездит на работу на ${transport[0].pe}. Он не ездит на ${transport[0].pe} в те дни, когда на улице ${badWeather[0].ie} или ${badWeather[1].ie}, а также по ${specialDay.dm}, когда надевает ${specialClothing} костюм.`][randTask];

		let correct = [
			[`Не может оказаться, что ${fullName} ${chislitlx(maxBoth + 1, 'день', '$')} ходил и на ${spotName[0].ve}, и на ${spotName[1].ve}.`, `Сегодня ${fullName} приехал на работу на ${transport[0].pe}, значит, сегодня нет ${badWeather[0].re}.`,][randTask],
			[`Было ${chislitlx(minNone, 'день', '$')}, когда ${fullName} не ходил ни на ${spotName[0].ve}, ни на ${spotName[1].ve}.`, `Каждый раз, когда на улице  ${badWeather[1].ie}, ${fullName} добирается до работы не на ${transport[0].pe}.`][randTask],
			[`Максимум ${chislitlx(maxBoth, 'день', '$')} он был и там, и там.`, `${fullName} добирается до работы не на ${transport[1].pe}.`][randTask],
			[`Минимум ${chislitlx(minNone, 'день', '$')} он никуда не ходил.`, `${fullName} добирается до работы не на ${transport[0].pe}, если сегодня ${specialDay.ie}.`][randTask]
		];
		let wrong = [
			[`Было ${chislitlx(spotA, 'день', '$')}, когда ${fullName} ходил и на ${spotName[0].ve}, и на ${spotName[1].ve}.`, `Каждый раз, когда в течение дня будет ясно, ${fullName} едет на работу на ${transport[0].pe}.`,][randTask],
			[`Если ${fullName} сходил на ${spotName[0].ve}, то в этот же день он ходил и на ${spotName[1].ve}.`, `Каждый раз, когда ${fullName} добирается до работы не на ${transport[0].pe}, он одет в ${specialClothing} костюм.`][randTask],
			[`Он был на ${spotName[1].pe} каждый день.`, `${fullName} добирается до работы не на ${transport[0].pe} кажды день.`][randTask],
			[`Он ни разу не был на ${spotName[0].pe}.`, `Сегодня ${fullName} приехал на работу на ${transport[0].pe}, значит, сегодня на улице ${badWeather[0].ie} или ${badWeather[1].ie}.`][randTask]
		];

		NAtask.setTask({
			text: task +
				` Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях вне зависимости от того, в какие дни ${fullName} ходил на ${[spotName[1].ve, 'работу'][randTask]}.` +
				` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: [preference1, preference2],
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513743
