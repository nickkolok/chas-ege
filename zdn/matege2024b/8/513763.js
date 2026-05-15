(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513763';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let classNumber = sl(5, 11);
		let letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е'].iz();
		let name = sklonlxkand(om.femaleNames.iz());

		let randItem = sl(1, 7);
		let subject = sklonlxkand(['география', 'биология', 'история', 'обществознание', 'математика', 'химия', 'черчение', 'технология'][randItem]);
		let item = sklonlxkand(['атлас', 'микроскоп', 'хрестоматия', 'справочник', 'транспортир', 'шпатель', 'рейсшина', 'штангенциркуль'][randItem]);
		let days = sklonlxkand(['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'].iz(3));


		let correct = [
			`По ${days[0].dm} и ${days[1].dm} ${name.de} из  ${classNumber} «${letter}» надо принести в школу ${item.ve}.`,
			`По ${days[2].dm} ученикам  ${classNumber} «${letter}» не надо брать в школу ${item.ve}.`,
			`${item.ie.toZagl()} требуется только на уроках ${subject.re}.`,
			`В дни, когда нет ${subject.re}, ${item.ve} не нужно приносить.`
		];
		let wrong = [
			`Всякий день, когда ученик  ${classNumber} «${letter}» берёт с собой в школу ${item.ve}, является ${days[0].tm} и ${days[1].tm}.`,
			`Каждый день, отличный от ${days[0].dm} и ${days[1].dm}, ученикам  ${classNumber} «${letter}» ${item.ve} можно в школу не брать.`,
			`${item.ie.toZagl()} нужен каждый день.`,
			`Только по ${days[0].dm} и ${days[2].dm} требуется ${item.ve}.`
		];

		NAtask.setTask({
			text: `В  ${classNumber} «${letter}» классе ${subject.ie} по расписанию по ${days[0].dm} и ${days[1].dm}. Каждый ученик должен приносить ${item.ie} на каждый урок ${subject.re}. На других уроках ${item.ie} не требуется. ` +
				`Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при приведённых условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513763
