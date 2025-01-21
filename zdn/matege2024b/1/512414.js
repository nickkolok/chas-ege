(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let speed = sl(0.5, 4, 0.5);
        let driver = ["мотоцикл", "мотоциклист", "автомобиль", "автомобилист"].iz();
        let firstTimePass = sl(15, 40, 1);
        let minutes = sklonlxkand(['минута'].iz());

        let firstDistance = speed * firstTimePass;
        let secondTimePass = firstTimePass + sl(5, 30, 3);

        NAtask.setTask({
            text:
                driver.toZagl() + ' проехал ' + chislitlx(firstDistance, 'километр', '$') + ' за ' + chislitlx(firstTimePass, minutes, '$') + '. ' +
                'Сколько километров он проедет за ' + chislitlx(secondTimePass, minutes, '$') + ', ' +
                'если будет ехать с той же скоростью?',
            answers: '$' + (secondTimePass * firstDistance) / firstTimePass + '$',
        });

    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=512414
//zer00player


