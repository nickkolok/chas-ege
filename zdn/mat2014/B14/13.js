(function() {
	NAinfo.requireApiVersion(0, 2);

	var days = chaslib.sets.weekDays;
	var den = sluchch(0, 6);
	var den1 = sklonlxkand(days[den]);
	var den2 = sklonlxkand(days[(den + 1) % 7]);
	var a = sluchch(1, 80);

	// Порядок неважен
	// (a+b)*(a-b) = a^2 - b^2 < a^2
	var actions = ['подорожали', 'подешевели'].shuffle();

	NAtask.setTask({
		//.toZagl() делает заглавной первую букву строки, к которой вызвана
		text: lxcompose('в', den1.ve).toZagl() + ' акции компании ' + actions[0] + ' на некоторое число процентов, а ' +
			lxcompose('в', den2.ve) + ' ' +
			' ' + actions[1] + ' на то же самое число процентов. ' +
			'В результате они стали стоить на ' +
			(100 - 100 * ((100 + a) / 100 * (100 - a) / 100)).ts() +
			'% дешевле, чем при открытии торгов ' + lxcompose('в', den1.ve) +
			'. ' +
			'На сколько процентов ' + actions[0] + ' акции компании ' + lxcompose('в', den1.ve) + '?',
		answers: a,

	});
})();

//Марина Кольцова
//Обзад 99566
//Fixed by Nikolai Avdeev
