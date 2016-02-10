(function() {
	NAinfo.requireApiVersion(0, 2);

	var days = chaslib.sets.weekDays;
	var den = sluchch(0, 6);
	var den1 = sklonlxkand(days[den]);
	var den2 = sklonlxkand(days[(den + 1) % 7]);
	var a = sluchch(5, 20);

	NAtask.setTask({
		//.toZagl() делает заглавной первую букву строки, к которой вызвана
		text: lxcompose('в', den1.ve).toZagl() + ' акции компании подорожали на некоторое число процентов, а ' +
			lxcompose('в', den2.ve) + ' ' +
			' подешевели на то же самое число процентов. ' +
			'В результате они стали стоить на ' + a + '% дешевле, чем при открытии торгов ' + lxcompose('в', den1.ve) +
			'. ' +
			'На сколько процентов подорожали акции компании ' + lxcompose('в', den1.ve) + '?',
		answers: 100 - 100 * ((100 + a) / 100 * (100 - a) / 100),

	});
})();

//Марина Кольцова
//Обзад 99566

