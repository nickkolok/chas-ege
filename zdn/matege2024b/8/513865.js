(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513865';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let girl = sklonlxkand(om.femaleNames.iz());
		let relative = sklonlxkand(['бабушка', 'тётя', 'мама', 'сестра', 'подруга', 'племянница'].iz());
		let activity = sklonlxkand(['физкультура', 'музыка', 'лепка', 'технология'].iz());

		let correct = [
			`Если ${girl.ie} без косичек, значит, она не у ${relative.re} в гостях.`,
			`Когда ${girl.ie} выполняет задание на ${activity.pe}, она с косичками.`,
			`Если ${girl.ie} у ${relative.re}, ей заплетут косички.`,
			`${girl.ie} всегда с косичками на ${activity.pe}.`
		];
		let wrong = [
			`Каждый раз, когда у ${girl.re} заплетены косички, она находится у ${relative.re}.`,
			`Если ${girl.ie} без косичек, значит, сегодня ${activity.ie}.`,
			`${girl.ie} никогда не заплетает косички сама.`,
			`Косички бывают только у ${relative.re}.`
		];

		NAtask.setTask({
			text: `Каждый раз, когда ${girl.ie} приезжает в деревню к ${relative.de} в гости, ${relative.ie} заплетает ей косички. Также ${girl.ie} заплетает себе косички всегда, когда идёт на ${activity.ve}. ` +
				`Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при приведённых условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ` +
				`Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513865
