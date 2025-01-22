(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let theVehicle = sklonlxkand(['автомобиль', 'мотоцикл', 'велосипед', 'электросамокат', 'гироскутер', 'мотоциклист', 'велосипедист', 'гонщик', 'грузовик', 'автомобилист'].iz());
        let speedInterval = window.adequateSpeed.vehicle[theVehicle.ie];
        let speed = sluchch(speedInterval[0], speedInterval[1], 1);

        let firstTimePass = sl(15, 40, 1);
        let firstDistance = (speed / 60).ceil() * firstTimePass;
        let secondTimePass = firstTimePass + sl(5, 30, 3);

        NAtask.setTask({
            text:
                theVehicle.ie.toZagl() + ' проехал ' + chislitlx(firstDistance, 'километр', '$') + ' за ' + chislitlx(firstTimePass, 'минута', 'v$') + '. ' +
                'Сколько километров он проедет за ' + chislitlx(secondTimePass, 'минута', 'v$') + ', ' +
                'если будет ехать с той же скоростью?',
            answers: '$' + (secondTimePass * firstDistance) / firstTimePass + '$',
        });

    }, 10);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512414
//zer00player
