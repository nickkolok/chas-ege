(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let apartamentNumber, numberOfApartamentPerFloor;
        do {
            apartamentNumber = sluchch(1, 100, 1);
            numberOfApartamentPerFloor = sluchch(5, 12, 1);
        } while (apartamentNumber % numberOfApartamentPerFloor === 0);

        let nameOfPerson = Math.random() < 0.5 ? om.maleNames.iz() : om.femaleNames.iz();

        NAtask.setTask({
            text: 'В доме, в котором живет ' + nameOfPerson + ', один подъезд. На каждом этаже находится по ' + '$' + numberOfApartamentPerFloor + '$' +
                ' квартир. ' + nameOfPerson + ' живет в квартире №' + '$' + apartamentNumber + '$' + '. На каком этаже живет ' + nameOfPerson + '? ',
            answers: '$' + (apartamentNumber / numberOfApartamentPerFloor).ceil() + '$',
        });
    });
})();
//https://ege.sdamgia.ru/test?likes=77350
//zer00player
