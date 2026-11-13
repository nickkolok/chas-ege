(function () {
	retryWhileError(function () {
		'use strict';
		NAinfo.requireApiVersion(0, 2);

		let numberOfTeams = sl(4, 20);
		let numberOfGroups = sluchDel(numberOfTeams);
		genAssert(numberOfGroups != 1, 'Случайный делитель оказался единицей');
		genAssert(numberOfGroups != numberOfTeams, 'Случайный делитель оказался этим же числом');

		let numberOfTeamsInGroup = numberOfTeams / numberOfGroups;
		genAssertZ1000(numberOfTeamsInGroup / numberOfTeams);

		let number = ['', 'одну', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
		let groupOrPair = (numberOfTeamsInGroup > 2) ? 'группа' : 'пара';

		let card = Array.from({ length: numberOfGroups }).reduce((acc, _, i) => [...acc, ...Array(numberOfTeamsInGroup).fill(i + 1)], []).join('$, $');

		let country = sklonlxkand(chaslib.sets.countries.iz());
		let selectedGroup = ordinalNumber(sl(1, numberOfGroups), 'p', 1);

		NAtask.setTask({
			text: `В чемпионате мира участвуют $${numberOfTeams}$ команд, среди которых есть команда ${country.re}. 
			С помощью жеребьёвки их нужно разделить на 
			${number[numberOfGroups]} ${chislitlx(numberOfGroups, groupOrPair).split(' ')[1]}${`, по ${number[numberOfTeamsInGroup]} ${chislitlx(numberOfTeamsInGroup, 'команда').split(' ')[1]} в каждой`.printIf(numberOfTeamsInGroup > 2)}. 
			В ящике вперемешку лежат карточки с номерами групп: $${card}$. 
			Капитаны команд тянут по одной карточке. 
			Какова вероятность того, что команда ${country.re} окажется в${`о`.printIf(selectedGroup == 'второй')} ${selectedGroup} группе?`,
			answers: numberOfTeamsInGroup / numberOfTeams,
			authors: ['Суматохина Александра'],
		});
	}, 100);
})();

//320170 320373 514033 514060 514080 514102 522275 522318 320345 320347 320349 320351 320353 320355 320357 320359 320361 320363 320365 320367 320369 320371 320375 320377
// C4A80E
// 21AE5F
// 20FDFD
// F8D5B9
// 45B287
// 749254
// A492EC
// 3B2AB4
// 622C6F
// 59C7C6
