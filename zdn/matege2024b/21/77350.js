(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let apartamentNumber = sluchch(1, 100, 1);
        let numberOfApartamentPerFloor = sluchch(5, 12, 1);
        genAssert(!apartamentNumber.kratno(numberOfApartamentPerFloor, "Количество квартир на этаже кратно номеру квартиры"));

        let nameOfPerson = sl1() ? om.maleNames.iz() : om.femaleNames.iz();

        NAtask.setTask({
            text: 'В доме, в котором живет ' + nameOfPerson + ', один подъезд. На каждом этаже находится по ' + '$' + numberOfApartamentPerFloor + '$' +
                ' квартир. ' + nameOfPerson + ' живет в квартире №' + '$' + apartamentNumber + '$' + '. На каком этаже живет ' + nameOfPerson + '? ',
            answers: '$' + (apartamentNumber / numberOfApartamentPerFloor).ceil() + '$',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=77350
//zer00player
