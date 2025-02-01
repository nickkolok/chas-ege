(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let seconds = sl(5, 55, 1);
        let speed = sl(4, 10, 1);
        let distance = seconds * speed;
        let speedInKmPerHour = speed * 3.6;

        let nameOfPerson = sklonlxkand(om.maleNames.iz());

        let the_orderToFind = decor.orderToFind.iz();

        NAtask.setTask({
            text:
                'Бегун по имени ' + nameOfPerson.ie + ' пробежал ' + chislitlx(distance, 'метр', '$') + ' за ' + chislitlx(seconds, 'секунда', 'v$') + '. '
                + the_orderToFind.toZagl() + ' среднюю скорость ' + nameOfPerson.re + ' на дистанции. ' + 'Ответ дайте в километрах в час.',
            answers: speedInKmPerHour,
        });

    }, 100);
})();
//hhttps://mathb-ege.sdamgia.ru/test?likes=318581
//zer00player
