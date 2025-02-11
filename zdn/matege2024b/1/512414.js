(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let walkOrRide = ['прошёл', 'проехал'][rand];
        let vehicleKeys = Object.keys(om.adequateSpeed.vehicle);
        let walkingRouteKeys = Object.keys(om.adequateSpeed.walkingRoute);

        let walkerOrDriver = [walkingRouteKeys.iz(), vehicleKeys.iz()][rand];
        let speedInterval = [om.adequateSpeed.walkingRoute[walkerOrDriver], om.adequateSpeed.vehicle[walkerOrDriver]][rand];
        let speed = sluchch(speedInterval[0], speedInterval[1], 1);

        let firstTimePass = sl(15, 40, 1);
        let firstDistance = (speed / 60).ceil() * firstTimePass;
        let secondTimePass = firstTimePass + sl(5, 30, 3);

        NAtask.setTask({
            text:
                walkerOrDriver.toZagl() + ' ' + walkOrRide + ' ' + chislitlx(firstDistance, 'километр', '$') + ' за ' + chislitlx(firstTimePass, 'минута', 'v$') + '. ' +
                'Сколько километров он преодолеет за ' + chislitlx(secondTimePass, 'минута', 'v$') + ', ' +
                'если будет двигаться с той же скоростью?',
            answers: (secondTimePass * firstDistance) / firstTimePass,
        });

    }, 100);
    //https://mathb-ege.sdamgia.ru/test?likes=512414
    //zer00player
})();
