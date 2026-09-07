(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let name = om.maleNames.iz();
		let instrNom = sklonlxkand(['гитара', 'скрипка', 'флейта', 'балалайка', 'домра', 'виолончель'].iz());
		let instrVin = instrNom.ve;
		let instrTvor = instrNom.te;
		let instrRod = instrNom.re;

		let randActity = sl1();
		let activityM = ['на концертах', 'на соревнованиях'][randActity];
		let activityE = ['на концерте', 'на соревновании'][randActity];
		let randPreposition = sl1();
		let preposition = ['в', 'на'][randPreposition];
		let activity2 = sklonlxkand([
			['поход', 'поездка'].iz(), ['дача', 'рыбалка'].iz()
		][randPreposition]);
		let days = sklonlxkand(['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'].iz());

		let activityPred = `${preposition} ${activity2.pe}`;

		let correct = [
			`Если ${name} без ${instrRod}, значит, он не ${activityPred}.`,
			`Если в ${days.ve} ${name} будет выступать ${activityE}, то он в ${days.ve} будет со своей ${instrTvor}.`
		];

		let wrong = [
			`Каждый раз, когда ${name} берёт с собой ${instrVin}, он будет выступать ${activityE}.`,
			`В любое время, когда ${name} не ${activityPred}, у него нет с собой ${instrRod}.`
		];

		NAtask.setTask({
			text: `Музыкант ${name} выступает ${activityM} только со своей ${instrTvor}. Также ${name} обязательно берёт с собой ${instrVin} ${preposition} ${activity2.ve}. Выберите утверждения, которые верны при приведённых условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.`,
			answers: correct,
			wrongAnswers: wrong,
		});
		AtoB2(2, 2);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513805
