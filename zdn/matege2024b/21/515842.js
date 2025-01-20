(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let vaseColor = ['красн', 'жёлт', 'зелён', 'фиолетов', 'черн', 'оранжев', 'голуб', 'изумруд', 'бежев', 'бирюзов', 'ал', 'лилов', 'голуб'].iz(3);
        let firstVaseCountFlower = sluchch(1, 30, 1);
        let secondVaseCountFlower = sluchch(1, 30, 1);
        let thirdVaseCountFlower = sluchch(1, 30, 1);

        genAssert(firstVaseCountFlower !== secondVaseCountFlower &&
            firstVaseCountFlower !== thirdVaseCountFlower &&
            secondVaseCountFlower !== thirdVaseCountFlower,
            "Значения ваз уникальны!");

        let leftOfThirdVase = firstVaseCountFlower + secondVaseCountFlower;
        let righttOfFirstVase = thirdVaseCountFlower + secondVaseCountFlower;
        let allFlowerInVases = thirdVaseCountFlower + secondVaseCountFlower + firstVaseCountFlower;

        NAtask.setTask({
            text:
                'На прилавке цветочного магазина стоят три вазы с розами: ' + vaseColor[0] + 'ая, ' +
                vaseColor[1] + 'ая, ' + vaseColor[2] + 'ая.' + ' Слева от ' + vaseColor[2] + 'ой ' + ' вазы ' + chislitlx(leftOfThirdVase, 'роза', '$') +
                ', справа от ' + vaseColor[0] + 'ой ' + ' вазы ' + chislitlx(righttOfFirstVase, 'роза', '$') + '. ' +
                'Всего в вазах ' + chislitlx(allFlowerInVases, 'роза', '$') + '. ' +
                'Сколько роз в ' + vaseColor[1] + 'ой ' + 'вазе?',
            answers: secondVaseCountFlower,
        });

    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=515842
//zer00player

