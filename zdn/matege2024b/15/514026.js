(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl(0, 2);
        let typesOfCitizens = sklonlxkand(['пенсионер', 'взрослый', 'женщина', 'мужчина', 'школьник', 'подросток', 'студент', 'работник', 'старик', 'бабушка', 'дедушка', 'девушка', 'робот', 'демон'].iz());
        let numberOfInhabitants = sl(70000, 1000000, 10000);
        let percentageOfResidents = sl(10, 90, 1);


        NAtask.setTask({
            text:
                ['В городе ' + '$' + numberOfInhabitants + '$' + ' жителей, причём ' + '$' + percentageOfResidents + '$' + '% — это ' + typesOfCitizens.im +
                    '. Сколько ' + typesOfCitizens.rm + ' в этом городе?',
                'В городе ' + '$' + numberOfInhabitants / 100 * percentageOfResidents + '$' + ' жителей являются ' + typesOfCitizens.tm + ', что составляет ' + '$' + percentageOfResidents + '$' + '% от всех жителей' +
                '. Сколько всего жителей в этом городе?',
                'В городе ' + '$' + numberOfInhabitants + '$' + ' жителей, причём ' + '$' + numberOfInhabitants / 100 * percentageOfResidents + '$' + ' жителей — это ' +
                typesOfCitizens.im + '. Сколько ' + typesOfCitizens.rm + ' в процентах проживает в этом городе?'][rand],
            answers: [numberOfInhabitants / 100 * percentageOfResidents, numberOfInhabitants, percentageOfResidents][rand],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=514026
//zer00player

