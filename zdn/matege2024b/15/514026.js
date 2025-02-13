(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let typesOfCitizens = sklonlxkand(['пенсионер', 'взрослый', 'женщина', 'мужчина',].iz());
        let numberOfInhabitants = sl(70000, 1000000, 10000);
        let percentageOfResidents = sl(10, 85, 1);


        NAtask.setTask({
            text:
                'В городе ' + '$' + numberOfInhabitants + '$' + ' жителей, причём ' + '$' + percentageOfResidents + '$' + '% — это ' + typesOfCitizens.im +
                '. Сколько ' + typesOfCitizens.rm + ' в этом городе?',
            answers: numberOfInhabitants / 100 * percentageOfResidents,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=514026
//zer00player
