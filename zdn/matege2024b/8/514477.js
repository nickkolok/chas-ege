(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514477';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let city = sklonlxkand(om.goroda.iz(3));
		let baseTemp = sl(0, 10);
		let colder = sl(3, 25);
		let hotter = sl(2, 24);

		let tempA = baseTemp;
		let tempB = baseTemp - colder;
		let tempC = baseTemp + hotter;

		let correct = [
			`В любом городе, помимо указанных, в котором было теплее, чем в ${city[2].pe}, также было теплее, чем в ${city[0].pe}.`,
			`В ${city[2].pe} было теплее, чем в ${city[1].pe}.`,
			`${city[0].ie} теплее ${city[1].re} на ${colder}$^{\\circ}$C.`,
			`${city[2].ie} теплее ${city[0].re} на ${hotter}$^{\\circ}$C.`
		];
		let wrong = [
			`В ${city[0].pe} было теплее, чем в ${city[2].pe}.`,
			`В любом городе, помимо указанных, в котором было теплее, чем в ${city[1].pe}, также было теплее, чем в ${city[0].pe}.`,
			`${city[1].ie} теплее ${city[2].re}.`,
			`Температура в ${city[0].pe} ниже, чем в ${city[1].pe}.`
		];


		NAtask.setTask({
			text: `В некоторый момент температура воздуха в ${city[0].pe} была равна ${tempA}$^{\\circ}$C. В этот же момент в ${city[1].pe} было на ${colder}$^{\\circ}$C холоднее, чем в ${city[0].pe}, а в ${city[2].pe} на ${hotter}$^{\\circ}$C теплее, чем в ${city[0].pe}.` +
				` Выберите утверждения, которые были ` + (rand ? 'неверны' : 'верны') + ` в этот момент при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ` +
				`Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514477
