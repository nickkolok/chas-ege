(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let numberOfTeams = sl(4, 20, 2);
        let numberOfgroups = sluchDel(numberOfTeams);
        genAssert(numberOfgroups != 1, 'Случаный делитель оказался единицей');
        genAssert(numberOfgroups != numberOfTeams, 'Случаный делитель оказался этим же числом');

        let numberOfTeamInGroup = numberOfTeams / numberOfgroups;
        genAssertZ1000(numberOfTeamInGroup / numberOfTeams);

        let number = ['', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
        let groupOrPair = (numberOfTeamInGroup > 2) ? 'группа' : 'пара';

        let card = Array.from({ length: numberOfgroups }).reduce((acc, _, i) => [...acc, ...Array(numberOfTeamInGroup).fill(i + 1)], []).join('$, $');

        let country = sklonlxkand(chaslib.sets.countries.iz());
        let selectedGroup = ['первой', 'второй', 'третьей', 'четвёртой', 'пятой', 'шестой', 'седьмой', 'восьмой', 'девятой', 'десятой'].slice(0, numberOfgroups).iz();

        NAtask.setTask({
            text: `В ${['соревнованиях', 'чемпионате', 'турнире'].iz()} мира участвуют $${numberOfTeams}$ команд, среди которых есть команда ${country.re}. 
			С помощью жеребьёвки их нужно разделить на 
			${number[numberOfgroups - 1]} ${chislitlx(numberOfgroups, groupOrPair).split(' ')[1]}${`, по ${number[numberOfTeamInGroup - 1]} ${chislitlx(numberOfTeamInGroup, 'команда').split(' ')[1]} в каждой`.esli(numberOfTeamInGroup > 2)}. 
			В ящике вперемешку лежат карточки с номерами групп: $${card}$. 
			Капитаны команд тянут по одной карточке. 
			Какова вероятность того, что команда ${country.re} окажется в${`о`.esli(selectedGroup == 'второй')} ${selectedGroup} группе?`,
            answers: numberOfTeamInGroup / numberOfTeams,
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

//320170 320373 514033 514060 514080 514102 522275 522318 320345 320347 320349 320351 320353 320355 320357 320359 320361 320363 320365 320367 320369 320371 320375 320377
