
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let the_railwayTrainGeneric = sklonlxkand(decor.railwayTrainGeneric.iz());

        let city = om.goroda.iz(2);

        let departureHours = sl(1, 23, 1);
        let minutes = sl(1, 59, 1);
        let arrivalHours = slKrome([departureHours], 1, 23, 1);

        let totalHours = 24 - departureHours + arrivalHours;

        let formattedDepartureHours = String(departureHours).padStart(2, '0');
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedArrivalHours = String(arrivalHours).padStart(2, '0');

        NAtask.setTask({
            text:
                'По расписанию ' + the_railwayTrainGeneric.ie + ' ' + city[0] + '–' + city[1] + ' отправляется в ' + '$' + formattedDepartureHours +
                '$' + ':' + '$' + formattedMinutes + '$' +
                ', а прибывает в ' + '$' + formattedArrivalHours + '$' + ':' + '$' + formattedMinutes + '$' +
                ' на следующий день (время московское). Сколько часов согласно расписанию ' +
                the_railwayTrainGeneric.ie + ' находится в пути?',
            answers: totalHours,
        });
    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=77336
//zer00player


