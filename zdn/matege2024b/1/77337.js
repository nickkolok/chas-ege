
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numberOfPeople = sl(9, 30, 1);
        let placeToSleepInOneTent = sl(2, 6, 1);
        let educationPlace = ['школе', 'университете', 'училище', 'лицее', 'колледже', 'вузе', 'подготовительном классе'].iz();

        genAssert(!numberOfPeople.kratno(placeToSleepInOneTent), "Количество мест для сна кратко количеству людей");

        NAtask.setTask({
            text:
                'В ' + educationPlace + ' есть ' + '$' + placeToSleepInOneTent + '$' + '-x местные туристические палатки. ' +
                'Какое наименьшее число палаток нужно взять в поход, ' +
                'в котором участвует ' + chislitlx(numberOfPeople, 'человек', '$') + '?',
            answers: (numberOfPeople / placeToSleepInOneTent).ceil(),
        });

    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=77337
//zer00player


