
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let vehicleKeys = Object.keys(om.adequateSpeed.vehicle);
        let drive = vehicleKeys.iz();
        let speedInterval = om.adequateSpeed.vehicle[drive];
        let speed = sluchch(speedInterval[0], speedInterval[1], 1);
        let driver = sklonlxkand(drive);
        let result = speed / 1.6;

        NAtask.setTask({
            text:
                'Спидометр ' + driver.re + ' показывает скорость в милях в час. ' +
                'Какую скорость (в милях в час) показывает спидометр, ' +
                'если ' + driver.ie + ' движется со скоростью ' + '$' + speed + '$' + ' км в час? (Считайте,' +
                ' что ' + chislitlx(1, 'миля', '$') + ' равна ' + '$' + '1,6' + '$' + ' км.)',
            answers: result,
        });
    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=77356
//zer00player


