(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let vaseColor = ['красн', 'жёлт', 'зелён', 'фиолетов', 'черн', 'оранжев', 'голуб', 'изумруд', 'бежев', 'бирюзов', 'ал', 'лилов', 'голуб'].iz(3);
        let typeOfFlowerInVases = sklonlxkand(['роза', 'гвоздника', 'ромашка', 'лилия', 'мак', 'ирис', 'лаванда', 'мимоза'].iz());

        let firstVaseCountFlower = sluchch(1, 30, 1);
        let secondVaseCountFlower = slKrome([firstVaseCountFlower], 1, 30, 1);
        let thirdVaseCountFlower = slKrome([firstVaseCountFlower, secondVaseCountFlower], 1, 30, 1);

        let leftOfThirdVase = firstVaseCountFlower + secondVaseCountFlower;
        let righttOfFirstVase = thirdVaseCountFlower + secondVaseCountFlower;
        let allFlowerInVases = thirdVaseCountFlower + secondVaseCountFlower + firstVaseCountFlower;

        NAtask.setTask({
            text:
                'На прилавке цветочного магазина стоят три вазы с ' + typeOfFlowerInVases.tm + ': ' + vaseColor[0] + 'ая, ' +
                vaseColor[1] + 'ая, ' + vaseColor[2] + 'ая.' + ' Слева от ' + vaseColor[2] + 'ой ' + ' вазы ' + chislitlx(leftOfThirdVase, typeOfFlowerInVases, '$') +
                ', справа от ' + vaseColor[0] + 'ой ' + ' вазы ' + chislitlx(righttOfFirstVase, typeOfFlowerInVases, '$') + '. ' +
                'Всего в вазах ' + chislitlx(allFlowerInVases, typeOfFlowerInVases, '$') + '. ' +
                'Сколько ' + typeOfFlowerInVases.rm + ' в ' + vaseColor[1] + 'ой ' + 'вазе?',
            answers: secondVaseCountFlower,
        });

    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=515842
//zer00player

