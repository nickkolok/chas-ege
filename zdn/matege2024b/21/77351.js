(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let floorNumber = sluchch(5, 20, 1);
        let apartamentNumber = sluchch(1, 230, 1);
        let numberOfApartamentPerFloor = sluchch(3, 12, 1);
        let nameOfPerson = sl1() ? om.maleNames.iz() : om.femaleNames.iz();

        NAtask.setTask({
            text: 'В доме, в котором живет ' + nameOfPerson + ', ' + '$' + floorNumber + '$' + ' этажей и несколько подъездов. На каждом этаже находится по ' +
                chislitlx(numberOfApartamentPerFloor, 'квартира', '$') + '. ' + nameOfPerson + ' живет в квартире №' + '$' + apartamentNumber + '$' + '. В каком подъезде живет ' + nameOfPerson + '? ',
            answers: '$' + (apartamentNumber / (floorNumber * numberOfApartamentPerFloor)).ceil() + '$',
        });
    });
})();
//https://mathb-ege.sdamgia.ru/test?likes=77351
//zer00player
